/**
 * Founder Screen — The 33rd House
 * Daniel Cruze — The Founder, his journey, and the living teaching.
 */
import { ScrollView, View, StyleSheet, Pressable, Linking, Image } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { CDN } from "@/constants/cdn-assets";

const journey = [
  {
    phase: "The Descent",
    period: "1989–2005",
    content:
      "Born into a family of deep spiritual heritage, Daniel's early life was marked by extraordinary sensitivity and a profound sense of being called to something beyond the ordinary. The first decades were a crucible — a descent into the full weight of human experience.",
  },
  {
    phase: "The Initiation",
    period: "2005–2012",
    content:
      "A period of intensive study, practice, and direct transmission across multiple traditions — Hermetic, Vedic, Kabbalistic, and indigenous. Daniel was initiated into several lineages and underwent the trials that forged his understanding of the initiatic path.",
  },
  {
    phase: "The Synthesis",
    period: "2012–2018",
    content:
      "Seven years of synthesis — drawing together the threads of 5,000 years of wisdom into a single, coherent architecture. The Star Gate Cosmology, the 12 Gates, the 144 Realms — these emerged from this period of deep integration and direct revelation.",
  },
  {
    phase: "The Founding",
    period: "2018–present",
    content:
      "The 33rd House was established as a sacred knowledge institution — a structured school for the transmission of the unified codex. Daniel now teaches from the full depth of his lived experience, guiding initiates through the same path he walked.",
  },
];

const credentials = [
  { icon: "🏛️", label: "Founder", desc: "The 33rd House Pty Ltd" },
  { icon: "📜", label: "Author", desc: "The 33rd House Codex Series" },
  { icon: "🔮", label: "Initiated", desc: "Multiple lineages & traditions" },
  { icon: "🌐", label: "Trustee", desc: "The Cruze Estate Trust" },
];

