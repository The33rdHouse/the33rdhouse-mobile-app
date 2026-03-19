import { StyleSheet, ScrollView, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function AnalyticsScreen() {
  const cardBg = useThemeColor({}, "card");
  const goldColor = useThemeColor({}, "gold");
  const purpleColor = useThemeColor({}, "purple");

  // Mock data - in real app, this would come from user progress
  const riskScore = 6.5;
  const shadowReadiness = 75;
  const burnoutRisk = 30;

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Analytics</ThemedText>
          <ThemedText style={styles.subtitle}>Aladdin-Inspired Intelligence</ThemedText>
        </ThemedView>

        {/* Risk Assessment Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Risk Assessment
          </ThemedText>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Current Gate Intensity</ThemedText>
            <View style={styles.scoreContainer}>
              <ThemedText style={[styles.scoreValue, { color: goldColor }]}>
                {riskScore.toFixed(1)}
              </ThemedText>
              <ThemedText style={styles.scoreLabel}>/10</ThemedText>
            </View>
            <View style={styles.scoreBar}>
              <View
                style={[
                  styles.scoreBarFill,
                  { width: `${(riskScore / 10) * 100}%`, backgroundColor: goldColor },
                ]}
              />
            </View>
            <ThemedText style={styles.cardDescription}>
              Moderate intensity. You're in a transformative phase. Stay grounded.
            </ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Shadow Work Readiness</ThemedText>
            <View style={styles.scoreContainer}>
              <ThemedText style={[styles.scoreValue, { color: purpleColor }]}>
                {shadowReadiness}%
              </ThemedText>
            </View>
            <View style={styles.scoreBar}>
              <View
                style={[
                  styles.scoreBarFill,
                  { width: `${shadowReadiness}%`, backgroundColor: purpleColor },
                ]}
              />
            </View>
            <ThemedText style={styles.cardDescription}>
              You're ready for deeper shadow work. Consider Gate 8 practices.
            </ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Burnout Risk</ThemedText>
            <View style={styles.scoreContainer}>
              <ThemedText style={[styles.scoreValue, { color: "#4CAF50" }]}>
                {burnoutRisk}%
              </ThemedText>
            </View>
            <View style={styles.scoreBar}>
              <View
                style={[
                  styles.scoreBarFill,
                  { width: `${burnoutRisk}%`, backgroundColor: "#4CAF50" },
                ]}
              />
            </View>
            <ThemedText style={styles.cardDescription}>
              Low risk. Your pace is sustainable. Keep up the good work.
            </ThemedText>
          </View>
        </View>

        {/* Portfolio Analysis Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Energy Portfolio
          </ThemedText>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>4 Currents Distribution</ThemedText>
            <View style={styles.chartPlaceholder}>
              <ThemedText style={styles.chartLabel}>Fire: 30%</ThemedText>
              <ThemedText style={styles.chartLabel}>Water: 25%</ThemedText>
              <ThemedText style={styles.chartLabel}>Air: 20%</ThemedText>
              <ThemedText style={styles.chartLabel}>Earth: 25%</ThemedText>
            </View>
            <ThemedText style={styles.cardDescription}>
              Balanced energy distribution across all elements.
            </ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>7 Seals Balance</ThemedText>
            <View style={styles.chakraList}>
              {[
                { name: "Root", value: 85 },
                { name: "Sacral", value: 70 },
                { name: "Solar", value: 90 },
                { name: "Heart", value: 95 },
                { name: "Throat", value: 60 },
                { name: "Third Eye", value: 75 },
                { name: "Crown", value: 80 },
              ].map((chakra) => (
                <View key={chakra.name} style={styles.chakraItem}>
                  <ThemedText style={styles.chakraName}>{chakra.name}</ThemedText>
                  <View style={styles.chakraBar}>
                    <View
                      style={[
                        styles.chakraBarFill,
                        { width: `${chakra.value}%`, backgroundColor: goldColor },
                      ]}
                    />
                  </View>
                  <ThemedText style={styles.chakraValue}>{chakra.value}%</ThemedText>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Predictive Modeling Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Predictive Insights
          </ThemedText>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Estimated Completion</ThemedText>
            <ThemedText style={[styles.predictionValue, { color: goldColor }]}>
              March 2028
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              Based on your current pace, you'll complete all 13 Gates in approximately 2.5 years.
            </ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Next Recommended Gate</ThemedText>
            <ThemedText style={[styles.predictionValue, { color: purpleColor }]}>
              Gate 5: The Heart
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              Your energy profile suggests you're ready for heart-opening work.
            </ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Optimal Practice Time</ThemedText>
            <ThemedText style={[styles.predictionValue, { color: goldColor }]}>
              Waxing Moon
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              The next 7 days are ideal for manifestation and growth practices.
            </ThemedText>
          </View>
        </View>

        {/* Community Insights Section */}
        <View style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Community Insights
          </ThemedText>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Your Rank</ThemedText>
            <ThemedText style={[styles.predictionValue, { color: goldColor }]}>
              Top 15%
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              You're progressing faster than 85% of practitioners.
            </ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Average Journey Duration</ThemedText>
            <ThemedText style={[styles.predictionValue, { color: purpleColor }]}>
              3.2 years
            </ThemedText>
            <ThemedText style={styles.cardDescription}>
              Most practitioners complete the full journey in 2-5 years.
            </ThemedText>
          </View>

          <View style={[styles.card, { backgroundColor: cardBg }]}>
            <ThemedText style={styles.cardTitle}>Most Popular Realms</ThemedText>
            <ThemedText style={styles.realmList}>
              1. The Dragon Awakens (Gate 5){"\n"}
              2. The Sacred Contract (Gate 0){"\n"}
              3. The Sovereign Throne (Gate 11)
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
    opacity: 0.7,
    marginTop: 8,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 12,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: "bold",
  },
  scoreLabel: {
    fontSize: 24,
    opacity: 0.6,
    marginLeft: 4,
  },
  scoreBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  scoreBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  chartPlaceholder: {
    padding: 20,
    gap: 8,
  },
  chartLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  chakraList: {
    gap: 12,
  },
  chakraItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  chakraName: {
    width: 80,
    fontSize: 13,
    fontWeight: "600",
  },
  chakraBar: {
    flex: 1,
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 3,
    overflow: "hidden",
  },
  chakraBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  chakraValue: {
    width: 40,
    fontSize: 12,
    textAlign: "right",
  },
  predictionValue: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  realmList: {
    fontSize: 14,
    lineHeight: 22,
  },
});
