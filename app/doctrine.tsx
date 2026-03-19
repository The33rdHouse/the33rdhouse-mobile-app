/**
 * Doctrine Screen — The 33rd House
 * The Unified Sacred Codex — symbolic architecture, body-temple, sacred law, cosmology.
 */
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";

const doctrineBlocks = [
  {
    number: "01",
    title: "The Unified Sacred Codex",
    subtitle: "One system. One canon. One source of truth.",
    content:
      "The 33rd House operates from a single, unified sacred codex — a living document that synthesises 5,000 years of spiritual wisdom into a coherent, navigable architecture. The codex is not a collection of beliefs but a map of consciousness: structured, verifiable, and grounded in lived experience.",
  },
  {
    number: "02",
    title: "Symbolic Architecture",
    subtitle: "The language of the sacred.",
    content:
      "Every symbol in the 33rd House system carries precise meaning. The 12 Gates, the 144 Realms, the sacred glyphs, the colour correspondences — these are not decorative. They are a language, a technology for navigating inner and outer reality. Mastery of this symbolic architecture is the foundation of all initiatic work.",
  },
  {
    number: "03",
    title: "The Body-Temple Framework",
    subtitle: "The body is the first sacred space.",
    content:
      "The 33rd House teaches that the body is not a vessel to be transcended but a temple to be inhabited. Consciousness transformation begins in the body — in the nervous system, the breath, the felt sense of being alive. The body-temple framework integrates somatic practice with esoteric teaching.",
  },
  {
    number: "04",
    title: "Sacred Law",
    subtitle: "The invisible architecture of existence.",
    content:
      "Twelve universal laws govern the structure of reality: Hermetic principles, karmic laws, and manifestation principles. These are not metaphors but operational realities — forces that shape experience whether or not the practitioner is aware of them. The doctrine teaches conscious alignment with these laws.",
  },
  {
    number: "05",
    title: "Cosmology",
    subtitle: "The map of the cosmos is the map of the self.",
    content:
      "The cosmological framework of the 33rd House spans 12 Eras of human spiritual history — from the earliest urban civilisations to the present. Each era represents a phase of collective consciousness evolution, mirrored in the individual journey through the 12 Gates.",
  },
  {
    number: "06",
    title: "Glossary of Sacred Terms",
    subtitle: "Precision in language is precision in practice.",
    content:
      "The House maintains a controlled vocabulary — a glossary of sacred terms used consistently across all teachings, texts, and practices. This ensures that the transmission remains coherent and that initiates at every level share a common language.",
  },
];

const cosmologyPillars = [
  { label: "12", sublabel: "Gates", desc: "Archetypal thresholds of transformation" },
  { label: "144", sublabel: "Realms", desc: "Guided meditation chambers" },
  { label: "12", sublabel: "Eras", desc: "Civilisational phases of consciousness" },
  { label: "12", sublabel: "Laws", desc: "Universal principles of existence" },
  { label: "5", sublabel: "Degrees", desc: "Levels of initiatic mastery" },
  { label: "64", sublabel: "Books", desc: "Sacred works in the library" },
];

const sacredLaws = [
  { cat: "Hermetic", laws: ["As Above, So Below", "The Law of Vibration", "The Law of Polarity", "The Law of Rhythm"] },
  { cat: "Karmic", laws: ["The Law of Cause & Effect", "The Law of Correspondence", "The Law of Compensation", "The Law of Relativity"] },
  { cat: "Manifestation", laws: ["The Law of Attraction", "The Law of Inspired Action", "The Law of Perpetual Transmutation", "The Law of Divine Oneness"] },
];

