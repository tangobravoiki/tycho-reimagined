

# Tycho Solar System Simulator — Build Plan

A real-time, interactive 3D solar system simulation using React Three Fiber (Three.js), matching the look and feel of tycho.io.

## Phase 1: Scene Foundation
- Set up **React Three Fiber** (`@react-three/fiber@^8.18`, `three@^0.160`, `@react-three/drei@^9.122.0`)
- Create the 3D canvas with a dark space background and starfield
- Add orbit camera controls (zoom, pan, rotate) via `@react-three/drei`'s `OrbitControls`
- Implement the **Sun** as a glowing emissive sphere at the origin

## Phase 2: Planets & Orbits
- Define orbital data for all 8 planets (semi-major axis, eccentricity, inclination, period, etc.) based on real NASA ephemeris data
- Render each planet as a textured sphere (using procedurally generated or public domain textures) with correct relative sizing
- Draw elliptical **orbit paths** as line geometry rings
- Animate planets along their orbits using Kepler's equation for realistic elliptical motion
- Include Earth's moon and Saturn's rings

## Phase 3: Time Controls
- Add a **time control bar** at the bottom: play/pause, speed up (1x → 1000x), reverse time
- Display current simulation date/time
- All orbital positions update based on the simulation clock

## Phase 4: Planet Interaction & Info Panels
- Click any planet to select it — camera smoothly transitions to focus on it
- Show an **info panel** (side panel, not modal) with: name, mass, radius, orbital period, distance from sun, composition, and fun facts
- Highlight selected planet's orbit path
- Click away or press Escape to deselect

## Phase 5: UI & Polish
- **Splash/loading screen** with "Tycho" branding and "Start" button (matching the original)
- Top HUD showing current focused body and simulation speed
- Planet labels (togglable) floating in 3D space via `Html` from drei
- Smooth camera transitions with spring-based animation
- Dark space aesthetic: black background, subtle star particles, white/light UI text

## Visual Style
- Deep black background (`#1a1a1a` to `#000`)
- White/light gray UI text and borders
- Subtle glow effects on the Sun
- Clean, minimal overlays that don't obstruct the 3D view

