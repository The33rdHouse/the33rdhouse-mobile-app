/**
 * Eras Screen — The 33rd House
 * 12 Eras of human spiritual history mapped to the 12 Gates.
 */
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";

interface Era {
  id: string;
  number: number;
  title: string;
  period: string;
  subtitle: string;
  overview: string;
  traditions: string[];
  keyFigures: string[];
  themes: string[];
  color: string;
  gateLink?: number;
}

const eras: Era[] = [
  {
    id: "era-01",
    number: 1,
    title: "Early Urban Civilisations",
    period: "c.3500–2000 BCE",
    subtitle: "The Birth of Sacred Order",
    overview:
      "The first great civilisations arose along the rivers of Egypt and Mesopotamia, creating the earliest systems of sacred knowledge, temple worship, and cosmological mapping.",
    traditions: ["Ancient Egypt", "Mesopotamia", "Sumerian", "Akkadian"],
    keyFigures: ["Thoth", "Osiris", "Isis", "Inanna", "Marduk", "Enki"],
    themes: ["Creation myths", "Temple cosmology", "Sacred kingship", "Death & resurrection"],
    color: "#92400E",
    gateLink: 1,
  },
  {
    id: "era-02",
    number: 2,
    title: "Late Bronze Age & Iron Age",
    period: "c.2000–500 BCE",
    subtitle: "The Age of Covenant",
    overview:
      "The emergence of monotheism, covenant theology, and the great mythological cycles of the Near East. The sacred feminine was suppressed and the masculine principle of law and order rose to dominance.",
    traditions: ["Hittite/Anatolian", "Ugaritic/Canaanite", "Israelite"],
    keyFigures: ["El", "Baal/Hadad", "Asherah", "YHWH", "Anat"],
    themes: ["Covenant theology", "Sacred law", "Divine kingship", "Prophetic tradition"],
    color: "#78350F",
    gateLink: 2,
  },
  {
    id: "era-03",
    number: 3,
    title: "Classical Antiquity",
    period: "c.800 BCE–400 CE",
    subtitle: "The Age of Reason & Mystery",
    overview:
      "The flowering of Greek philosophy, mystery schools, and Roman syncretism. The Olympian pantheon, the Hermetic tradition, and the first synthesis of Eastern and Western wisdom traditions.",
    traditions: ["Greek Olympian", "Greek Mystery Schools", "Roman", "Hermetic"],
    keyFigures: ["Zeus", "Athena", "Hermes", "Dionysus", "Hermes Trismegistus"],
    themes: ["Philosophy", "Mystery initiation", "Logos", "Syncretism"],
    color: "#1D4ED8",
    gateLink: 3,
  },
  {
    id: "era-04",
    number: 4,
    title: "Vedic & South Asian",
    period: "c.1500 BCE–500 CE",
    subtitle: "The Age of Sacred Fire",
    overview:
      "The Vedic tradition, the Upanishads, and the great synthesis of Hindu cosmology. The chakra system, kundalini, and the science of consciousness were codified in this era.",
    traditions: ["Vedic", "Early Hindu", "Upanishadic"],
    keyFigures: ["Indra", "Brahma", "Vishnu", "Shiva", "Saraswati", "Kali"],
    themes: ["Dharma", "Karma", "Chakras", "Yoga", "Sacred fire"],
    color: "#065F46",
    gateLink: 4,
  },
  {
    id: "era-05",
    number: 5,
    title: "Norse & Germanic",
    period: "c.200–1200 CE",
    subtitle: "The Age of the World Tree",
    overview:
      "The Norse cosmological system — Yggdrasil, the Nine Worlds, the Aesir and Vanir gods. A tradition of warrior wisdom, runic magic, and the sacred cycle of destruction and renewal.",
    traditions: ["Norse Aesir/Vanir", "Germanic"],
    keyFigures: ["Odin", "Thor", "Freya", "Loki", "Tyr", "Baldur"],
    themes: ["World Tree", "Runes", "Fate & wyrd", "Warrior wisdom", "Ragnarök"],
    color: "#1E3A5F",
    gateLink: 5,
  },
  {
    id: "era-06",
    number: 6,
    title: "Late Antiquity & Medieval",
    period: "c.300–1400 CE",
    subtitle: "The Age of the Veil",
    overview:
      "The rise of the Abrahamic traditions, the suppression of the mystery schools, and the preservation of sacred knowledge in hidden forms — alchemy, Kabbalah, Sufi mysticism, and Celtic tradition.",
    traditions: ["Abrahamic/Angels", "Celtic", "Slavic", "Kabbalistic", "Sufi"],
    keyFigures: ["Gabriel", "Michael", "Raphael", "Metatron"],
    themes: ["Hidden wisdom", "Alchemy", "Kabbalah", "Mysticism", "Sacred geometry"],
    color: "#3B0764",
    gateLink: 6,
  },
  {
    id: "era-07",
    number: 7,
    title: "Pre-Columbian Americas",
    period: "c.1000 BCE–1500 CE",
    subtitle: "The Age of the Feathered Serpent",
    overview:
      "The great civilisations of the Americas — Aztec, Maya, and Inca — with their sophisticated cosmologies, calendar systems, and initiatic traditions centred on the cycles of Venus.",
    traditions: ["Aztec", "Maya", "Inca"],
    keyFigures: ["Quetzalcoatl", "Huitzilopochtli", "Tlaloc", "Pachamama"],
    themes: ["Calendar systems", "Feathered serpent", "Sacred cycles", "Sacrifice & renewal"],
    color: "#7F1D1D",
    gateLink: 7,
  },
  {
    id: "era-08",
    number: 8,
    title: "Modern & Syncretic",
    period: "c.1400 CE–present",
    subtitle: "The Age of the Unveiling",
    overview:
      "The modern era of spiritual synthesis — Theosophy, New Age, Vodou, Santería, and the great unveiling of the mystery school teachings to the wider world.",
    traditions: ["Vodou/Santería", "New Age/Syncretic", "Theosophical", "Hermetic Revival"],
    keyFigures: ["Legba", "Erzulie", "Ogou"],
    themes: ["Synthesis", "Unveiling", "Global consciousness", "Digital transmission"],
    color: "#14532D",
    gateLink: 8,
  },
];

