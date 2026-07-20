import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FireworksSystem({ isActive }: { isActive: boolean }) {
  const count = 1500;
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(0, -100, 0), // Hidden initially
      velocity: new THREE.Vector3(),
      color: new THREE.Color(),
      life: 0,
      maxLife: 0,
      active: false
    }));
  }, []);

  const colorPalette = ['#ffd700', '#ff4444', '#ffaa00', '#ffffff', '#00ff88'];
  const lastBurstRef = useRef(0);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Spawn new burst every 1 second if active
    if (isActive && state.clock.elapsedTime - lastBurstRef.current > 0.8) {
      lastBurstRef.current = state.clock.elapsedTime;
      // Random position in the upper part of the main hall
      const burstCenter = new THREE.Vector3(
        (Math.random() - 0.5) * 30, // x
        7 + Math.random() * 4,      // y (near ceiling)
        (Math.random() - 0.5) * 30  // z
      );
      const burstColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      const threeColor = new THREE.Color(burstColor);
      // Boost intensity for bloom
      threeColor.multiplyScalar(3.0);
      
      // Find inactive particles to spawn
      let spawned = 0;
      const burstSize = 150 + Math.random() * 100;
      for (let i = 0; i < count; i++) {
        if (!particles[i].active && spawned < burstSize) {
          spawned++;
          const p = particles[i];
          p.active = true;
          p.position.copy(burstCenter);
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos((Math.random() * 2) - 1);
          const speed = Math.random() * 10 + 2;
          p.velocity.set(
            speed * Math.sin(phi) * Math.cos(theta),
            speed * Math.sin(phi) * Math.sin(theta),
            speed * Math.cos(phi)
          );
          p.color.copy(threeColor);
          p.life = 0;
          p.maxLife = Math.random() * 2.0 + 1.0; // 1.0 to 3.0 seconds
        }
      }
    }

    let needsUpdate = false;
    particles.forEach((p, i) => {
      if (p.active) {
        needsUpdate = true;
        p.life += delta;
        if (p.life >= p.maxLife || p.position.y < -2) {
          p.active = false;
          p.position.set(0, -100, 0); // Hide
          dummy.position.copy(p.position);
          dummy.scale.setScalar(0);
          dummy.updateMatrix();
          mesh.current!.setMatrixAt(i, dummy.matrix);
          return;
        }

        // Apply physics
        p.velocity.y -= 3.5 * delta; // Gravity
        p.position.addScaledVector(p.velocity, delta);
        
        dummy.position.copy(p.position);
        
        // Scale down as it reaches end of life
        const lifeRatio = p.life / p.maxLife;
        // Flicker effect
        const flicker = Math.random() > 0.8 ? 0.5 : 1.0;
        const scale = Math.max(0, (1 - lifeRatio)) * 0.12 * flicker;
        dummy.scale.setScalar(scale);
        
        dummy.updateMatrix();
        mesh.current!.setMatrixAt(i, dummy.matrix);
        mesh.current!.setColorAt(i, p.color);
      }
    });

    if (needsUpdate || isActive) {
      mesh.current.instanceMatrix.needsUpdate = true;
      if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial toneMapped={false} transparent opacity={0.9} />
    </instancedMesh>
  );
}
