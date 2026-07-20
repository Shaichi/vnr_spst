import React from 'react';
import { useGLTF, Center } from '@react-three/drei';

export default function DetailedMonument() {
  // Tải mô hình GLB từ thư mục public
  const { nodes, materials } = useGLTF('/assets/models/tuong_bac.glb') as any;

  return (
    <group position={[0, -0.6, 0]}>
      {/* Bệ đỡ vuông vức bên dưới tượng */}
      <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
         <boxGeometry args={[1.5, 0.4, 1.5]} />
         <meshStandardMaterial color="#8b5a2b" roughness={0.8} />
      </mesh>
      
      {/* 
        Thẻ Center của thư viện bị lỗi khi tính toán các Mesh bóc tách.
        => Giải pháp tối thượng: Tự tính toán độ lệch tâm bằng toán học!
        Tâm gốc của mô hình bị lệch X=17.2, Y=14.1 nên khi scale 0.045 ta cần bù trừ lại vị trí X=-0.78 và Z=0.64.
        Đế tượng (Z gốc = 0) sẽ nằm chính xác ở Y=0.4.
      */}
      <group position={[-0.78, 0.4, 0.64]} scale={0.045} rotation={[-Math.PI / 2, 0, 0]}>
         {nodes.Material2 && (
           <mesh geometry={nodes.Material2.geometry} material={materials.CoolGray1} castShadow receiveShadow />
         )}
         {nodes.Material3 && (
           <mesh geometry={nodes.Material3.geometry} material={materials.material} castShadow receiveShadow />
         )}
      </group>
    </group>
  );
}

// Preload mô hình để tăng tốc độ hiển thị
useGLTF.preload('/assets/models/tuong_bac.glb');
