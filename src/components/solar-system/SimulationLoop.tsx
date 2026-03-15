import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '@/store/simulationStore';

export function SimulationLoop() {
  const advanceTime = useSimulationStore((s) => s.advanceTime);

  useFrame((_, delta) => {
    advanceTime(delta);
  });

  return null;
}
