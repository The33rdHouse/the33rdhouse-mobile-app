// DAO Tokenomics for The 33rd House

export interface TokenDistribution {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

export interface GovernanceRule {
  type: string;
  quorum: number;
  approval: number;
  description: string;
}

export const TOTAL_SUPPLY = 33000000; // 33M $HOUSE tokens

export const TOKEN_DISTRIBUTION: TokenDistribution[] = [
  {
    category: "Community Treasury",
    amount: 13200000,
    percentage: 40,
    color: "#FFD700", // Gold
  },
  {
    category: "Founding Team",
    amount: 6600000,
    percentage: 20,
    color: "#4A148C", // Purple
  },
  {
    category: "Early Supporters",
    amount: 3300000,
    percentage: 10,
    color: "#1A237E", // Cosmic Blue
  },
  {
    category: "Liquidity Pool",
    amount: 3300000,
    percentage: 10,
    color: "#00BCD4", // Cyan
  },
  {
    category: "Ecosystem Fund",
    amount: 2640000,
    percentage: 8,
    color: "#4CAF50", // Green
  },
  {
    category: "Practitioner Rewards",
    amount: 1980000,
    percentage: 6,
    color: "#FF9800", // Orange
  },
  {
    category: "Public Sale",
    amount: 1320000,
    percentage: 4,
    color: "#E91E63", // Pink
  },
  {
    category: "Advisors",
    amount: 660000,
    percentage: 2,
    color: "#9C27B0", // Light Purple
  },
];

export const GOVERNANCE_RULES: GovernanceRule[] = [
  {
    type: "Constitutional",
    quorum: 20,
    approval: 75,
    description: "Changes to core system rules, values, or structure",
  },
  {
    type: "Treasury",
    quorum: 10,
    approval: 66,
    description: "Large treasury allocations or major financial decisions",
  },
  {
    type: "Operational",
    quorum: 5,
    approval: 51,
    description: "Day-to-day operations, minor allocations, partnerships",
  },
  {
    type: "Emergency",
    quorum: 15,
    approval: 80,
    description: "Critical security or urgent community matters",
  },
];

export const TREASURY_TARGETS = {
  initial: 1000000, // $1M
  year1: 5000000, // $5M
  year5: 10000000, // $10M
};

export interface DAOMetrics {
  totalSupply: number;
  circulatingSupply: number;
  treasuryBalance: number;
  activeProposals: number;
  totalHolders: number;
  avgHoldingPeriod: string;
}

export const MOCK_DAO_METRICS: DAOMetrics = {
  totalSupply: TOTAL_SUPPLY,
  circulatingSupply: 8250000, // 25% circulating
  treasuryBalance: 2500000, // $2.5M
  activeProposals: 3,
  totalHolders: 1247,
  avgHoldingPeriod: "8.3 months",
};
