import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSimulationStore } from '@/store/simulationStore';
import { PLANETS, AU_SCALE } from '@/lib/planetData';
import { getPlanetPosition } from '@/lib/orbitalMechanics';

export function CameraController() {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();
  const selectedPlanet = useSimulationStore((s) => s.selectedPlanet);
  const simulationTime = useSimulationStore((s) => s.simulationTime);
  const targetPos = useRef(new THREE.Vector3(0, 0, 0));
  const isAnimating = useRef(false);
  const animProgress = useRef(0);
  const startCamPos = useRef(new THREE.Vector3());
  const startTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    if (selectedPlanet && selectedPlanet !== "Sun") {
      const planet = PLANETS.find((p) => p.name === selectedPlanet);
      if (planet) {
        isAnimating.current = true;
        animProgress.current = 0;
        startCamPos.current.copy(camera.position);
        if (controlsRef.current) {
          startTarget.current.copy(controlsRef.current.target);
        }
      }
    } else if (selectedPlanet === "Sun") {
      isAnimating.current = true;
      animProgress.current = 0;
      startCamPos.current.copy(camera.position);
      if (controlsRef.current) {
        startTarget.current.copy(controlsRef.current.target);
      }
      targetPos.current.set(0, 0, 0);
    }
  }, [selectedPlanet, camera]);

  useFrame((_, delta) => {
    if (selectedPlanet && selectedPlanet !== "Sun") {
      const planet = PLANETS.find((p) => p.name === selectedPlanet);
      if (planet) {
        targetPos.current = getPlanetPosition(planet, simulationTime);
      }
    }

    if (isAnimating.current) {
      animProgress.current = Math.min(1, animProgress.current + delta * 1.5);
      const t = easeInOutCubic(animProgress.current);

      // Calculate target camera offset based on planet distance
      let distance = 5;
      if (selectedPlanet && selectedPlanet !== "Sun") {
        const planet = PLANETS.find((p) => p.name === selectedPlanet);
        if (planet) {
          distance = Math.max(2, planet.displayRadius * 8);
        }
      } else if (selectedPlanet === "Sun") {
        distance = 8;
      }

      const endCamPos = targetPos.current.clone().add(new THREE.Vector3(distance * 0.5, distance * 0.6, distance));

      camera.position.lerpVectors(startCamPos.current, endCamPos, t);

      if (controlsRef.current) {
        controlsRef.current.target.lerpVectors(startTarget.current, targetPos.current, t);
        controlsRef.current.update();
      }

      if (animProgress.current >= 1) {
        isAnimating.current = false;
      }
    } else if (selectedPlanet && selectedPlanet !== "Sun") {
      // Follow the planet
      if (controlsRef.current) {
        controlsRef.current.target.lerp(targetPos.current, 0.05);
        controlsRef.current.update();
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan
      enableZoom
      enableRotate
      minDistance={2}
      maxDistance={400}
      zoomSpeed={0.8}
    />
  );
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
