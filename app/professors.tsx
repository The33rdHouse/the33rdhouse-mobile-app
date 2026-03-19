import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GATES_DATA } from "@/constants/gates-data";
import { useThemeColor } from "@/hooks/use-theme-color";

// Mock professor data (would come from database)
const PROFESSORS = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    gateNumber: 0,
    title: "Guardian of the Threshold",
    bio: "20 years guiding souls through the liminal space between worlds. Specialist in shadow integration and threshold consciousness.",
    expertise: ["Shadow Work", "Liminal States", "Initiation Rites"],
    avatarUrl: null,
    requiredTier: "free",
    contentCount: 12,
  },
  {
    id: 2,
    name: "Marcus Aurelius III",
    gateNumber: 1,
    title: "Master of Sovereignty",
    bio: "Former CEO turned consciousness coach. Teaches radical self-ownership and breaking free from external authority.",
    expertise: ["Leadership", "Sovereignty", "Self-Mastery"],
    avatarUrl: null,
    requiredTier: "seeker",
    contentCount: 24,
  },
  {
    id: 3,
    name: "Luna Nightshade",
    gateNumber: 2,
    title: "High Priestess of Intuition",
    bio: "Third-generation psychic medium. Specializes in developing intuitive gifts and navigating the unseen realms.",
    expertise: ["Psychic Development", "Divination", "Moon Magic"],
    avatarUrl: null,
    requiredTier: "seeker",
    contentCount: 18,
  },
  {
    id: 4,
    name: "Prof. David Martinez",
    gateNumber: 3,
    title: "Voice of Truth",
    bio: "Former journalist and communication expert. Teaches authentic expression and speaking your truth with power.",
    expertise: ["Communication", "Public Speaking", "Authentic Expression"],
    avatarUrl: null,
    requiredTier: "seeker",
    contentCount: 15,
  },
  {
    id: 5,
    name: "Mama Aya",
    gateNumber: 4,
    title: "Heart Healer",
    bio: "Indigenous wisdom keeper and heart-centered healer. Guides deep emotional healing and unconditional love practices.",
    expertise: ["Heart Healing", "Emotional Intelligence", "Compassion"],
    avatarUrl: null,
    requiredTier: "sovereign",
    contentCount: 30,
  },
  {
    id: 6,
    name: "Dragon Master Kai",
    gateNumber: 5,
    title: "Awakener of Dragons",
    bio: "Kundalini yoga master and energy worker. Specializes in awakening dormant power and dragon consciousness.",
    expertise: ["Kundalini", "Energy Work", "Power Activation"],
    avatarUrl: null,
    requiredTier: "sovereign",
    contentCount: 28,
  },
  {
    id: 7,
    name: "Dr. Elena Frost",
    gateNumber: 6,
    title: "Alchemist of Mind",
    bio: "Neuroscientist and meditation teacher. Bridges ancient wisdom with modern brain science.",
    expertise: ["Neuroscience", "Meditation", "Mental Clarity"],
    avatarUrl: null,
    requiredTier: "sovereign",
    contentCount: 22,
  },
  {
    id: 8,
    name: "Phoenix Rising",
    gateNumber: 7,
    title: "Guide Through the Void",
    bio: "Shamanic practitioner specializing in death/rebirth cycles. Helps souls navigate the dark night and emerge transformed.",
    expertise: ["Shadow Integration", "Death/Rebirth", "Transformation"],
    avatarUrl: null,
    requiredTier: "ascended",
    contentCount: 35,
  },
  {
    id: 9,
    name: "Master Li Wei",
    gateNumber: 8,
    title: "Keeper of Sacred Power",
    bio: "Qigong master and martial artist. Teaches responsible use of power and energetic sovereignty.",
    expertise: ["Qigong", "Martial Arts", "Power Mastery"],
    avatarUrl: null,
    requiredTier: "ascended",
    contentCount: 26,
  },
  {
    id: 10,
    name: "Sister Magdalene",
    gateNumber: 9,
    title: "Oracle of Wisdom",
    bio: "Former nun turned mystic. Channels divine wisdom and teaches discernment between truth and illusion.",
    expertise: ["Mysticism", "Divine Wisdom", "Discernment"],
    avatarUrl: null,
    requiredTier: "ascended",
    contentCount: 20,
  },
  {
    id: 11,
    name: "Tantra Master Shakti",
    gateNumber: 10,
    title: "Priestess of Sacred Union",
    bio: "Tantric teacher and relationship coach. Guides the alchemical marriage of masculine/feminine within.",
    expertise: ["Tantra", "Sacred Sexuality", "Inner Union"],
    avatarUrl: null,
    requiredTier: "ascended",
    contentCount: 32,
  },
  {
    id: 12,
    name: "King Solomon IV",
    gateNumber: 11,
    title: "Sovereign of Self",
    bio: "Leadership coach and sovereignty expert. Teaches claiming your throne and ruling your inner kingdom.",
    expertise: ["Leadership", "Sovereignty", "Self-Governance"],
    avatarUrl: null,
    requiredTier: "ascended",
    contentCount: 40,
  },
  {
    id: 13,
    name: "Grandmother Willow",
    gateNumber: 12,
    title: "Keeper of the Source",
    bio: "Elder wisdom keeper. Guides the return to Source consciousness and cosmic remembrance.",
    expertise: ["Cosmic Consciousness", "Unity", "Source Connection"],
    avatarUrl: null,
    requiredTier: "ascended",
    contentCount: 45,
  },
];

