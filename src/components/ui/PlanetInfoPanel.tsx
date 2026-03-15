import { useSimulationStore } from '@/store/simulationStore';
import { PLANETS, SUN_DATA } from '@/lib/planetData';
import { X } from 'lucide-react';

export function PlanetInfoPanel() {
  const { selectedPlanet, selectPlanet } = useSimulationStore();

  if (!selectedPlanet) return null;

  const isSun = selectedPlanet === "Sun";
  const planet = PLANETS.find((p) => p.name === selectedPlanet);

  if (!planet && !isSun) return null;

  const data = isSun ? SUN_DATA : planet!;
  const color = data.color;

  return (
    <div className="absolute top-4 right-4 w-72 z-20 animate-in slide-in-from-right-4 duration-300">
      <div className="rounded-xl border border-border/40 bg-card/85 backdrop-blur-xl p-5 shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div
              className="w-3 h-3 rounded-full mb-2"
              style={{ backgroundColor: color }}
            />
            <h2 className="text-lg font-semibold tracking-wide text-foreground">
              {data.name}
            </h2>
          </div>
          <button
            onClick={() => selectPlanet(null)}
            className="p-1 rounded-full hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Stats */}
        <div className="space-y-3 text-xs">
          <InfoRow label="Mass" value={data.mass} />
          {!isSun && planet && (
            <>
              <InfoRow label="Radius" value={`${planet.radius.toLocaleString()} km`} />
              <InfoRow label="Distance from Sun" value={planet.distanceFromSun} />
              <InfoRow label="Orbital Period" value={`${planet.orbitalPeriod.toFixed(2)} years`} />
              <InfoRow label="Eccentricity" value={planet.eccentricity.toFixed(4)} />
              {planet.moons !== undefined && (
                <InfoRow label="Known Moons" value={planet.moons.toString()} />
              )}
            </>
          )}
          {isSun && (
            <InfoRow label="Radius" value={`${SUN_DATA.radius.toLocaleString()} km`} />
          )}
          <div className="pt-2 border-t border-border/30">
            <p className="text-muted-foreground leading-relaxed">
              <span className="text-foreground/70 font-medium">Composition: </span>
              {data.composition}
            </p>
          </div>
          <div className="pt-1">
            <p className="text-muted-foreground leading-relaxed italic">
              {data.funFact}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-muted-foreground uppercase tracking-wider text-[10px]">{label}</span>
      <span className="font-mono text-foreground/90">{value}</span>
    </div>
  );
}
