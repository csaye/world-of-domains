import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { RefObject } from 'react';
import { stories } from '../public/stories';
import StoryBox from './StoryBox';

type Props = {
  isRotating: boolean,
  earthRef: RefObject<THREE.Group>,
  groupProps: {
    position: [number, number, number]
    rotation: [number, number, number]
  },
  boxesVisible: boolean
};

export default function EarthModel(props: Props) {
  const { isRotating, earthRef, groupProps, boxesVisible } = props;

  const { nodes, materials } = useGLTF('/lowpoly_earth/scene.gltf') as any;

  // animate model
  useFrame(() => {
    if (!earthRef.current) throw 'no earth';
    if (isRotating) {
      const rot = earthRef.current.rotation;
      rot.z += 0.002;
      if (rot.z >= Math.PI) rot.z -= Math.PI * 2; // wrap rotation
    }
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
      {
        stories.map((story, i) =>
          <StoryBox
            {...story}
            visible={boxesVisible}
            key={i}
          />
        )
      }
    </group>
  );
}