const TIER_COLORS = {
  free: "#9CA3AF",
  seeker: "#8B5CF6",
  sovereign: "#F59E0B",
  ascended: "#EF4444",
};

const TIER_LABELS = {
  free: "Free",
  seeker: "🔮 Seeker",
  sovereign: "💎 Sovereign",
  ascended: "👑 Ascended",
};

export default function ProfessorsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const cardBg = useThemeColor({}, "background");
  const borderColor = useThemeColor({ light: "#E5E7EB", dark: "#374151" }, "text");

  const [filter, setFilter] = useState<"all" | number>("all");

  const filteredProfessors =
    filter === "all" ? PROFESSORS : PROFESSORS.filter((p) => p.gateNumber === filter);

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <ThemedText type="title">👨‍🏫 Professors</ThemedText>
        <ThemedText style={styles.subtitle}>
          Expert guides for each Gate. Unlock exclusive teachings.
        </ThemedText>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContainer}
      >
        <Pressable
          style={[
            styles.filterChip,
            { borderColor },
            filter === "all" && styles.filterChipActive,
          ]}
          onPress={() => setFilter("all")}
        >
          <ThemedText style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
            All Gates
          </ThemedText>
        </Pressable>
        {GATES_DATA.map((gate) => (
          <Pressable
            key={gate.id}
            style={[
              styles.filterChip,
              { borderColor },
              filter === gate.id && styles.filterChipActive,
            ]}
            onPress={() => setFilter(gate.id)}
          >
            <ThemedText
              style={[styles.filterText, filter === gate.id && styles.filterTextActive]}
            >
              Gate {gate.id}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {filteredProfessors.map((professor) => {
          const gate = GATES_DATA.find((g) => g.id === professor.gateNumber);
          const tierColor = TIER_COLORS[professor.requiredTier as keyof typeof TIER_COLORS];
          const tierLabel = TIER_LABELS[professor.requiredTier as keyof typeof TIER_LABELS];

          return (
            <Pressable
              key={professor.id}
              style={[styles.card, { backgroundColor: cardBg, borderColor }]}
              onPress={() => {
                router.push(`/professor/${professor.id}` as any);
              }}
            >
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <ThemedText style={styles.avatarText}>
                    {professor.name.split(" ").map((n) => n[0]).join("")}
                  </ThemedText>
                </View>
                <View style={styles.cardHeaderText}>
                  <ThemedText type="defaultSemiBold">{professor.name}</ThemedText>
                  <ThemedText style={styles.professorTitle}>{professor.title}</ThemedText>
                  <View style={styles.gateTag}>
                    <ThemedText style={styles.gateTagText}>
                      Gate {professor.gateNumber}: {gate?.name}
                    </ThemedText>
                  </View>
                </View>
              </View>

              <ThemedText style={styles.bio} numberOfLines={3}>
                {professor.bio}
              </ThemedText>

              <View style={styles.expertise}>
                {professor.expertise.map((skill, idx) => (
                  <View key={idx} style={styles.expertiseTag}>
                    <ThemedText style={styles.expertiseText}>{skill}</ThemedText>
                  </View>
                ))}
              </View>

              <View style={styles.cardFooter}>
                <View style={[styles.tierBadge, { backgroundColor: tierColor }]}>
                  <ThemedText style={styles.tierBadgeText}>{tierLabel}</ThemedText>
                </View>
                <ThemedText style={styles.contentCount}>
                  {professor.contentCount} lessons
                </ThemedText>
              </View>
            </Pressable>
          );
        })}
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
    paddingBottom: 12,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
    fontSize: 14,
  },
  filterScroll: {
    maxHeight: 50,
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  filterText: {
    fontSize: 14,
  },
  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#8B5CF6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  cardHeaderText: {
    flex: 1,
  },
  professorTitle: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  gateTag: {
    marginTop: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "rgba(139, 92, 246, 0.1)",
  },
  gateTagText: {
    fontSize: 10,
    color: "#8B5CF6",
  },
  bio: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
    opacity: 0.8,
  },
  expertise: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  expertiseTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(139, 92, 246, 0.15)",
  },
  expertiseText: {
    fontSize: 11,
    color: "#8B5CF6",
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  tierBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  contentCount: {
    fontSize: 12,
    opacity: 0.6,
  },
});