export default function DoctrineScreen() {
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="The Doctrine"
          subtitle="The Unified Sacred Codex — a living architecture of sacred knowledge, symbolic language, and universal law."
          badge="Sacred Doctrine"
          geoIndex={1}
        />

        {/* Cosmology Pillars */}
        <View style={[styles.section, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <View style={styles.pillarsGrid}>
            {cosmologyPillars.map((p, i) => (
              <View key={i} style={[styles.pillarCard, { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.2)" }]}>
                <ThemedText style={[styles.pillarNumber, { color: goldColor }]}>{p.label}</ThemedText>
                <ThemedText style={[styles.pillarLabel, { color: tintColor }]}>{p.sublabel}</ThemedText>
                <ThemedText style={styles.pillarDesc}>{p.desc}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Doctrine Blocks */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The Six Principles</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          {doctrineBlocks.map((block, i) => (
            <View key={i} style={[styles.docBlock, { backgroundColor: cardBg }]}>
              <View style={styles.docBlockHeader}>
                <ThemedText style={[styles.docNumber, { color: tintColor }]}>{block.number}</ThemedText>
                <View style={styles.docTitles}>
                  <ThemedText style={[styles.docTitle, { color: goldColor }]}>{block.title}</ThemedText>
                  <ThemedText style={[styles.docSubtitle, { color: "#a78bfa" }]}>{block.subtitle}</ThemedText>
                </View>
              </View>
              <ThemedText style={styles.docContent}>{block.content}</ThemedText>
            </View>
          ))}
        </View>

        {/* Star Gate Cosmology */}
        <View style={[styles.section, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The Star Gate Cosmology</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          <ThemedText style={styles.bodyText}>
            The Star Gate Cosmology is the primary cosmological framework of the 33rd House.
            It is not a belief system but a{" "}
            <ThemedText style={[styles.bodyText, { color: goldColor, fontWeight: "bold" }]}>map of consciousness</ThemedText>
            {" "}— a comprehensive architecture that charts the complete journey of transformation from the primordial
            void to the ultimate return to source.
          </ThemedText>
          <ThemedText style={styles.bodyText}>
            At its heart are{" "}
            <ThemedText style={[styles.bodyText, { color: goldColor, fontWeight: "bold" }]}>12 Gates</ThemedText>
            {" "}and{" "}
            <ThemedText style={[styles.bodyText, { color: goldColor, fontWeight: "bold" }]}>144 Realms</ThemedText>
            {" "}— archetypal thresholds and specific stages that every consciousness traverses on the path to wholeness.
          </ThemedText>
          <View style={[styles.quoteBlock, { borderLeftColor: goldColor }]}>
            <ThemedText style={[styles.quoteText, { color: goldColor }]}>
              "The map is not the territory — but a good map is worth ten thousand miles of wandering."
            </ThemedText>
            <ThemedText style={styles.quoteSource}>— The 33rd House Codex</ThemedText>
          </View>
        </View>

        {/* The 12 Sacred Laws */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The 12 Sacred Laws</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          {sacredLaws.map((group, i) => (
            <View key={i} style={[styles.lawGroup, { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.2)" }]}>
              <ThemedText style={[styles.lawGroupTitle, { color: tintColor }]}>{group.cat} Laws</ThemedText>
              {group.laws.map((law, j) => (
                <View key={j} style={styles.lawItem}>
                  <ThemedText style={[styles.lawDiamond, { color: goldColor }]}>◆</ThemedText>
                  <ThemedText style={styles.lawText}>{law}</ThemedText>
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: tintColor }]}
            onPress={() => router.push("/gates" as any)}
          >
            <ThemedText style={styles.primaryBtnText}>Explore the 12 Gates</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.secondaryBtn, { borderColor: goldColor }]}
            onPress={() => router.push("/library" as any)}
          >
            <ThemedText style={[styles.secondaryBtnText, { color: goldColor }]}>Enter the Library</ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 24, gap: 16 },
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
  pillarsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "center",
  },
  pillarCard: {
    width: "30%",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    gap: 4,
  },
  pillarNumber: {
    fontSize: 28,
    fontWeight: "bold",
  },
  pillarLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  pillarDesc: {
    fontSize: 10,
    color: "#c4b5a0",
    textAlign: "center",
    lineHeight: 14,
  },
  docBlock: {
    padding: 16,
    borderRadius: 12,
    gap: 10,
  },
  docBlockHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  docNumber: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "monospace",
    minWidth: 32,
  },
  docTitles: {
    flex: 1,
    gap: 2,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  docSubtitle: {
    fontSize: 13,
    fontStyle: "italic",
  },
  docContent: {
    fontSize: 14,
    color: "#c4b5a0",
    lineHeight: 22,
  },
  quoteBlock: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    gap: 8,
    marginTop: 8,
  },
  quoteText: {
    fontSize: 15,
    fontStyle: "italic",
    lineHeight: 24,
  },
  quoteSource: {
    fontSize: 12,
    color: "#c4b5a0",
  },
  lawGroup: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  lawGroupTitle: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
  },
  lawItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  lawDiamond: {
    fontSize: 10,
    marginTop: 4,
  },
  lawText: {
    fontSize: 14,
    color: "#c4b5a0",
    flex: 1,
    lineHeight: 20,
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
