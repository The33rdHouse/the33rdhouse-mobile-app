import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  TOTAL_SUPPLY,
  TOKEN_DISTRIBUTION,
  GOVERNANCE_RULES,
  TREASURY_TARGETS,
  MOCK_DAO_METRICS,
} from "@/constants/dao-data";

export default function DAOScreen() {
  const cardBg = useThemeColor({}, "card");
  const goldColor = useThemeColor({}, "gold");

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <ThemedText type="title">DAO Dashboard</ThemedText>
          <ThemedText style={styles.subtitle}>The 33rd House Governance</ThemedText>
        </ThemedView>

        {/* Key Metrics */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Key Metrics
          </ThemedText>
          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <ThemedText style={[styles.metricValue, { color: goldColor }]}>
                {formatNumber(MOCK_DAO_METRICS.totalSupply)}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>Total Supply</ThemedText>
            </View>
            <View style={styles.metricItem}>
              <ThemedText style={[styles.metricValue, { color: goldColor }]}>
                {formatNumber(MOCK_DAO_METRICS.circulatingSupply)}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>Circulating</ThemedText>
            </View>
            <View style={styles.metricItem}>
              <ThemedText style={[styles.metricValue, { color: goldColor }]}>
                ${formatNumber(MOCK_DAO_METRICS.treasuryBalance)}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>Treasury</ThemedText>
            </View>
            <View style={styles.metricItem}>
              <ThemedText style={[styles.metricValue, { color: goldColor }]}>
                {MOCK_DAO_METRICS.activeProposals}
              </ThemedText>
              <ThemedText style={styles.metricLabel}>Active Proposals</ThemedText>
            </View>
          </View>
        </View>

        {/* Token Distribution */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Token Distribution
          </ThemedText>
          <ThemedText style={styles.totalSupply}>
            Total Supply: {formatNumber(TOTAL_SUPPLY)} $HOUSE
          </ThemedText>
          <View style={styles.distributionList}>
            {TOKEN_DISTRIBUTION.map((item, index) => (
              <View key={index} style={styles.distributionItem}>
                <View style={styles.distributionHeader}>
                  <View style={[styles.colorDot, { backgroundColor: item.color }]} />
                  <ThemedText style={styles.distributionCategory}>{item.category}</ThemedText>
                </View>
                <View style={styles.distributionDetails}>
                  <ThemedText style={styles.distributionAmount}>
                    {formatNumber(item.amount)}
                  </ThemedText>
                  <ThemedText style={styles.distributionPercentage}>
                    {item.percentage}%
                  </ThemedText>
                </View>
                <View style={styles.distributionBar}>
                  <View
                    style={[
                      styles.distributionBarFill,
                      { width: `${item.percentage}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Governance Rules */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Governance Rules
          </ThemedText>
          {GOVERNANCE_RULES.map((rule, index) => (
            <View key={index} style={styles.ruleItem}>
              <ThemedText style={styles.ruleType}>{rule.type}</ThemedText>
              <ThemedText style={styles.ruleDescription}>{rule.description}</ThemedText>
              <View style={styles.ruleMetrics}>
                <View style={styles.ruleMetric}>
                  <ThemedText style={styles.ruleMetricLabel}>Quorum</ThemedText>
                  <ThemedText style={styles.ruleMetricValue}>{rule.quorum}%</ThemedText>
                </View>
                <View style={styles.ruleMetric}>
                  <ThemedText style={styles.ruleMetricLabel}>Approval</ThemedText>
                  <ThemedText style={styles.ruleMetricValue}>{rule.approval}%</ThemedText>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Treasury Targets */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Treasury Targets
          </ThemedText>
          <View style={styles.targetsList}>
            <View style={styles.targetItem}>
              <ThemedText style={styles.targetLabel}>Initial Target</ThemedText>
              <ThemedText style={[styles.targetValue, { color: goldColor }]}>
                ${formatNumber(TREASURY_TARGETS.initial)}
              </ThemedText>
            </View>
            <View style={styles.targetItem}>
              <ThemedText style={styles.targetLabel}>Year 1 Target</ThemedText>
              <ThemedText style={[styles.targetValue, { color: goldColor }]}>
                ${formatNumber(TREASURY_TARGETS.year1)}
              </ThemedText>
            </View>
            <View style={styles.targetItem}>
              <ThemedText style={styles.targetLabel}>Year 5 Target</ThemedText>
              <ThemedText style={[styles.targetValue, { color: goldColor }]}>
                ${formatNumber(TREASURY_TARGETS.year5)}
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Community Stats */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Community Stats
          </ThemedText>
          <View style={styles.statRow}>
            <ThemedText style={styles.statLabel}>Total Holders</ThemedText>
            <ThemedText style={[styles.statValue, { color: goldColor }]}>
              {MOCK_DAO_METRICS.totalHolders.toLocaleString()}
            </ThemedText>
          </View>
          <View style={styles.statRow}>
            <ThemedText style={styles.statLabel}>Avg Holding Period</ThemedText>
            <ThemedText style={[styles.statValue, { color: goldColor }]}>
              {MOCK_DAO_METRICS.avgHoldingPeriod}
            </ThemedText>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  card: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  metricsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
  metricItem: {
    width: "47%",
    paddingVertical: 12,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
  totalSupply: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    opacity: 0.9,
  },
  distributionList: {
    gap: 16,
  },
  distributionItem: {
    gap: 8,
  },
  distributionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  colorDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  distributionCategory: {
    fontSize: 14,
    fontWeight: "600",
  },
  distributionDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  distributionAmount: {
    fontSize: 16,
    fontWeight: "600",
  },
  distributionPercentage: {
    fontSize: 14,
    opacity: 0.7,
  },
  distributionBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  distributionBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  ruleItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  ruleType: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  ruleDescription: {
    fontSize: 13,
    opacity: 0.7,
    marginBottom: 12,
    lineHeight: 18,
  },
  ruleMetrics: {
    flexDirection: "row",
    gap: 24,
  },
  ruleMetric: {
    flex: 1,
  },
  ruleMetricLabel: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 2,
  },
  ruleMetricValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  targetsList: {
    gap: 12,
  },
  targetItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  targetLabel: {
    fontSize: 14,
  },
  targetValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  statLabel: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
  },
});
