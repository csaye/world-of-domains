import { useEffect, useRef } from "react";
import { Story } from "../public/stories";

// distance from center
const dist = 1.01;

export default function Box(props: Story & { visible: boolean }) {
  const { rotation, visible } = props;

  const meshRef = useRef<THREE.Mesh>(null);

  // look at origin on start
  useEffect(() => {
    if (!meshRef.current) throw 'no mesh';
    meshRef.current.lookAt(0, 0, 0);
  }, [rotation]);

  // returns position of box by rotation
  function getPos(): [number, number, number] {
    const [yaw, pitch] = rotation;
    return [
      dist * Math.sin(yaw) * Math.cos(pitch),
      dist * Math.sin(pitch),
      dist * Math.cos(yaw) * Math.cos(pitch),
    ];
  }

  return (
    <mesh
      ref={meshRef}
      position={getPos()}
      visible={visible}
    >
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}