export default function ErasScreen() {
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="The 12 Eras"
          subtitle="Five thousand years of spiritual history — mapped, synthesised, and integrated into the Star Gate Cosmology."
          badge="Sacred History"
          geoIndex={5}
        />

        {/* Intro */}
        <View style={styles.section}>
          <ThemedText style={styles.bodyText}>
            The 33rd House maps the complete arc of human spiritual history across 12 civilisational eras.
            Each era corresponds to one of the 12 Gates — a phase of collective consciousness evolution
            that mirrors the individual initiatic journey.
          </ThemedText>
          <ThemedText style={styles.bodyText}>
            These are not separate traditions but a single, unfolding transmission — the same sacred
            knowledge appearing in different cultural garments across time and geography.
          </ThemedText>
        </View>

        {/* Eras List */}
        <View style={styles.erasList}>
          {eras.map((era) => (
            <View key={era.id} style={[styles.eraCard, { backgroundColor: cardBg }]}>
              {/* Era number stripe */}
              <View style={[styles.eraStripe, { backgroundColor: era.color }]}>
                <ThemedText style={styles.eraNumber}>{era.number.toString().padStart(2, "0")}</ThemedText>
              </View>
              <View style={styles.eraContent}>
                <View style={styles.eraHeader}>
                  <View style={styles.eraTitles}>
                    <ThemedText style={[styles.eraTitle, { color: goldColor }]}>{era.title}</ThemedText>
                    <ThemedText style={[styles.eraPeriod, { color: "#a78bfa" }]}>{era.period}</ThemedText>
                    <ThemedText style={[styles.eraSubtitle, { color: "#c4b5a0" }]}>{era.subtitle}</ThemedText>
                  </View>
                  {era.gateLink && (
                    <View style={[styles.gateLinkBadge, { borderColor: era.color }]}>
                      <ThemedText style={[styles.gateLinkText, { color: era.color }]}>Gate {era.gateLink}</ThemedText>
                    </View>
                  )}
                </View>
                <ThemedText style={styles.eraOverview}>{era.overview}</ThemedText>
                {/* Traditions */}
                <View style={styles.tagsSection}>
                  <ThemedText style={[styles.tagsLabel, { color: goldColor }]}>Traditions</ThemedText>
                  <View style={styles.tagsRow}>
                    {era.traditions.map((t, i) => (
                      <View key={i} style={[styles.tag, { backgroundColor: era.color + "20", borderColor: era.color + "50" }]}>
                        <ThemedText style={[styles.tagText, { color: "#e2d9f3" }]}>{t}</ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
                {/* Themes */}
                <View style={styles.tagsSection}>
                  <ThemedText style={[styles.tagsLabel, { color: goldColor }]}>Themes</ThemedText>
                  <View style={styles.tagsRow}>
                    {era.themes.map((t, i) => (
                      <View key={i} style={[styles.tag, { backgroundColor: "rgba(147,51,234,0.1)", borderColor: "rgba(147,51,234,0.3)" }]}>
                        <ThemedText style={styles.tagText}>{t}</ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
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
            <ThemedText style={[styles.secondaryBtnText, { color: goldColor }]}>Study in the Library</ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: { padding: 24, gap: 12 },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#c4b5a0",
  },
  erasList: {
    padding: 16,
    gap: 16,
  },
  eraCard: {
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
  },
  eraStripe: {
    width: 48,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
  },
  eraNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "monospace",
    writingDirection: "ltr",
  },
  eraContent: {
    flex: 1,
    padding: 16,
    gap: 10,
  },
  eraHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  eraTitles: {
    flex: 1,
    gap: 2,
  },
  eraTitle: {
    fontSize: 16,
    fontWeight: "700",
    lineHeight: 22,
  },
  eraPeriod: {
    fontSize: 12,
    fontFamily: "monospace",
    letterSpacing: 0.5,
  },
  eraSubtitle: {
    fontSize: 13,
    fontStyle: "italic",
  },
  gateLinkBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  gateLinkText: {
    fontSize: 11,
    fontWeight: "600",
  },
  eraOverview: {
    fontSize: 13,
    color: "#c4b5a0",
    lineHeight: 20,
  },
  tagsSection: {
    gap: 6,
  },
  tagsLabel: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  tagText: {
    fontSize: 11,
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
