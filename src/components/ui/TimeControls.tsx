import { useSimulationStore, getSimulationDate } from '@/store/simulationStore';
import { Play, Pause, FastForward, Rewind, Tag } from 'lucide-react';

const SPEEDS = [
  { label: '0.1×', value: 0.1 },
  { label: '1×', value: 1 },
  { label: '10×', value: 10 },
  { label: '50×', value: 50 },
  { label: '100×', value: 100 },
  { label: '500×', value: 500 },
  { label: '1000×', value: 1000 },
];

export function TimeControls() {
  const { isPlaying, timeSpeed, simulationTime, togglePlay, setTimeSpeed, toggleLabels, showLabels } =
    useSimulationStore();

  const simDate = getSimulationDate(simulationTime);
  const dateStr = simDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handleSlower = () => {
    const idx = SPEEDS.findIndex((s) => s.value === timeSpeed);
    if (idx > 0) setTimeSpeed(SPEEDS[idx - 1].value);
  };

  const handleFaster = () => {
    const idx = SPEEDS.findIndex((s) => s.value === timeSpeed);
    if (idx < SPEEDS.length - 1) setTimeSpeed(SPEEDS[idx + 1].value);
  };

  const handleReverse = () => {
    setTimeSpeed(-Math.abs(timeSpeed));
  };

  const handleForward = () => {
    setTimeSpeed(Math.abs(timeSpeed));
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center pb-6 pointer-events-none z-10">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border/40 bg-card/80 backdrop-blur-xl px-5 py-2.5 shadow-2xl">
        {/* Date display */}
        <span className="font-mono text-xs text-muted-foreground mr-2 min-w-[120px] text-center">
          {dateStr}
        </span>

        {/* Reverse */}
        <button onClick={handleReverse} className="p-1.5 rounded-full hover:bg-secondary transition-colors" title="Reverse">
          <Rewind className="w-3.5 h-3.5 text-foreground" />
        </button>

        {/* Slower */}
        <button onClick={handleSlower} className="p-1.5 rounded-full hover:bg-secondary transition-colors" title="Slower">
          <FastForward className="w-3.5 h-3.5 text-foreground rotate-180" />
        </button>

        {/* Play/Pause */}
        <button
          onClick={togglePlay}
          className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/80 transition-colors"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        {/* Faster */}
        <button onClick={handleFaster} className="p-1.5 rounded-full hover:bg-secondary transition-colors" title="Faster">
          <FastForward className="w-3.5 h-3.5 text-foreground" />
        </button>

        {/* Forward */}
        <button onClick={handleForward} className="p-1.5 rounded-full hover:bg-secondary transition-colors" title="Forward">
          <FastForward className="w-3.5 h-3.5 text-foreground" />
        </button>

        {/* Speed indicator */}
        <span className="font-mono text-xs text-accent-foreground bg-accent/30 rounded-full px-2.5 py-0.5 ml-1">
          {timeSpeed > 0 ? '' : '−'}{Math.abs(timeSpeed)}×
        </span>

        {/* Labels toggle */}
        <button
          onClick={toggleLabels}
          className={`p-1.5 rounded-full transition-colors ml-1 ${showLabels ? 'bg-accent/30 text-accent-foreground' : 'hover:bg-secondary text-muted-foreground'}`}
          title="Toggle labels"
        >
          <Tag className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
