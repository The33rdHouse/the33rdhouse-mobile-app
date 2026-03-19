/**
 * Membership Tier Gating Utilities
 * 
 * Defines access control based on membership tiers:
 * - Free: Limited access (36 Realms, 3 Gates, basic features)
 * - Seeker ($33/mo): Expanded access (72 Realms, 6 Gates, AI Assistant)
 * - Sovereign ($333/mo): Advanced access (108 Realms, 9 Gates, Professors, War Room)
 * - Ascended ($3,333/mo): Full access (all 144 Realms, all 12 Gates, everything)
 */

export type MembershipTier = "free" | "seeker" | "sovereign" | "ascended";

export interface TierLimits {
  maxRealms: number;
  maxGates: number;
  hasAIAssistant: boolean;
  hasProfessors: boolean;
  hasWarRoom: boolean;
  hasAffiliate: boolean;
  hasDailyMissions: boolean;
  hasLeaderboard: boolean;
  hasVideoGeneration: boolean;
  hasBadges: boolean;
}

export const TIER_LIMITS: Record<MembershipTier, TierLimits> = {
  free: {
    maxRealms: 36, // Gates 0-2 (3 gates × 12 realms)
    maxGates: 3, // Gates 0, 1, 2
    hasAIAssistant: false,
    hasProfessors: false,
    hasWarRoom: false,
    hasAffiliate: false,
    hasDailyMissions: true,
    hasLeaderboard: true,
    hasVideoGeneration: false,
    hasBadges: true,
  },
  seeker: {
    maxRealms: 72, // Gates 0-5 (6 gates × 12 realms)
    maxGates: 6, // Gates 0-5
    hasAIAssistant: true,
    hasProfessors: false,
    hasWarRoom: true,
    hasAffiliate: true,
    hasDailyMissions: true,
    hasLeaderboard: true,
    hasVideoGeneration: false,
    hasBadges: true,
  },
  sovereign: {
    maxRealms: 108, // Gates 0-8 (9 gates × 12 realms)
    maxGates: 9, // Gates 0-8
    hasAIAssistant: true,
    hasProfessors: true,
    hasWarRoom: true,
    hasAffiliate: true,
    hasDailyMissions: true,
    hasLeaderboard: true,
    hasVideoGeneration: true,
    hasBadges: true,
  },
  ascended: {
    maxRealms: 144, // All realms
    maxGates: 13, // All gates (0-12)
    hasAIAssistant: true,
    hasProfessors: true,
    hasWarRoom: true,
    hasAffiliate: true,
    hasDailyMissions: true,
    hasLeaderboard: true,
    hasVideoGeneration: true,
    hasBadges: true,
  },
};

export const TIER_NAMES: Record<MembershipTier, string> = {
  free: "Free",
  seeker: "Seeker",
  sovereign: "Sovereign",
  ascended: "Ascended",
};

export const TIER_EMOJIS: Record<MembershipTier, string> = {
  free: "🌱",
  seeker: "🔮",
  sovereign: "💎",
  ascended: "👑",
};

export const TIER_PRICES: Record<MembershipTier, number> = {
  free: 0,
  seeker: 33,
  sovereign: 333,
  ascended: 3333,
};

/**
 * Check if a user's tier allows access to a specific realm
 */
export function canAccessRealm(userTier: MembershipTier, realmNumber: number): boolean {
  const limits = TIER_LIMITS[userTier];
  return realmNumber <= limits.maxRealms;
}

/**
 * Check if a user's tier allows access to a specific gate
 */
export function canAccessGate(userTier: MembershipTier, gateNumber: number): boolean {
  const limits = TIER_LIMITS[userTier];
  return gateNumber < limits.maxGates;
}

/**
 * Check if a user's tier allows access to a specific feature
 */
export function hasFeatureAccess(
  userTier: MembershipTier,
  feature: keyof Omit<TierLimits, "maxRealms" | "maxGates">
): boolean {
  const limits = TIER_LIMITS[userTier];
  return limits[feature];
}

/**
 * Get the minimum tier required to access a realm
 */
export function getRequiredTierForRealm(realmNumber: number): MembershipTier {
  if (realmNumber <= 36) return "free";
  if (realmNumber <= 72) return "seeker";
  if (realmNumber <= 108) return "sovereign";
  return "ascended";
}

/**
 * Get the minimum tier required to access a gate
 */
export function getRequiredTierForGate(gateNumber: number): MembershipTier {
  if (gateNumber < 3) return "free";
  if (gateNumber < 6) return "seeker";
  if (gateNumber < 9) return "sovereign";
  return "ascended";
}

/**
 * Get the minimum tier required for a feature
 */
export function getRequiredTierForFeature(
  feature: keyof Omit<TierLimits, "maxRealms" | "maxGates">
): MembershipTier {
  // Find the lowest tier that has this feature
  const tiers: MembershipTier[] = ["free", "seeker", "sovereign", "ascended"];
  for (const tier of tiers) {
    if (TIER_LIMITS[tier][feature]) {
      return tier;
    }
  }
  return "ascended"; // Default to highest tier
}

/**
 * Get upgrade message for locked content
 */
export function getUpgradeMessage(requiredTier: MembershipTier): string {
  const tierName = TIER_NAMES[requiredTier];
  const tierEmoji = TIER_EMOJIS[requiredTier];
  const price = TIER_PRICES[requiredTier];
  
  return `Upgrade to ${tierEmoji} ${tierName} ($${price}/mo) to unlock this content`;
}
