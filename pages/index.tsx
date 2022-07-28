import { Environment, OrbitControls } from '@react-three/drei';
import { Camera, Canvas, useThree } from '@react-three/fiber';
import { Easing, Tween, update } from '@tweenjs/tween.js';
import { Dispatch, useEffect, useRef, useState } from 'react';
import { Vector3Tuple } from 'three';
import EarthModel from '../components/EarthModel';
import styles from '../styles/pages/Index.module.scss';

// default earth rotation
const defaultRot: [number, number, number] =
  [-Math.PI / 2 - Math.PI / 16, Math.PI / 8, -Math.PI / 2];
// default camera position
const defaultPos: [number, number, number] = [3, 0, 0];

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
  const [isIdling, setIsIdling] = useState(true);
  const [camera, setCamera] = useState<Camera | undefined>(undefined);
  const [isAudio, setIsAudio] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [earthReady, setEarthReady] = useState(false);

  const earthRef = useRef<THREE.Group>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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
        style={{ opacity: isIdling ? undefined : 0 }}
        className={styles.center}
      >
        <h1>World of Domains</h1>
        <button
          style={{ pointerEvents: isIdling ? undefined : 'none' }}
          onClick={() => {
            setIsIdling(false);
            resetTween().start();
          }}
        >
          start
        </button>
      </div>
      >
      <Canvas camera={{ position: defaultPos, fov: 50 }}>
        <CanvasData
          setCamera={setCamera}
          setSceneReady={setSceneReady}
        />
        <ambientLight intensity={0.5} />
        <EarthModel
          earthRef={earthRef}
          isIdling={isIdling}
          groupProps={{
            position: [0, 0, 0],
            rotation: defaultRot
          }}
        />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={isIdling}
        />
      </Canvas>
    </div >
  );
}
