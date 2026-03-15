// Orbital elements and physical data for the solar system
// Distances in AU, periods in Earth years, masses in kg, radii in km

export interface PlanetData {
  name: string;
  color: string;
  radius: number; // km
  displayRadius: number; // scene units (exaggerated for visibility)
  semiMajorAxis: number; // AU
  eccentricity: number;
  inclination: number; // degrees
  longitudeOfAscendingNode: number; // degrees
  argumentOfPerihelion: number; // degrees
  meanLongitudeAtEpoch: number; // degrees (J2000)
  orbitalPeriod: number; // Earth years
  mass: string;
  distanceFromSun: string;
  composition: string;
  funFact: string;
  moons?: number;
  hasRings?: boolean;
}

export const AU_SCALE = 10; // 1 AU = 10 scene units

export const SUN_DATA = {
  name: "Sun",
  color: "#FDB813",
  radius: 696340,
  displayRadius: 1.5,
  mass: "1.989 × 10³⁰ kg",
  composition: "Hydrogen (73%), Helium (25%), heavier elements (2%)",
  funFact: "The Sun accounts for 99.86% of the total mass of the Solar System.",
};

export const PLANETS: PlanetData[] = [
  {
    name: "Mercury",
    color: "#B5B5B5",
    radius: 2440,
    displayRadius: 0.15,
    semiMajorAxis: 0.387,
    eccentricity: 0.2056,
    inclination: 7.0,
    longitudeOfAscendingNode: 48.33,
    argumentOfPerihelion: 29.12,
    meanLongitudeAtEpoch: 252.25,
    orbitalPeriod: 0.2408,
    mass: "3.301 × 10²³ kg",
    distanceFromSun: "57.9 million km",
    composition: "Iron core, silicate mantle",
    funFact: "Mercury has the most eccentric orbit of any planet and experiences temperature swings of over 600°C.",
    moons: 0,
  },
  {
    name: "Venus",
    color: "#E8CDA0",
    radius: 6052,
    displayRadius: 0.25,
    semiMajorAxis: 0.723,
    eccentricity: 0.0068,
    inclination: 3.39,
    longitudeOfAscendingNode: 76.68,
    argumentOfPerihelion: 54.85,
    meanLongitudeAtEpoch: 181.98,
    orbitalPeriod: 0.6152,
    mass: "4.867 × 10²⁴ kg",
    distanceFromSun: "108.2 million km",
    composition: "Iron core, rocky mantle, thick CO₂ atmosphere",
    funFact: "Venus rotates backwards compared to most planets, and a day on Venus is longer than its year.",
    moons: 0,
  },
  {
    name: "Earth",
    color: "#6B93D6",
    radius: 6371,
    displayRadius: 0.28,
    semiMajorAxis: 1.0,
    eccentricity: 0.0167,
    inclination: 0.0,
    longitudeOfAscendingNode: -11.26,
    argumentOfPerihelion: 114.21,
    meanLongitudeAtEpoch: 100.46,
    orbitalPeriod: 1.0,
    mass: "5.972 × 10²⁴ kg",
    distanceFromSun: "149.6 million km",
    composition: "Iron core, silicate mantle, nitrogen-oxygen atmosphere",
    funFact: "Earth is the only known planet to harbor life and has liquid water on its surface.",
    moons: 1,
  },
  {
    name: "Mars",
    color: "#C1440E",
    radius: 3390,
    displayRadius: 0.2,
    semiMajorAxis: 1.524,
    eccentricity: 0.0934,
    inclination: 1.85,
    longitudeOfAscendingNode: 49.56,
    argumentOfPerihelion: 286.5,
    meanLongitudeAtEpoch: 355.45,
    orbitalPeriod: 1.881,
    mass: "6.417 × 10²³ kg",
    distanceFromSun: "227.9 million km",
    composition: "Iron core, basaltic rock surface, thin CO₂ atmosphere",
    funFact: "Mars has the tallest volcano in the solar system — Olympus Mons at 21.9 km high.",
    moons: 2,
  },
  {
    name: "Jupiter",
    color: "#C88B3A",
    radius: 69911,
    displayRadius: 0.6,
    semiMajorAxis: 5.203,
    eccentricity: 0.0489,
    inclination: 1.3,
    longitudeOfAscendingNode: 100.46,
    argumentOfPerihelion: 273.87,
    meanLongitudeAtEpoch: 34.4,
    orbitalPeriod: 11.86,
    mass: "1.898 × 10²⁷ kg",
    distanceFromSun: "778.5 million km",
    composition: "Hydrogen and helium gas giant, possible rocky core",
    funFact: "Jupiter's Great Red Spot is a storm that has been raging for at least 350 years.",
    moons: 95,
  },
  {
    name: "Saturn",
    color: "#E4D191",
    radius: 58232,
    displayRadius: 0.5,
    semiMajorAxis: 9.537,
    eccentricity: 0.0565,
    inclination: 2.49,
    longitudeOfAscendingNode: 113.72,
    argumentOfPerihelion: 339.39,
    meanLongitudeAtEpoch: 49.94,
    orbitalPeriod: 29.46,
    mass: "5.683 × 10²⁶ kg",
    distanceFromSun: "1.434 billion km",
    composition: "Hydrogen and helium gas giant with icy rings",
    funFact: "Saturn's density is so low it would float in water if you could find a bathtub big enough.",
    moons: 146,
    hasRings: true,
  },
  {
    name: "Uranus",
    color: "#7EC8E3",
    radius: 25362,
    displayRadius: 0.4,
    semiMajorAxis: 19.19,
    eccentricity: 0.0457,
    inclination: 0.77,
    longitudeOfAscendingNode: 74.0,
    argumentOfPerihelion: 96.99,
    meanLongitudeAtEpoch: 313.23,
    orbitalPeriod: 84.01,
    mass: "8.681 × 10²⁵ kg",
    distanceFromSun: "2.871 billion km",
    composition: "Water, methane, and ammonia ices over a rocky core",
    funFact: "Uranus rotates on its side with an axial tilt of 98°, likely from a massive collision.",
    moons: 28,
  },
  {
    name: "Neptune",
    color: "#3F54BA",
    radius: 24622,
    displayRadius: 0.38,
    semiMajorAxis: 30.07,
    eccentricity: 0.0113,
    inclination: 1.77,
    longitudeOfAscendingNode: 131.72,
    argumentOfPerihelion: 273.19,
    meanLongitudeAtEpoch: 304.88,
    orbitalPeriod: 164.8,
    mass: "1.024 × 10²⁶ kg",
    distanceFromSun: "4.495 billion km",
    composition: "Water, methane, and ammonia ices, hydrogen-helium atmosphere",
    funFact: "Neptune has the strongest sustained winds of any planet — up to 2,100 km/h.",
    moons: 16,
  },
];

export const MOON_DATA = {
  name: "Moon",
  color: "#AAAAAA",
  displayRadius: 0.08,
  orbitRadius: 0.6, // scene units from Earth
  orbitalPeriod: 27.32 / 365.25, // in Earth years
};
