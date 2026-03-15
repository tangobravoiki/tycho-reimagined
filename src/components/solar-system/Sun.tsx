import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useSimulationStore } from '@/store/simulationStore';

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const selectPlanet = useSimulationStore((s) => s.selectPlanet);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const scale = 1.8 + Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      glowRef.current.scale.setScalar(scale);
    }
  });

  return (
    <group>
      {/* Core sun */}
      <mesh ref={meshRef} onClick={() => selectPlanet("Sun")}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshBasicMaterial color="#FDB813" />
      </mesh>
      {/* Inner glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshBasicMaterial color="#FDB813" transparent opacity={0.15} />
      </mesh>
      {/* Point light */}
      <pointLight color="#FFF5E0" intensity={2} distance={500} decay={0.5} />
      <ambientLight intensity={0.08} />
    </group>
  );
}
