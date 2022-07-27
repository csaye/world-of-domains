import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';

type Props = {
  isIdling: boolean,
  earthRef: RefObject<THREE.Group>,
  groupProps: {
    position: [number, number, number]
    rotation: [number, number, number]
  }
};

export default function EarthModel(props: Props) {
  const { isIdling, earthRef, groupProps } = props;

  // "LowPoly Earth" (https://skfb.ly/6TAUn) by JasperTobias is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
  const { nodes, materials } = useGLTF('/lowpoly_earth/scene.gltf') as any;

  // animate model
  useFrame(() => {
    if (!earthRef.current) throw 'no earth';
    if (isIdling) earthRef.current.rotation.z += 0.002;
  });

  return (
    <group
      ref={earthRef}
      dispose={null}
      {...groupProps}
    >
      <mesh geometry={nodes['URF-Height_Lampd_Ice_0'].geometry} material={materials.Lampd_Ice} />
      <mesh geometry={nodes['URF-Height_watr_0'].geometry} material={materials.watr} material-roughness={0} />
      <mesh geometry={nodes['URF-Height_Lampd_0'].geometry} material={materials.Lampd} material-color="limegreen" />
    </group>
  );
}
