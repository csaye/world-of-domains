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
