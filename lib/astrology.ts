import * as SunCalc from "suncalc";

export interface BirthData {
  date: string; // ISO date string
  time: string; // HH:MM format
  latitude: number;
  longitude: number;
  timezone: string;
}

export interface NatalChart {
  sun: { sign: string; degree: number };
  moon: { sign: string; degree: number };
  rising: { sign: string; degree: number };
  mercury: { sign: string; degree: number };
  venus: { sign: string; degree: number };
  mars: { sign: string; degree: number };
  jupiter: { sign: string; degree: number };
  saturn: { sign: string; degree: number };
}

export interface CurrentTransits {
  date: Date;
  moonPhase: string;
  moonSign: string;
  sunSign: string;
  currentGate: number;
  lunarDay: number;
  recommendations: string[];
}

const ZODIAC_SIGNS = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

// Map zodiac signs to Gates (Aries = Gate 1, etc.)
const SIGN_TO_GATE: Record<string, number> = {
  Aries: 1,
  Taurus: 2,
  Gemini: 3,
  Cancer: 4,
  Leo: 5,
  Virgo: 6,
  Libra: 7,
  Scorpio: 8,
  Sagittarius: 9,
  Capricorn: 10,
  Aquarius: 11,
  Pisces: 12,
};

/**
 * Calculate zodiac sign from ecliptic longitude
 */
function getZodiacSign(longitude: number): { sign: string; degree: number } {
  const normalizedLong = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalizedLong / 30);
  const degree = normalizedLong % 30;
  return {
    sign: ZODIAC_SIGNS[signIndex],
    degree: Math.round(degree * 100) / 100,
  };
}

/**
 * Simple sun position calculation
 * For production, use a proper ephemeris library
 */
function getSunPosition(date: Date): number {
  const dayOfYear = Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / 86400000
  );
  // Approximate sun longitude (very simplified)
  // March 21 (day 80) = 0° Aries
  const longitude = ((dayOfYear - 80) * 0.9856) % 360;
  return longitude < 0 ? longitude + 360 : longitude;
}

/**
 * Simple moon position calculation
 */
function getMoonPosition(date: Date): number {
  const daysSinceEpoch = date.getTime() / 86400000;
  // Moon completes orbit in ~27.3 days
  const longitude = (daysSinceEpoch * 13.176358) % 360;
  return longitude;
}

/**
 * Calculate moon phase
 */
export function getMoonPhase(date: Date = new Date()): {
  phase: string;
  illumination: number;
  lunarDay: number;
} {
  const moonIllumination = SunCalc.getMoonIllumination(date);
  const phase = moonIllumination.phase;
  const illumination = moonIllumination.fraction;

  let phaseName: string;
  if (phase < 0.03 || phase > 0.97) phaseName = "New Moon";
  else if (phase < 0.22) phaseName = "Waxing Crescent";
  else if (phase < 0.28) phaseName = "First Quarter";
  else if (phase < 0.47) phaseName = "Waxing Gibbous";
  else if (phase < 0.53) phaseName = "Full Moon";
  else if (phase < 0.72) phaseName = "Waning Gibbous";
  else if (phase < 0.78) phaseName = "Last Quarter";
  else phaseName = "Waning Crescent";

  // Lunar day (1-29.5)
  const lunarDay = Math.floor(phase * 29.5) + 1;

  return {
    phase: phaseName,
    illumination: Math.round(illumination * 100),
    lunarDay,
  };
}

/**
 * Calculate current transits
 */
export function getCurrentTransits(
  latitude: number = 0,
  longitude: number = 0
): CurrentTransits {
  const now = new Date();

  // Sun position
  const sunLong = getSunPosition(now);
  const sunData = getZodiacSign(sunLong);

  // Moon position
  const moonLong = getMoonPosition(now);
  const moonData = getZodiacSign(moonLong);

  // Moon phase
  const moonPhaseData = getMoonPhase(now);

  // Current Gate (based on Sun sign)
  const currentGate = SIGN_TO_GATE[sunData.sign];

  // Generate recommendations based on moon phase and sign
  const recommendations: string[] = [];

  // Moon phase recommendations
  if (moonPhaseData.phase === "New Moon") {
    recommendations.push("New beginnings - Set intentions for the lunar cycle");
    recommendations.push("Gate 0 practices - Sacred contracts and commitments");
  } else if (moonPhaseData.phase === "Full Moon") {
    recommendations.push("Culmination and release - Complete what you started");
    recommendations.push("Shadow work - What needs to be released?");
  } else if (moonPhaseData.phase.includes("Waxing")) {
    recommendations.push("Building energy - Take action on your intentions");
    recommendations.push("Focus on growth and expansion practices");
  } else if (moonPhaseData.phase.includes("Waning")) {
    recommendations.push("Releasing energy - Let go of what no longer serves");
    recommendations.push("Rest, reflection, and integration");
  }

  // Moon sign recommendations
  const moonGate = SIGN_TO_GATE[moonData.sign];
  recommendations.push(`Moon in ${moonData.sign} - Explore Gate ${moonGate} themes today`);

  return {
    date: now,
    moonPhase: moonPhaseData.phase,
    moonSign: moonData.sign,
    sunSign: sunData.sign,
    currentGate,
    lunarDay: moonPhaseData.lunarDay,
    recommendations,
  };
}

/**
 * Calculate natal chart (simplified)
 * For production, use Swiss Ephemeris or similar
 */
export function calculateNatalChart(birthData: BirthData): NatalChart {
  const birthDate = new Date(`${birthData.date}T${birthData.time}`);

  // Sun position
  const sunLong = getSunPosition(birthDate);
  const sun = getZodiacSign(sunLong);

  // Moon position
  const moonLong = getMoonPosition(birthDate);
  const moon = getZodiacSign(moonLong);

  // Rising sign (simplified - based on birth time)
  const birthHour = parseInt(birthData.time.split(":")[0]);
  const risingLong = ((birthHour * 15) % 360); // Very simplified
  const rising = getZodiacSign(risingLong);

  // Other planets (simplified approximations)
  const mercury = getZodiacSign((sunLong + 20) % 360);
  const venus = getZodiacSign((sunLong + 40) % 360);
  const mars = getZodiacSign((sunLong - 30 + 360) % 360);
  const jupiter = getZodiacSign((sunLong + 120) % 360);
  const saturn = getZodiacSign((sunLong - 120 + 360) % 360);

  return {
    sun,
    moon,
    rising,
    mercury,
    venus,
    mars,
    jupiter,
    saturn,
  };
}

/**
 * Generate astrology summary for AI context
 */
export function getAstrologyContext(birthData?: BirthData): string {
  let context = "CURRENT ASTROLOGY:\\n";

  const transits = getCurrentTransits();
  context += `- Sun in ${transits.sunSign} (Gate ${transits.currentGate})\\n`;
  context += `- Moon in ${transits.moonSign} (${transits.moonPhase}, Day ${transits.lunarDay})\\n`;
  context += `- Recommendations: ${transits.recommendations.join("; ")}\\n`;

  if (birthData) {
    const chart = calculateNatalChart(birthData);
    context += `\\nNATAL CHART:\\n`;
    context += `- Sun: ${chart.sun.sign} ${chart.sun.degree}°\\n`;
    context += `- Moon: ${chart.moon.sign} ${chart.moon.degree}°\\n`;
    context += `- Rising: ${chart.rising.sign} ${chart.rising.degree}°\\n`;
    context += `- Mercury: ${chart.mercury.sign}\\n`;
    context += `- Venus: ${chart.venus.sign}\\n`;
    context += `- Mars: ${chart.mars.sign}\\n`;
  }

  return context;
}