export default function FounderScreen() {
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="The Founder"
          subtitle="Daniel Cruze — initiate, author, and architect of the Star Gate Cosmology System."
          badge="The Founder"
          geoIndex={9}
        />

        {/* Founder Profile */}
        <View style={[styles.profileSection, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <View style={styles.profileHeader}>
            <View style={[styles.avatarContainer, { borderColor: goldColor }]}>
              <Image
                source={{ uri: CDN.branding.mandalaLogo }}
                style={styles.avatarImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.profileInfo}>
              <ThemedText style={[styles.founderName, { color: goldColor }]}>Daniel Cruze</ThemedText>
              <ThemedText style={[styles.founderTitle, { color: "#a78bfa" }]}>Founder & Architect</ThemedText>
              <ThemedText style={styles.founderOrg}>The 33rd House</ThemedText>
            </View>
          </View>
          <View style={styles.credentialsGrid}>
            {credentials.map((c, i) => (
              <View key={i} style={[styles.credentialCard, { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.2)" }]}>
                <ThemedText style={styles.credentialIcon}>{c.icon}</ThemedText>
                <ThemedText style={[styles.credentialLabel, { color: goldColor }]}>{c.label}</ThemedText>
                <ThemedText style={styles.credentialDesc}>{c.desc}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* The Vision */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The Vision</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          <ThemedText style={styles.bodyText}>
            Daniel Cruze is not a teacher who arrived at wisdom through books. He arrived through fire.
            His path was one of direct experience — of descent, initiation, and return — and it is this
            lived reality that forms the foundation of everything he teaches.
          </ThemedText>
          <ThemedText style={styles.bodyText}>
            His vision for The 33rd House is simple:{" "}
            <ThemedText style={[styles.bodyText, { color: goldColor, fontWeight: "bold" }]}>
              to create the most rigorous, comprehensive, and accessible sacred knowledge institution
              in the world.
            </ThemedText>
            {" "}Not a spiritual entertainment platform. Not a wellness brand. A House — with all that
            the word implies: structure, lineage, discipline, and belonging.
          </ThemedText>
        </View>

        {/* Journey Timeline */}
        <View style={[styles.section, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The Journey</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          {journey.map((stage, i) => (
            <View key={i} style={styles.timelineItem}>
              <View style={styles.timelineLeft}>
                <ThemedText style={[styles.timelinePhase, { color: goldColor }]}>{stage.phase}</ThemedText>
                <ThemedText style={[styles.timelinePeriod, { color: tintColor }]}>{stage.period}</ThemedText>
                <View style={[styles.timelineLine, { backgroundColor: goldColor + "40" }]} />
              </View>
              <ThemedText style={styles.timelineContent}>{stage.content}</ThemedText>
            </View>
          ))}
        </View>

        {/* The Living Teaching */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The Living Teaching</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          <ThemedText style={styles.bodyText}>
            Daniel does not teach theory. He teaches from lived experience. Every principle he shares
            has been tested in the fire of his own transformation. He is not asking you to believe
            anything — he is showing you what is possible when you commit to the alchemical path.
          </ThemedText>
          <ThemedText style={styles.bodyText}>
            The teaching of The 33rd House is grounded in a single principle:{" "}
            <ThemedText style={[styles.bodyText, { color: goldColor, fontWeight: "bold" }]}>
              Containment & Current.
            </ThemedText>
            {" "}The feminine principle of holding space, the masculine principle of directed energy.
            When these two forces are in balance, transformation occurs naturally.
          </ThemedText>
          <View style={[styles.quoteBlock, { borderLeftColor: goldColor }]}>
            <ThemedText style={[styles.quoteText, { color: goldColor }]}>
              "What is hidden shall be kept, what is kept shall be tended, what is tended shall blossom."
            </ThemedText>
            <ThemedText style={styles.quoteSource}>— Sacred Motto of The 33rd House</ThemedText>
          </View>
        </View>

        {/* Authorship */}
        <View style={[styles.section, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <View style={[styles.authorshipCard, { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.2)" }]}>
            <ThemedText style={[styles.authorshipTitle, { color: goldColor }]}>Authorship & Institutional Voice</ThemedText>
            <ThemedText style={styles.authorshipText}>
              All works published under The 33rd House — the codices, the curriculum, the sacred texts,
              the cosmological frameworks — originate from Daniel Cruze's research, synthesis, and direct
              transmission. The intellectual property is held in trust by The Cruze Estate Trust,
              with The 33rd House Pty Ltd as the licensed operating entity.
            </ThemedText>
            <ThemedText style={styles.authorshipText}>
              This is not a platform of anonymous content. Every teaching carries the weight of its
              author's name, experience, and accountability.
            </ThemedText>
          </View>
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: tintColor }]}
            onPress={() => router.push("/membership" as any)}
          >
            <ThemedText style={styles.primaryBtnText}>Begin Your Journey</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.secondaryBtn, { borderColor: goldColor }]}
            onPress={() => Linking.openURL("mailto:daniel@33rdhouse.org")}
          >
            <ThemedText style={[styles.secondaryBtnText, { color: goldColor }]}>Contact the Founder</ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  profileSection: {
    padding: 24,
    gap: 20,
  },
  profileHeader: {
    flexDirection: "row",
    gap: 16,
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    overflow: "hidden",
    backgroundColor: "rgba(74, 20, 140, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 70,
    height: 70,
    opacity: 0.9,
  },
  profileInfo: {
    flex: 1,
    gap: 4,
  },
  founderName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  founderTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  founderOrg: {
    fontSize: 13,
    color: "#c4b5a0",
  },
  credentialsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  credentialCard: {
    width: "47%",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    gap: 4,
  },
  credentialIcon: {
    fontSize: 18,
  },
  credentialLabel: {
    fontSize: 13,
    fontWeight: "700",
  },
  credentialDesc: {
    fontSize: 12,
    color: "#c4b5a0",
  },
  section: {
    padding: 24,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    width: 80,
    height: 1,
    alignSelf: "center",
    opacity: 0.7,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#c4b5a0",
  },
  timelineItem: {
    flexDirection: "row",
    gap: 16,
    alignItems: "flex-start",
  },
  timelineLeft: {
    width: 90,
    gap: 2,
    alignItems: "flex-end",
  },
  timelinePhase: {
    fontSize: 13,
    fontWeight: "700",
    textAlign: "right",
  },
  timelinePeriod: {
    fontSize: 11,
    fontFamily: "monospace",
    textAlign: "right",
  },
  timelineLine: {
    width: 1,
    height: 20,
    alignSelf: "flex-end",
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    fontSize: 14,
    color: "#c4b5a0",
    lineHeight: 22,
  },
  quoteBlock: {
    borderLeftWidth: 3,
    paddingLeft: 16,
    gap: 6,
    marginTop: 4,
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
  authorshipCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  authorshipTitle: {
    fontSize: 16,
    fontWeight: "700",
  },
  authorshipText: {
    fontSize: 14,
    color: "#c4b5a0",
    lineHeight: 22,
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
