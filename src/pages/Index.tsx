import { SolarSystemScene } from '@/components/solar-system/SolarSystemScene';
import { TimeControls } from '@/components/ui/TimeControls';
import { PlanetInfoPanel } from '@/components/ui/PlanetInfoPanel';
import { SplashScreen } from '@/components/ui/SplashScreen';
import { HUD } from '@/components/ui/HUD';
import { useSimulationStore } from '@/store/simulationStore';

const Index = () => {
  const hasStarted = useSimulationStore((s) => s.hasStarted);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-background">
      <SplashScreen />
      {hasStarted && (
        <>
          <SolarSystemScene />
          <HUD />
          <TimeControls />
          <PlanetInfoPanel />
        </>
      )}
    </div>
  );
};

export default Index;
