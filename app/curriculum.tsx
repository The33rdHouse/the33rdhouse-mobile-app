/**
 * Curriculum Screen — The 33rd House
 * The 12-module structured initiatic curriculum.
 */
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";

interface CurriculumModule {
  number: number;
  gate: number;
  title: string;
  subtitle: string;
  duration: string;
  topics: string[];
  color: string;
  locked?: boolean;
}

const modules: CurriculumModule[] = [
  {
    number: 1,
    gate: 1,
    title: "The Awakening",
    subtitle: "Gate 1: Origin",
    duration: "4 weeks",
    topics: ["Presence & grounding", "The body-temple", "Foundational cosmology", "Sacred breath work"],
    color: "#7C3AED",
  },
  {
    number: 2,
    gate: 2,
    title: "The Directed Will",
    subtitle: "Gate 2: Focus",
    duration: "4 weeks",
    topics: ["Nervous system regulation", "Emotional alchemy", "Intentional living", "The law of vibration"],
    color: "#1D4ED8",
  },
  {
    number: 3,
    gate: 3,
    title: "The Opening",
    subtitle: "Gate 3: Expansion",
    duration: "4 weeks",
    topics: ["Identity & sovereignty", "Authentic self-expression", "Sacred boundaries", "The law of polarity"],
    color: "#065F46",
  },
  {
    number: 4,
    gate: 4,
    title: "The Sacred Flame",
    subtitle: "Gate 4: Power",
    duration: "4 weeks",
    topics: ["Personal power mastery", "Directed will", "Leadership & authority", "The law of rhythm"],
    color: "#92400E",
    locked: true,
  },
  {
    number: 5,
    gate: 5,
    title: "The Heart Opening",
    subtitle: "Gate 5: Connection",
    duration: "4 weeks",
    topics: ["Authentic relating", "Sacred union", "Community architecture", "The law of correspondence"],
    color: "#9D174D",
    locked: true,
  },
  {
    number: 6,
    gate: 6,
    title: "The Inner Alchemy",
    subtitle: "Gate 6: Shadow",
    duration: "4 weeks",
    topics: ["Shadow work", "Integration practices", "The underworld descent", "Jungian alchemy"],
    color: "#1E3A5F",
    locked: true,
  },
  {
    number: 7,
    gate: 7,
    title: "The Sacred Marriage",
    subtitle: "Gate 7: Union",
    duration: "4 weeks",
    topics: ["Polarity integration", "Inner marriage", "Divine masculine/feminine", "Hermetic alchemy"],
    color: "#5B21B6",
    locked: true,
  },
  {
    number: 8,
    gate: 8,
    title: "The Phoenix Gate",
    subtitle: "Gate 8: Death & Rebirth",
    duration: "4 weeks",
    topics: ["Ego dissolution", "Phoenix rising", "Rebirth practices", "The law of transmutation"],
    color: "#7F1D1D",
    locked: true,
  },
  {
    number: 9,
    gate: 9,
    title: "The Cosmic Eye",
    subtitle: "Gate 9: Vision",
    duration: "4 weeks",
    topics: ["Third eye activation", "Prophetic clarity", "Higher vision", "Kabbalistic sight"],
    color: "#1E3A5F",
    locked: true,
  },
  {
    number: 10,
    gate: 10,
    title: "The Divine Governance",
    subtitle: "Gate 10: Law & Order",
    duration: "4 weeks",
    topics: ["Cosmic law alignment", "Sacred order", "Ma'at principle", "The law of divine oneness"],
    color: "#14532D",
    locked: true,
  },
  {
    number: 11,
    gate: 11,
    title: "The Mystery",
    subtitle: "Gate 11: Paradox",
    duration: "4 weeks",
    topics: ["Non-dual awareness", "Holding paradox", "Taoist principles", "The unknowable"],
    color: "#3B0764",
    locked: true,
  },
  {
    number: 12,
    gate: 12,
    title: "The Return",
    subtitle: "Gate 12: Completion",
    duration: "4 weeks",
    topics: ["Integration & synthesis", "Return to source", "The eternal return", "Mastery & service"],
    color: "#C9A84C",
    locked: true,
  },
];

