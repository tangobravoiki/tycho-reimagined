import { create } from 'zustand';

interface SimulationState {
  isPlaying: boolean;
  timeSpeed: number; // multiplier
  simulationTime: number; // years from J2000
  selectedPlanet: string | null;
  showLabels: boolean;
  hasStarted: boolean;
  
  togglePlay: () => void;
  setTimeSpeed: (speed: number) => void;
  advanceTime: (deltaSeconds: number) => void;
  selectPlanet: (name: string | null) => void;
  toggleLabels: () => void;
  start: () => void;
}

// J2000 epoch: Jan 1, 2000 12:00 TT
// Current time offset in years from J2000
const now = new Date();
const j2000 = new Date(2000, 0, 1, 12, 0, 0);
const INITIAL_TIME = (now.getTime() - j2000.getTime()) / (365.25 * 24 * 3600 * 1000);

export const useSimulationStore = create<SimulationState>((set) => ({
  isPlaying: true,
  timeSpeed: 1,
  simulationTime: INITIAL_TIME,
  selectedPlanet: null,
  showLabels: true,
  hasStarted: false,
  
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setTimeSpeed: (speed) => set({ timeSpeed: speed }),
  advanceTime: (deltaSeconds) =>
    set((s) => {
      if (!s.isPlaying) return s;
      // Convert real seconds to simulation years based on speed
      // At 1x, 1 real second = 1 day of simulation
      const yearsPerSecond = (s.timeSpeed / 365.25);
      return { simulationTime: s.simulationTime + deltaSeconds * yearsPerSecond };
    }),
  selectPlanet: (name) => set({ selectedPlanet: name }),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  start: () => set({ hasStarted: true }),
}));

export function getSimulationDate(timeYears: number): Date {
  const j2000ms = new Date(2000, 0, 1, 12, 0, 0).getTime();
  return new Date(j2000ms + timeYears * 365.25 * 24 * 3600 * 1000);
}
