import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import EarthModel from '../components/EarthModel';
import styles from '../styles/pages/Index.module.scss';

// default earth rotation
const defaultRot: [number, number, number] =
  [-Math.PI / 2 - Math.PI / 16, Math.PI / 8, -Math.PI / 2];
// default camera position
const defaultPos: [number, number, number] = [3, 0, 0];

export default function Index() {
  const earthRef = useRef<THREE.Group>(null);

  function resetTween() {
    if (!earthRef.current) throw 'no earth';
    if (!camera) throw 'no camera';
    const transforms = { rot: earthRef.current.rotation.toArray(), pos: camera.position.toArray() };
    return new Tween(transforms)
      .to({ rot: defaultRot.slice(), pos: defaultPos.slice() }, 2000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        if (!earthRef.current) throw 'no earth';
        earthRef.current.rotation.set(...transforms.rot as Vector3Tuple);
        camera.position.set(...transforms.pos);
      });
  }

  function flyTween() {
    if (!earthRef.current) throw 'no earth';
    const rot = earthRef.current.rotation.toArray().slice();
    const randomAngle = () => Math.random() * Math.PI * 2 - Math.PI;
    return new Tween(rot)
      .to([randomAngle(), randomAngle(), randomAngle()], 4000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => {
        if (!earthRef.current) throw 'no earth';
        earthRef.current.rotation.set(...rot as Vector3Tuple);
      });
  }

  function zoomTween(type: 'in' | 'out') {
    if (!camera) throw 'no camera';
    const pos = type === 'in' ? defaultPos.slice() : [1.2, 0, 0];
    return new Tween(pos)
      .to(type === 'in' ? [1.2, 0, 0] : defaultPos.slice(), 2000)
      .easing(Easing.Quadratic.Out)
      .onUpdate(() => camera.position.set(...pos as Vector3Tuple));
  }

  return (
    <div className={styles.container}>
      <Canvas
        className={styles.grabbable}
        camera={{ position: defaultPos, fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <EarthModel
          earthRef={earthRef}
          isIdling={true}
          groupProps={{
            position: [0, 0, 0],
            rotation: defaultRot
          }}
        />
        <Environment preset="city" />
        <OrbitControls
          enableZoom={false}
        />
      </Canvas>
    </div >
  );
}
