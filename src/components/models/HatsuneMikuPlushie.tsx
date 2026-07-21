import React, { useLayoutEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function HatsuneMikuPlushie({ position = [0, 0, 0], rotation = [0, 0, 0], scaleMultiplier = 1 }: { position?: [number, number, number], rotation?: [number, number, number], scaleMultiplier?: number }) {
  const { scene } = useGLTF('/assets/models/hatsune_miku_plushie.glb');

  useLayoutEffect(() => {
    if (!scene) return;

    // Kích hoạt shadow cho búp bê
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    const clone = scene.clone();
    clone.position.set(0, 0, 0);
    clone.rotation.set(0, 0, 0);
    clone.scale.set(1, 1, 1);
    clone.updateMatrixWorld(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    
    const maxDim = Math.max(size.x, size.y, size.z);
    let scale = 1;
    if (maxDim > 0) {
      // Chuẩn hóa kích thước búp bê về khoảng 0.8 đơn vị (gần 1 mét, vừa đủ nhỏ nhắn xinh xắn)
      scale = (0.8 / maxDim) * scaleMultiplier; 
    }

    scene.scale.setScalar(scale);
    scene.position.sub(center.multiplyScalar(scale));
    // Đặt búp bê ngồi bệt xuống sàn
    scene.position.y += (size.y * scale) / 2;
  }, [scene]);

  return (
    <group position={position} rotation={rotation}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/assets/models/hatsune_miku_plushie.glb');
