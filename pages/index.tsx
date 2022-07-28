import { ArrowBack, ArrowForward, GitHub, Twitter, VolumeOff, VolumeUp } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';
import { Environment } from '@react-three/drei';
import { Camera, Canvas, useThree } from '@react-three/fiber';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { Vector3Tuple } from 'three';
import EarthModel from '../components/EarthModel';
import KofiButton from '../components/KofiButton';
import { stories, Story } from '../public/stories';
import styles from '../styles/pages/Index.module.scss';

// default earth rotation
const defaultRot: [number, number, number] =
  [-Math.PI / 2, -Math.PI / 16, 0];
// default camera position
const defaultPos: [number, number, number] = [0, 0, -3];

let loading = false;

type CanvasDataProps = {
  setCamera: Dispatch<Camera>,
  setSceneReady: Dispatch<boolean>
};

function CanvasData(props: CanvasDataProps) {
  const { setCamera, setSceneReady } = props;

  // set states
  const state = useThree();
  setCamera(state.camera);
  setSceneReady(!!state.scene.children.length);

  return null;
}

export default function Index() {
  const [camera, setCamera] = useState<Camera | undefined>(undefined);
  const [isAudio, setIsAudio] = useState(false);
  const [storyIndex, setStoryIndex] = useState(-1);
  const [sceneReady, setSceneReady] = useState(false);
  const [earthReady, setEarthReady] = useState(false);

  const earthRef = useRef<THREE.Group>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const isRotating = storyIndex === -1 || storyIndex === stories.length;

  // check if earth is ready to display
  useEffect(() => {
    if (!sceneReady) return;
    if (!earthRef.current) throw 'no earth';
    earthRef.current.rotation.set(...defaultRot);
    setEarthReady(true);
  }, [sceneReady, earthRef]);

  // initialize audio track
  useEffect(() => {
    // get audio
    if (!audioRef.current) throw 'no audio ref';
    const audio = audioRef.current;
    audio.loop = true;
    // set up play listeners
    function onPlay() { setIsAudio(true); }
    function onPause() { setIsAudio(false); }
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    }
  }, []);

  // toggles audio on and off
  function toggleAudio() {
    if (!audioRef.current) throw 'no audio ref';
    const audio = audioRef.current;
    if (audio.paused) audio.play();
    else audio.pause();
  }

  // translates rotation of given story into position
  function translateRot(story: Story): [number, number, number] {
    const rot = story.rotation;
    return [rot[1] - Math.PI, -rot[0], 0];
  }

  // moves view given direction
  function moveView(direction: 'back' | 'forward') {
    if (loading) return;
    if (direction === 'back') { // moving back
      // update event index
      if (storyIndex === -1) return;
      const newStoryIndex = storyIndex - 1;
      setStoryIndex(newStoryIndex);
      // handle event index
      loading = true;
      if (newStoryIndex === -1) { // title slide
        resetRotTween().start();
        resetPosTween().onComplete(() => loading = false).start();
      } else {
        // get next destination
        const destination = translateRot(stories[newStoryIndex]);
        if (newStoryIndex === stories.length - 1) zoomTween('in', true).start();
        else zoomTween('out').onComplete(() => zoomTween('in').start()).start();
        flyTween(destination).onComplete(() => loading = false).start();
      }
  }

  // handle key presses
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase();
      if (['arrowleft', 'a'].includes(key)) moveView('back');
      if (['arrowright', 'd', ' ', 'enter'].includes(key)) moveView('forward');
    }
    // set up key listeners
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyIndex, resetPosTween, zoomTween]); // deps accounted for

  // set up tween animation
  useEffect(() => {
    function animate(time: number) {
      update(time);
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, []);

  // resets camera position to default
  function resetPosTween() {
    if (!camera) throw 'no camera';
    const pos = camera.position.toArray().slice();
    return new Tween(pos)
      .to(defaultPos.slice(), 2000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => camera.position.set(...pos as Vector3Tuple));
  }

  // resets earth rotation to default
  function resetRotTween() {
    if (!earthRef.current) throw 'no earth';
    const rot = earthRef.current.rotation.toArray().slice();
    return new Tween(rot)
      .to(defaultRot.slice(), 2000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        if (!earthRef.current) throw 'no earth';
        earthRef.current.rotation.set(...rot as Vector3Tuple);
      });
  }

  // rotates earth to given destination
  function flyTween(destination: [number, number, number]) {
    if (!earthRef.current) throw 'no earth';
    const rot = earthRef.current.rotation.toArray().slice();
    return new Tween(rot)
      .to(destination.slice(), 2000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        if (!earthRef.current) throw 'no earth';
        earthRef.current.rotation.set(...rot as Vector3Tuple);
      });
  }

  // zooms camera position to given distance
  function zoomTween(type: 'in' | 'out' | 'far', long?: boolean) {
    if (!camera) throw 'no camera';
    const pos = camera.position.toArray().slice();
    const destZ = type === 'in' ? -1.2 : type === 'out' ? -3 : -20;
    return new Tween(pos)
      .to([0, 0, destZ], long ? 2000 : 1000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => camera.position.set(...pos as Vector3Tuple));
  }

  return (
    <div className={styles.container}>
      <audio
        ref={audioRef}
        src="/Wind of the Rainforest.mp3"
      />
      <button
        className={styles.audioButton}
        onClick={toggleAudio}
      >
        {isAudio ? <VolumeUp /> : <VolumeOff />}
      </button>
      <div className={styles.kofiButton}>
        <KofiButton />
      </div>
      <a
        className={styles.githubBadge}
        href="https://github.com/csaye/world-of-domains"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHub fontSize="large" />
      </a>
      {
        !earthReady &&
        <div className={styles.loading}>
          <div>
            <h1>Loading world...</h1>
            <LinearProgress />
          </div>
        </div>
      }
      <div
        style={{ opacity: storyIndex === -1 ? undefined : 0 }}
        className={styles.startTitle}
      >
        <h1>World of Domains</h1>
        <div className={styles.dummy}>
          <ArrowForward />
        </div>
        <button
          style={{ pointerEvents: storyIndex === -1 ? undefined : 'none' }}
          className={styles.button}
          onClick={() => moveView('forward')}
        >
          <ArrowForward />
        </button>
      </div>
      <div
        style={{
          opacity: storyIndex === stories.length ? undefined : 0,
          pointerEvents: storyIndex === stories.length ? undefined : 'none'
        }}
        className={styles.endTitle}
      >
        <h1>The End</h1>
        <div
          className={styles.buttons}
        >
          <a
            className={styles.twitter}
            href="https://twitter.com/intent/follow?screen_name=CooperComputer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter /> Follow Me on Twitter
          </a>
          <KofiButton />
        </div>
        <div className={styles.credits}>
          <h2>Credits</h2>
          <p>{`"LowPoly Earth" by JasperTobias (https://skfb.ly/6TAUn)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/`}</p>
          <p>{`“Wind of the Rainforest" Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/`}
          </p>
          <p>
            <a
              href="https://github.com/csaye/world-of-domains"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
              View project on GitHub
            </a>
          </p>
        </div>
        <hr />
        <p>Thanks for playing!</p>
      </div>
      <div className={styles.arrows}>
        <button
          style={
            storyIndex > -1 ?
              undefined : { opacity: 0, pointerEvents: 'none' }
          }
          className={styles.arrowBack}
          onClick={() => moveView('back')}
        >
          <ArrowBack />
        </button>
        <button
          style={
            (storyIndex > -1 && storyIndex < stories.length) ?
              undefined : { opacity: 0, pointerEvents: 'none' }
          }
          className={styles.arrowForward}
          onClick={() => moveView('forward')}
        >
          <ArrowForward />
        </button>
      </div>
      <Canvas camera={{ position: defaultPos, fov: 50 }}>
        <CanvasData
          setCamera={setCamera}
          setSceneReady={setSceneReady}
        />
        <ambientLight intensity={0.5} />
        <EarthModel
          earthRef={earthRef}
          isRotating={isRotating}
          groupProps={{
            position: [0, 0, 0],
            rotation: [0, 0, 0]
          }}
        />
        <Environment preset="city" />
      </Canvas>
    </div >
  );
}
