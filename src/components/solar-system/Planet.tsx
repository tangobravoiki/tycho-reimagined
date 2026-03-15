import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData, MOON_DATA } from '@/lib/planetData';
import { getPlanetPosition, getOrbitPath } from '@/lib/orbitalMechanics';
import { useSimulationStore } from '@/store/simulationStore';

interface PlanetProps {
  data: PlanetData;
}

export function Planet({ data }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const simulationTime = useSimulationStore((s) => s.simulationTime);
  const selectedPlanet = useSimulationStore((s) => s.selectedPlanet);
  const selectPlanet = useSimulationStore((s) => s.selectPlanet);
  const showLabels = useSimulationStore((s) => s.showLabels);

  const isSelected = selectedPlanet === data.name;

  // Pre-compute orbit path for the line
  const orbitPoints = useMemo(() => getOrbitPath(data), [data]);
  const orbitGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    return geo;
  }, [orbitPoints]);

  useFrame(() => {
    const pos = getPlanetPosition(data, simulationTime);
    if (groupRef.current) {
      groupRef.current.position.copy(pos);
    }

    // Moon orbit around Earth
    if (data.name === "Earth" && moonRef.current) {
      const moonAngle = (simulationTime / MOON_DATA.orbitalPeriod) * Math.PI * 2;
      moonRef.current.position.set(
        Math.cos(moonAngle) * MOON_DATA.orbitRadius,
        0,
        Math.sin(moonAngle) * MOON_DATA.orbitRadius
      );
    }
  });

  return (
    <>
      {/* Orbit path */}
      <line>
        <bufferGeometry attach="geometry" {...orbitGeometry} />
        <lineBasicMaterial
          attach="material"
          color={isSelected ? data.color : "#333333"}
          transparent
          opacity={isSelected ? 0.8 : 0.25}
          linewidth={1}
        />
      </line>

      {/* Planet group */}
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            e.stopPropagation();
            selectPlanet(data.name);
          }}
        >
          <sphereGeometry args={[data.displayRadius, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>

        {/* Saturn rings */}
        {data.hasRings && (
          <mesh rotation={[Math.PI * 0.45, 0, 0]}>
            <ringGeometry args={[data.displayRadius * 1.4, data.displayRadius * 2.2, 64]} />
            <meshStandardMaterial
              color="#D4BE8D"
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
              roughness={0.9}
            />
          </mesh>
        )}

        {/* Earth's Moon */}
        {data.name === "Earth" && (
          <mesh ref={moonRef}>
            <sphereGeometry args={[MOON_DATA.displayRadius, 16, 16]} />
            <meshStandardMaterial color={MOON_DATA.color} roughness={0.9} />
          </mesh>
        )}

        {/* Label */}
        {showLabels && (
          <Html
            position={[0, data.displayRadius + 0.3, 0]}
            center
            style={{
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            <div
              className="font-mono text-[10px] tracking-widest uppercase"
              style={{
                color: isSelected ? data.color : 'rgba(255,255,255,0.5)',
                whiteSpace: 'nowrap',
                textShadow: '0 0 8px rgba(0,0,0,0.8)',
              }}
            >
              {data.name}
            </div>
          </Html>
        )}
      </group>
    </>
  );
}
