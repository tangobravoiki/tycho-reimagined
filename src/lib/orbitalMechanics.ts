import { PlanetData, AU_SCALE } from './planetData';
import * as THREE from 'three';

const DEG_TO_RAD = Math.PI / 180;

/**
 * Solve Kepler's equation M = E - e*sin(E) using Newton-Raphson
 */
function solveKepler(meanAnomaly: number, eccentricity: number, tolerance = 1e-8): number {
  let E = meanAnomaly;
  for (let i = 0; i < 50; i++) {
    const dE = (E - eccentricity * Math.sin(E) - meanAnomaly) / (1 - eccentricity * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < tolerance) break;
  }
  return E;
}

/**
 * Get the true anomaly from eccentric anomaly
 */
function trueAnomalyFromEccentric(E: number, e: number): number {
  return 2 * Math.atan2(
    Math.sqrt(1 + e) * Math.sin(E / 2),
    Math.sqrt(1 - e) * Math.cos(E / 2)
  );
}

/**
 * Calculate 3D position of a planet at a given time
 * @param planet Planet orbital data
 * @param timeYears Time in Julian years from J2000 epoch
 * @returns THREE.Vector3 position in scene coordinates
 */
export function getPlanetPosition(planet: PlanetData, timeYears: number): THREE.Vector3 {
  const { semiMajorAxis, eccentricity, inclination, longitudeOfAscendingNode, argumentOfPerihelion, meanLongitudeAtEpoch, orbitalPeriod } = planet;

  // Mean anomaly
  const meanMotion = (2 * Math.PI) / orbitalPeriod; // rad/year
  const M0 = (meanLongitudeAtEpoch - argumentOfPerihelion - longitudeOfAscendingNode) * DEG_TO_RAD;
  const M = M0 + meanMotion * timeYears;

  // Solve Kepler's equation
  const E = solveKepler(M, eccentricity);
  const trueAnomaly = trueAnomalyFromEccentric(E, eccentricity);

  // Distance from focus
  const r = semiMajorAxis * (1 - eccentricity * Math.cos(E));

  // Position in orbital plane
  const xOrbital = r * Math.cos(trueAnomaly);
  const yOrbital = r * Math.sin(trueAnomaly);

  // Rotate to 3D using orbital elements
  const Ω = longitudeOfAscendingNode * DEG_TO_RAD;
  const ω = argumentOfPerihelion * DEG_TO_RAD;
  const i = inclination * DEG_TO_RAD;

  const cosΩ = Math.cos(Ω), sinΩ = Math.sin(Ω);
  const cosω = Math.cos(ω), sinω = Math.sin(ω);
  const cosi = Math.cos(i), sini = Math.sin(i);

  const x = (cosΩ * cosω - sinΩ * sinω * cosi) * xOrbital + (-cosΩ * sinω - sinΩ * cosω * cosi) * yOrbital;
  const y = (sinΩ * cosω + cosΩ * sinω * cosi) * xOrbital + (-sinΩ * sinω + cosΩ * cosω * cosi) * yOrbital;
  const z = (sinω * sini) * xOrbital + (cosω * sini) * yOrbital;

  return new THREE.Vector3(x * AU_SCALE, z * AU_SCALE, -y * AU_SCALE);
}

/**
 * Generate orbit path points for rendering
 */
export function getOrbitPath(planet: PlanetData, segments = 128): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let j = 0; j <= segments; j++) {
    const t = (j / segments) * planet.orbitalPeriod;
    points.push(getPlanetPosition(planet, t));
  }
  return points;
}
