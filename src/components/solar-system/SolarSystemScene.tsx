import { Canvas } from '@react-three/fiber';
import { Starfield } from './Starfield';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { CameraController } from './CameraController';
import { SimulationLoop } from './SimulationLoop';
import { PLANETS } from '@/lib/planetData';
import { useSimulationStore } from '@/store/simulationStore';

export function SolarSystemScene() {
  const selectPlanet = useSimulationStore((s) => s.selectPlanet);

  return (
    <Canvas
      camera={{ position: [15, 20, 35], fov: 50, near: 0.1, far: 2000 }}
      style={{ background: '#000000' }}
      onPointerMissed={() => selectPlanet(null)}
    >
      <SimulationLoop />
      <CameraController />
      <Starfield />
      <Sun />
      {PLANETS.map((planet) => (
        <Planet key={planet.name} data={planet} />
      ))}
    </Canvas>
  );
}
