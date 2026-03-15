import { useSimulationStore } from '@/store/simulationStore';

export function SplashScreen() {
  const { hasStarted, start } = useSimulationStore();

  if (hasStarted) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background">
      {/* Subtle animated stars bg */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 80 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-foreground/40"
            style={{
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-6xl font-bold tracking-[0.3em] text-foreground uppercase">
            Tycho
          </h1>
          <p className="text-sm tracking-[0.5em] text-muted-foreground uppercase">
            Solar System
          </p>
        </div>

        {/* Start button */}
        <button
          onClick={start}
          className="mt-8 group relative overflow-hidden rounded-full border border-border/50 px-10 py-3 text-xs uppercase tracking-[0.4em] text-foreground/80 transition-all hover:border-foreground/40 hover:text-foreground"
        >
          <span className="relative z-10">Explore</span>
          <div className="absolute inset-0 bg-foreground/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>

        {/* Footer */}
        <p className="mt-12 text-[10px] text-muted-foreground/50 tracking-widest uppercase">
          Real-time orbital simulation
        </p>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
