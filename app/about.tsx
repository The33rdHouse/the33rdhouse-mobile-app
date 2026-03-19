/**
 * About Screen — The 33rd House
 * What is The 33rd House? Mission, vision, foundations.
 */
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";

const foundations = [
  {
    icon: "📖",
    title: "Sacred Knowledge",
    description:
      "A living archive of 5,000 years of spiritual wisdom — synthesised, structured, and made accessible for the modern initiate.",
  },
  {
    icon: "⭐",
    title: "The 12 Gates",
    description:
      "Twelve archetypal thresholds that map the complete journey of consciousness from Origin to Return.",
  },
  {
    icon: "🌐",
    title: "The 144 Realms",
    description:
      "One hundred and forty-four guided meditation realms, each a distinct chamber of inner experience and transformation.",
  },
  {
    icon: "🛡️",
    title: "Sacred Law",
    description:
      "Universal principles drawn from Hermetic, Karmic, and Manifestation traditions — the invisible architecture of existence.",
  },
  {
    icon: "👑",
    title: "Initiation",
    description:
      "A structured path of five degrees, guiding the seeker from first awakening to sovereign mastery over a lifetime of practice.",
  },
  {
    icon: "🔥",
    title: "Living Doctrine",
    description:
      "Not a belief system but a living practice — tested in fire, refined through experience, and grounded in the body.",
  },
];

const meaning33 = [
  { number: "33", label: "Vertebrae in the Human Spine", desc: "The axis of consciousness — the path from root to crown." },
  { number: "33", label: "Degrees in Scottish Rite Masonry", desc: "The highest degree of the ancient initiatic order." },
  { number: "33", label: "Years of Christ's Life", desc: "The sacred number of completion and sacrifice." },
  { number: "33", label: "Sephiroth Paths in Kabbalah", desc: "The paths of wisdom on the Tree of Life." },
];

export default function AboutScreen() {
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="The 33rd House"
          subtitle="A chamber of sacred knowledge, initiation, and order — built to preserve and transmit 5,000 years of spiritual wisdom."
          badge="About the House"
          geoIndex={0}
        />

        {/* What is the 33rd House */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>
            What Is The 33rd House?
          </ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          <ThemedText style={styles.bodyText}>
            The 33rd House is a sacred knowledge institution — a structured archive and living school
            dedicated to the preservation, study, and transmission of esoteric wisdom across traditions,
            eras, and civilisations.
          </ThemedText>
          <ThemedText style={styles.bodyText}>
            It is not a religion. It is not a cult. It is a{" "}
            <ThemedText style={[styles.bodyText, { color: goldColor, fontWeight: "bold" }]}>House</ThemedText>
            {" "}— a place of learning, initiation, and belonging for those who are called to the deeper work.
          </ThemedText>
          <ThemedText style={styles.bodyText}>
            The House was founded on a single conviction: that the great wisdom traditions of humanity
            contain a unified, coherent architecture of consciousness — and that this architecture can be
            mapped, taught, and lived.
          </ThemedText>
        </View>

        {/* The Meaning of 33 */}
        <View style={[styles.section, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>
            The Meaning of 33
          </ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          <View style={styles.cardsGrid}>
            {meaning33.map((item, i) => (
              <View key={i} style={[styles.meaningCard, { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.2)" }]}>
                <ThemedText style={[styles.meaningNumber, { color: goldColor }]}>{item.number}</ThemedText>
                <ThemedText style={[styles.meaningLabel, { color: "#a78bfa" }]}>{item.label}</ThemedText>
                <ThemedText style={styles.meaningDesc}>{item.desc}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* The Six Foundations */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>
            The Six Foundations
          </ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          {foundations.map((f, i) => (
            <View key={i} style={[styles.foundationCard, { backgroundColor: cardBg, borderLeftColor: tintColor }]}>
              <View style={styles.foundationHeader}>
                <ThemedText style={styles.foundationIcon}>{f.icon}</ThemedText>
                <ThemedText style={[styles.foundationTitle, { color: goldColor }]}>{f.title}</ThemedText>
              </View>
              <ThemedText style={styles.foundationDesc}>{f.description}</ThemedText>
            </View>
          ))}
        </View>

        {/* Mission Statement */}
        <View style={[styles.section, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <View style={[styles.quoteBlock, { borderLeftColor: goldColor }]}>
            <ThemedText style={[styles.quoteText, { color: goldColor }]}>
              "What is hidden shall be kept, what is kept shall be tended, what is tended shall blossom."
            </ThemedText>
            <ThemedText style={styles.quoteSource}>— The 33rd House Sacred Motto</ThemedText>
          </View>
        </View>

        {/* CTA Buttons */}
        <View style={styles.ctaSection}>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: tintColor }]}
            onPress={() => router.push("/doctrine" as any)}
          >
            <ThemedText style={styles.primaryBtnText}>Read the Doctrine</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.secondaryBtn, { borderColor: goldColor }]}
            onPress={() => router.push("/founder" as any)}
          >
            <ThemedText style={[styles.secondaryBtnText, { color: goldColor }]}>Meet the Founder</ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    padding: 24,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 34,
  },
  divider: {
    width: 80,
    height: 1,
    alignSelf: "center",
    opacity: 0.7,
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 26,
    color: "#c4b5a0",
  },
  cardsGrid: {
    gap: 12,
  },
  meaningCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 4,
  },
  meaningNumber: {
    fontSize: 32,
    fontWeight: "bold",
  },
  meaningLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  meaningDesc: {
    fontSize: 13,
    color: "#c4b5a0",
    lineHeight: 20,
  },
  foundationCard: {
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    gap: 8,
  },
  foundationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  foundationIcon: {
    fontSize: 20,
  },
  foundationTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  foundationDesc: {
    fontSize: 14,
    color: "#c4b5a0",
    lineHeight: 22,
  },
  quoteBlock: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    gap: 8,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: "italic",
    lineHeight: 26,
  },
  quoteSource: {
    fontSize: 13,
    color: "#c4b5a0",
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
