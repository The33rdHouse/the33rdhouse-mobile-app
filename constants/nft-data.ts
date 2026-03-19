// NFT Collection Data for The 33rd House - 144 Realm Glyphs

export type RarityTier = "Legendary" | "Epic" | "Rare" | "Common";

export interface NFTRarity {
  tier: RarityTier;
  count: number;
  percentage: number;
  priceETH: number;
  color: string;
  benefits: string[];
}

export interface NFT {
  id: number;
  name: string;
  realmId: number;
  rarity: RarityTier;
  priceETH: number;
  gate: number;
  element: string;
  zodiac: string;
}

export const NFT_RARITY_TIERS: NFTRarity[] = [
  {
    tier: "Legendary",
    count: 12,
    percentage: 8.3,
    priceETH: 3.33,
    color: "#FFD700", // Gold
    benefits: [
      "Full DAO voting rights",
      "Access to all courses and content",
      "1-on-1 mentorship sessions (quarterly)",
      "Exclusive Legendary holder events",
      "Priority access to new features",
      "Lifetime membership",
    ],
  },
  {
    tier: "Epic",
    count: 24,
    percentage: 16.7,
    priceETH: 0.99,
    color: "#9C27B0", // Purple
    benefits: [
      "Enhanced DAO voting power (2x)",
      "Access to premium courses",
      "Group mentorship sessions (monthly)",
      "Epic holder community access",
      "Early access to new features",
    ],
  },
  {
    tier: "Rare",
    count: 36,
    percentage: 25,
    priceETH: 0.33,
    color: "#2196F3", // Blue
    benefits: [
      "Standard DAO voting rights",
      "Access to core courses",
      "Community events access",
      "Rare holder Discord channel",
    ],
  },
  {
    tier: "Common",
    count: 72,
    percentage: 50,
    priceETH: 0.11,
    color: "#9E9E9E", // Gray
    benefits: [
      "Basic DAO voting rights",
      "Access to foundational content",
      "Community membership",
      "Holder Discord access",
    ],
  },
];

// Generate NFT collection based on 144 Realms
export const generateNFTCollection = (): NFT[] => {
  const nfts: NFT[] = [];
  let currentId = 1;

  // Legendary: 12 NFTs (one per Gate, excluding Gate 0)
  for (let gate = 1; gate <= 12; gate++) {
    nfts.push({
      id: currentId++,
      name: `Realm ${gate * 12} - Gate ${gate} Legendary`,
      realmId: gate * 12,
      rarity: "Legendary",
      priceETH: 3.33,
      gate,
      element: ["Fire", "Earth", "Air", "Water"][gate % 4],
      zodiac: [
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
      ][gate - 1],
    });
  }

  // Epic: 24 NFTs (2 per Gate)
  for (let gate = 0; gate <= 11; gate++) {
    for (let i = 0; i < 2; i++) {
      const realmId = gate * 12 + i + 1;
      nfts.push({
        id: currentId++,
        name: `Realm ${realmId} - Epic`,
        realmId,
        rarity: "Epic",
        priceETH: 0.99,
        gate,
        element: ["Fire", "Earth", "Air", "Water"][gate % 4],
        zodiac: [
          "Sagittarius",
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
        ][gate],
      });
    }
  }

  // Rare: 36 NFTs (3 per Gate)
  for (let gate = 0; gate <= 11; gate++) {
    for (let i = 0; i < 3; i++) {
      const realmId = gate * 12 + i + 3;
      nfts.push({
        id: currentId++,
        name: `Realm ${realmId} - Rare`,
        realmId,
        rarity: "Rare",
        priceETH: 0.33,
        gate,
        element: ["Fire", "Earth", "Air", "Water"][gate % 4],
        zodiac: [
          "Sagittarius",
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
        ][gate],
      });
    }
  }

  // Common: 72 NFTs (6 per Gate)
  for (let gate = 0; gate <= 11; gate++) {
    for (let i = 0; i < 6; i++) {
      const realmId = gate * 12 + i + 7;
      nfts.push({
        id: currentId++,
        name: `Realm ${realmId} - Common`,
        realmId,
        rarity: "Common",
        priceETH: 0.11,
        gate,
        element: ["Fire", "Earth", "Air", "Water"][gate % 4],
        zodiac: [
          "Sagittarius",
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
        ][gate],
      });
    }
  }

  return nfts;
};

export const NFT_COLLECTION = generateNFTCollection();

export const getTotalMintRevenue = (): number => {
  return NFT_RARITY_TIERS.reduce((total, tier) => {
    return total + tier.count * tier.priceETH;
  }, 0);
};

export const getNFTsByRarity = (rarity: RarityTier): NFT[] => {
  return NFT_COLLECTION.filter((nft) => nft.rarity === rarity);
};

export const getNFTById = (id: number): NFT | undefined => {
  return NFT_COLLECTION.find((nft) => nft.id === id);
};

// Revenue allocation (percentages)
export const REVENUE_ALLOCATION = {
  daoTreasury: 50,
  development: 30,
  marketing: 10,
  foundingTeam: 10,
};

// Royalties (percentages)
export const ROYALTIES = {
  total: 7.5,
  toDAO: 5,
  toCreator: 2.5,
};
