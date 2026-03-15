import { useSimulationStore } from '@/store/simulationStore';

export function HUD() {
  const selectedPlanet = useSimulationStore((s) => s.selectedPlanet);

  return (
    <div className="absolute top-4 left-4 z-10 pointer-events-none">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold tracking-[0.3em] text-foreground/60 uppercase">
          Tycho
        </h1>
        {selectedPlanet && (
          <>
            <span className="text-foreground/20">·</span>
            <span className="text-xs tracking-widest text-foreground/80 uppercase font-mono">
              {selectedPlanet}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
