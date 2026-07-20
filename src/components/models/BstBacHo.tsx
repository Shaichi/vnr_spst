import React, { useMemo } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import * as THREE from 'three';

export default function BstBacHo({ position = [0, 0, 0], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] }) {
  const { scene } = useGLTF('/assets/models/bst_bac_ho.glb');

  // Áp dụng chất liệu Đá Cẩm Thạch Trắng cho toàn bộ sub-mesh của tượng
  const whiteMarbleScene = useMemo(() => {
    const cloned = scene.clone();
    const whiteMarbleMaterial = new THREE.MeshStandardMaterial({
      color: "#e8e4d8",
      roughness: 0.4,
      metalness: 0.05,
    });

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = whiteMarbleMaterial;
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  return (
    <group position={position} rotation={rotation}>
      {/* Bệ đỡ mô hình phụ */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
         <cylinderGeometry args={[0.8, 0.9, 1, 32]} />
         <meshStandardMaterial color="#4a3222" roughness={0.7} metalness={0.2} />
      </mesh>
      
      {/* Tượng Bác Hồ đá cẩm thạch trắng */}
      <Center position={[0, 1, 0]} bottom>
        <primitive object={whiteMarbleScene} scale={0.03} castShadow receiveShadow />
      </Center>
    </group>
  );
}

useGLTF.preload('/assets/models/bst_bac_ho.glb');
