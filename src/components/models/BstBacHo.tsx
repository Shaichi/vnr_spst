import React from 'react';
import { useGLTF, Center } from '@react-three/drei';

export default function BstBacHo({ position = [0, 0, 0], rotation = [0, 0, 0] }: { position?: [number, number, number], rotation?: [number, number, number] }) {
  // Tải mô hình GLB từ thư mục public
  const { scene } = useGLTF('/assets/models/bst_bac_ho.glb');

  return (
    <group position={position} rotation={rotation}>
      {/* Bệ đỡ mô hình phụ */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
         <cylinderGeometry args={[0.8, 0.9, 1, 32]} />
         <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>
      
      {/* Dùng thẻ Center để tự động đặt mô hình vừa vặn lên bệ (Y=1) */}
      <Center position={[0, 1, 0]} bottom>
        <primitive object={scene} scale={0.03} castShadow receiveShadow />
      </Center>
    </group>
  );
}

// Preload mô hình để tăng tốc độ hiển thị
useGLTF.preload('/assets/models/bst_bac_ho.glb');