export default function CurriculumScreen() {
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  const unlockedCount = modules.filter((m) => !m.locked).length;

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="The Curriculum"
          subtitle="A structured 48-week initiatic programme — twelve modules, one for each Gate of the Star Gate Cosmology."
          badge="Sacred Curriculum"
          geoIndex={2}
        />

        {/* Overview Stats */}
        <View style={[styles.statsRow, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          {[
            { value: "12", label: "Modules" },
            { value: "48", label: "Weeks" },
            { value: "1 Year", label: "Journey" },
          ].map((stat, i) => (
            <View key={i} style={styles.statItem}>
              <ThemedText style={[styles.statValue, { color: goldColor }]}>{stat.value}</ThemedText>
              <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
            </View>
          ))}
        </View>

        {/* Intro */}
        <View style={styles.section}>
          <ThemedText style={styles.bodyText}>
            The curriculum is the structured path through the 12 Gates — a sequential, guided programme
            that takes the initiate from first awakening to sovereign mastery. Each module corresponds
            to one Gate and contains four weeks of teaching, practice, and integration.
          </ThemedText>
          <View style={[styles.progressBar, { backgroundColor: cardBg }]}>
            <View style={[styles.progressFill, { backgroundColor: tintColor, width: `${(unlockedCount / 12) * 100}%` }]} />
          </View>
          <ThemedText style={styles.progressLabel}>
            {unlockedCount} of 12 modules available on your current tier
          </ThemedText>
        </View>

        {/* Modules List */}
        <View style={styles.modulesList}>
          {modules.map((mod) => (
            <View
              key={mod.number}
              style={[
                styles.moduleCard,
                { backgroundColor: mod.locked ? "rgba(30,30,40,0.5)" : cardBg },
              ]}
            >
              {/* Module number stripe */}
              <View style={[styles.moduleStripe, { backgroundColor: mod.locked ? "#333" : mod.color }]}>
                <ThemedText style={styles.moduleNumber}>{mod.number.toString().padStart(2, "0")}</ThemedText>
              </View>
              <View style={styles.moduleContent}>
                <View style={styles.moduleHeader}>
                  <View style={styles.moduleTitles}>
                    <ThemedText
                      style={[styles.moduleTitle, { color: mod.locked ? "#666" : goldColor }]}
                    >
                      {mod.title}
                    </ThemedText>
                    <ThemedText style={[styles.moduleSubtitle, { color: mod.locked ? "#555" : "#a78bfa" }]}>
                      {mod.subtitle}
                    </ThemedText>
                  </View>
                  <View style={styles.moduleRight}>
                    {mod.locked ? (
                      <ThemedText style={styles.lockIcon}>🔒</ThemedText>
                    ) : (
                      <View style={[styles.durationBadge, { backgroundColor: mod.color + "30", borderColor: mod.color }]}>
                        <ThemedText style={[styles.durationText, { color: mod.color }]}>{mod.duration}</ThemedText>
                      </View>
                    )}
                  </View>
                </View>
                {!mod.locked && (
                  <View style={styles.topicsList}>
                    {mod.topics.map((topic, j) => (
                      <View key={j} style={styles.topicItem}>
                        <View style={[styles.topicDot, { backgroundColor: mod.color }]} />
                        <ThemedText style={styles.topicText}>{topic}</ThemedText>
                      </View>
                    ))}
                  </View>
                )}
                {mod.locked && (
                  <ThemedText style={styles.lockedHint}>Unlock with a higher membership tier</ThemedText>
                )}
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: tintColor }]}
            onPress={() => router.push("/membership" as any)}
          >
            <ThemedText style={styles.primaryBtnText}>Unlock Full Curriculum</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.secondaryBtn, { borderColor: goldColor }]}
            onPress={() => router.push("/gates" as any)}
          >
            <ThemedText style={[styles.secondaryBtnText, { color: goldColor }]}>Explore the 12 Gates</ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
  },
  statItem: {
    alignItems: "center",
    gap: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#c4b5a0",
  },
  section: {
    padding: 24,
    gap: 12,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#c4b5a0",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  progressLabel: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  modulesList: {
    padding: 16,
    gap: 12,
  },
  moduleCard: {
    borderRadius: 12,
    overflow: "hidden",
    flexDirection: "row",
  },
  moduleStripe: {
    width: 44,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  moduleNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    fontFamily: "monospace",
  },
  moduleContent: {
    flex: 1,
    padding: 14,
    gap: 8,
  },
  moduleHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  moduleTitles: {
    flex: 1,
    gap: 2,
  },
  moduleTitle: {
    fontSize: 15,
    fontWeight: "700",
  },
  moduleSubtitle: {
    fontSize: 12,
    fontStyle: "italic",
  },
  moduleRight: {
    alignItems: "flex-end",
  },
  lockIcon: {
    fontSize: 18,
  },
  durationBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  durationText: {
    fontSize: 11,
    fontWeight: "600",
  },
  topicsList: {
    gap: 4,
  },
  topicItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  topicDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
  },
  topicText: {
    fontSize: 13,
    color: "#c4b5a0",
  },
  lockedHint: {
    fontSize: 12,
    color: "#555",
    fontStyle: "italic",
  },
  ctaSection: {
    padding: 24,
    gap: 12,
  },
  primaryBtn: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  secondaryBtnText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
