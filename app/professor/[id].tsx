import { StyleSheet, ScrollView, View, Pressable, Image, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { canAccessGate, getUpgradeMessage, getRequiredTierForGate, type MembershipTier } from "@/lib/tier-gating";

interface Professor {
  id: number;
  name: string;
  title: string;
  gate: number;
  gateName: string;
  expertise: string;
  bio: string;
  avatar: string;
  videoCount: number;
  guideCount: number;
  nextSession: string;
}

const PROFESSORS_DATA: Professor[] = [
  {
    id: 1,
    name: "Dr. Aria Solstice",
    title: "Master of Origin",
    gate: 1,
    gateName: "Gate of Origin",
    expertise: "Void Work, Primal Creation, Shadow Integration",
    bio: "Dr. Solstice guides practitioners through the dissolution of false identity and the emergence of authentic self. With 20+ years of experience in depth psychology and mystical traditions, she specializes in helping seekers navigate the terrifying beauty of the Void.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=aria",
    videoCount: 24,
    guideCount: 12,
    nextSession: "Jan 18, 2026 • 7:00 PM PST",
  },
  {
    id: 2,
    name: "Master Chen Wei",
    title: "Guardian of the Heart",
    gate: 2,
    gateName: "Gate of the Veiled Heart",
    expertise: "Emotional Alchemy, Intimacy, Vulnerability",
    bio: "Master Chen brings ancient Taoist heart-opening practices into modern consciousness work. His teachings blend somatic therapy, tantric philosophy, and Chinese medicine to help practitioners reclaim their capacity for deep feeling and authentic connection.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=chen",
    videoCount: 18,
    guideCount: 9,
    nextSession: "Jan 20, 2026 • 6:00 PM PST",
  },
  {
    id: 3,
    name: "Priestess Nyx Shadowborn",
    title: "Keeper of Shadows",
    gate: 3,
    gateName: "Gate of the Shadow",
    expertise: "Shadow Work, Dark Feminine, Underworld Journeys",
    bio: "Priestess Nyx is a modern mystic who walks between worlds. Her work focuses on reclaiming disowned aspects of self through ritual, dreamwork, and confrontation with the personal and collective shadow. She teaches that true power comes from integrating what we fear most.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=nyx",
    videoCount: 32,
    guideCount: 16,
    nextSession: "Jan 22, 2026 • 8:00 PM PST",
  },
  {
    id: 4,
    name: "Sage Orion Lightbringer",
    title: "Master of Illumination",
    gate: 4,
    gateName: "Gate of the Illuminated Mind",
    expertise: "Mental Clarity, Truth Discernment, Wisdom Cultivation",
    bio: "Sage Orion teaches the art of clear seeing beyond illusion. Drawing from Hermetic philosophy, Buddhist logic, and modern cognitive science, he guides practitioners to develop razor-sharp discernment and the capacity to hold paradox without collapsing into dogma.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=orion",
    videoCount: 28,
    guideCount: 14,
    nextSession: "Jan 24, 2026 • 5:00 PM PST",
  },
  {
    id: 5,
    name: "Shaman Kaia Earthsong",
    title: "Voice of the Wild",
    gate: 5,
    gateName: "Gate of the Wild Voice",
    expertise: "Authentic Expression, Sound Healing, Creative Liberation",
    bio: "Shaman Kaia helps practitioners reclaim their primal voice and creative power. Through sound healing, vocal liberation practices, and shamanic journeying, she teaches that your true voice is a portal to sovereignty and a bridge between worlds.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=kaia",
    videoCount: 21,
    guideCount: 11,
    nextSession: "Jan 26, 2026 • 7:30 PM PST",
  },
  {
    id: 6,
    name: "Alchemist Zara Goldweaver",
    title: "Master of Transmutation",
    gate: 6,
    gateName: "Gate of the Alchemist",
    expertise: "Energy Transmutation, Kundalini Activation, Sacred Sexuality",
    bio: "Alchemist Zara specializes in the transformation of base consciousness into gold. Her teachings integrate Kundalini yoga, Taoist sexual alchemy, and Western occult traditions to help practitioners harness and transmute their life force energy for spiritual evolution.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=zara",
    videoCount: 26,
    guideCount: 13,
    nextSession: "Jan 28, 2026 • 6:30 PM PST",
  },
  {
    id: 7,
    name: "Oracle Selene Moonwhisper",
    title: "Seer of Cycles",
    gate: 7,
    gateName: "Gate of the Oracle",
    expertise: "Intuition Development, Divination, Prophetic Dreaming",
    bio: "Oracle Selene teaches the ancient art of seeing beyond the veil. Through astrology, tarot, dreamwork, and trance states, she guides practitioners to develop their innate psychic abilities and trust the wisdom that flows through them from the unseen realms.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=selene",
    videoCount: 30,
    guideCount: 15,
    nextSession: "Jan 30, 2026 • 8:00 PM PST",
  },
  {
    id: 8,
    name: "Warrior Kai Stormblade",
    title: "Master of Will",
    gate: 8,
    gateName: "Gate of the Warrior",
    expertise: "Willpower Cultivation, Discipline, Sacred Combat",
    bio: "Warrior Kai teaches the path of spiritual warriorship. Drawing from martial arts, Stoic philosophy, and indigenous warrior traditions, he helps practitioners develop unshakeable will, fierce discipline, and the courage to face any challenge on the path to sovereignty.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=kai",
    videoCount: 22,
    guideCount: 10,
    nextSession: "Feb 1, 2026 • 5:30 PM PST",
  },
  {
    id: 9,
    name: "Hermit Silas Deeproot",
    title: "Guardian of Solitude",
    gate: 9,
    gateName: "Gate of the Hermit",
    expertise: "Solitude Practices, Inner Silence, Contemplation",
    bio: "Hermit Silas guides practitioners into the profound depths of solitude and silence. His teachings draw from desert fathers, Zen masters, and forest mystics to help seekers find the treasure hidden in aloneness and the wisdom that emerges from deep stillness.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=silas",
    videoCount: 19,
    guideCount: 8,
    nextSession: "Feb 3, 2026 • 6:00 PM PST",
  },
  {
    id: 10,
    name: "Architect Thea Starweaver",
    title: "Builder of Worlds",
    gate: 10,
    gateName: "Gate of the Architect",
    expertise: "Reality Creation, Manifestation, Sacred Geometry",
    bio: "Architect Thea teaches the science and art of conscious creation. Through sacred geometry, quantum principles, and ancient mystery school teachings, she guides practitioners to become master builders of their reality and co-creators with the cosmic intelligence.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=thea",
    videoCount: 25,
    guideCount: 12,
    nextSession: "Feb 5, 2026 • 7:00 PM PST",
  },
  {
    id: 11,
    name: "Sovereign Malik Crownbearer",
    title: "Master of Rulership",
    gate: 11,
    gateName: "Gate of the Sovereign",
    expertise: "Self-Mastery, Leadership, Benevolent Power",
    bio: "Sovereign Malik teaches the path of true rulership - first of self, then of one's domain. His teachings integrate kingship traditions, leadership philosophy, and the responsibilities of power to help practitioners step into their sovereign authority with wisdom and grace.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=malik",
    videoCount: 27,
    guideCount: 14,
    nextSession: "Feb 7, 2026 • 6:30 PM PST",
  },
  {
    id: 12,
    name: "Mystic Eira Voidwalker",
    title: "Master of Dissolution",
    gate: 12,
    gateName: "Gate of the Hanged One",
    expertise: "Ego Death, Surrender, Mystical Union",
    bio: "Mystic Eira guides practitioners through the ultimate surrender - the death of the separate self. Her teachings draw from mystical Christianity, Buddhist emptiness teachings, and psychedelic wisdom to facilitate the profound transformation that comes from complete letting go.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=eira",
    videoCount: 29,
    guideCount: 15,
    nextSession: "Feb 9, 2026 • 8:00 PM PST",
  },
  {
    id: 13,
    name: "Ascended Master Azrael Phoenixborn",
    title: "Master of Rebirth",
    gate: 13,
    gateName: "Gate of Ascension",
    expertise: "Death/Rebirth, Transformation, Cosmic Consciousness",
    bio: "Ascended Master Azrael teaches the final mysteries - death, rebirth, and ascension into cosmic consciousness. His teachings integrate near-death experiences, resurrection symbolism, and the ultimate transformation that occurs when the individual merges with the infinite.",
    avatar: "https://api.dicebear.com/7.x/avataaars/png?seed=azrael",
    videoCount: 33,
    guideCount: 17,
    nextSession: "Feb 11, 2026 • 7:00 PM PST",
  },
];

export default function ProfessorDetailScreen() {
  const { id } = useLocalSearchParams();
  const [userTier, setUserTier] = useState<MembershipTier>("free");
  const [selectedTab, setSelectedTab] = useState<"overview" | "videos" | "guides" | "sessions">("overview");
  
  const professor = PROFESSORS_DATA.find((p) => p.id === parseInt(id as string));
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  useEffect(() => {
    loadUserTier();
  }, []);

  const loadUserTier = async () => {
    try {
      const tier = await AsyncStorage.getItem("membershipTier");
      if (tier) {
        setUserTier(tier as MembershipTier);
      }
    } catch (error) {
      console.error("Failed to load user tier:", error);
    }
  };

  if (!professor) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Professor not found</ThemedText>
      </ThemedView>
    );
  }

  const hasAccess = canAccessGate(userTier, professor.gate);
  const requiredTier = getRequiredTierForGate(professor.gate);

  const handleLockedContent = () => {
    Alert.alert(
      "🔒 Premium Content",
      getUpgradeMessage(requiredTier),
      [
        { text: "Maybe Later", style: "cancel" },
        { text: "Upgrade Now", onPress: () => router.push("/pricing" as any) },
      ]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={[styles.header, { backgroundColor: cardBg }]}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backText}>← Back</ThemedText>
          </Pressable>
          
          <View style={styles.professorHeader}>
            <Image source={{ uri: professor.avatar }} style={styles.avatar} />
            <View style={styles.professorInfo}>
              <ThemedText type="title" style={styles.professorName}>{professor.name}</ThemedText>
              <ThemedText style={[styles.professorTitle, { color: goldColor }]}>{professor.title}</ThemedText>
              <ThemedText style={styles.professorGate}>Gate {professor.gate}: {professor.gateName}</ThemedText>
              <ThemedText style={styles.professorExpertise}>{professor.expertise}</ThemedText>
            </View>
          </View>

          {!hasAccess && (
            <View style={[styles.lockBanner, { backgroundColor: "rgba(255, 215, 0, 0.2)" }]}>
              <ThemedText style={styles.lockBannerText}>
                🔒 Unlock with {requiredTier === "seeker" ? "Seeker" : requiredTier === "sovereign" ? "Sovereign" : "Ascended"} membership
              </ThemedText>
            </View>
          )}
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <Pressable
            style={[styles.tab, selectedTab === "overview" && { borderBottomColor: tintColor }]}
            onPress={() => setSelectedTab("overview")}
          >
            <ThemedText style={[styles.tabText, selectedTab === "overview" && { color: tintColor }]}>
              Overview
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.tab, selectedTab === "videos" && { borderBottomColor: tintColor }]}
            onPress={() => hasAccess ? setSelectedTab("videos") : handleLockedContent()}
          >
            <ThemedText style={[styles.tabText, selectedTab === "videos" && { color: tintColor }]}>
              Videos ({professor.videoCount})
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.tab, selectedTab === "guides" && { borderBottomColor: tintColor }]}
            onPress={() => hasAccess ? setSelectedTab("guides") : handleLockedContent()}
          >
            <ThemedText style={[styles.tabText, selectedTab === "guides" && { color: tintColor }]}>
              Guides ({professor.guideCount})
            </ThemedText>
          </Pressable>
          <Pressable
            style={[styles.tab, selectedTab === "sessions" && { borderBottomColor: tintColor }]}
            onPress={() => hasAccess ? setSelectedTab("sessions") : handleLockedContent()}
          >
            <ThemedText style={[styles.tabText, selectedTab === "sessions" && { color: tintColor }]}>
              Live Q&A
            </ThemedText>
          </Pressable>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {selectedTab === "overview" && (
            <View style={styles.overview}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>About the Professor</ThemedText>
              <ThemedText style={styles.bio}>{professor.bio}</ThemedText>

              <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: cardBg }]}>
                  <ThemedText style={[styles.statValue, { color: goldColor }]}>{professor.videoCount}</ThemedText>
                  <ThemedText style={styles.statLabel}>Video Teachings</ThemedText>
                </View>
                <View style={[styles.statCard, { backgroundColor: cardBg }]}>
                  <ThemedText style={[styles.statValue, { color: goldColor }]}>{professor.guideCount}</ThemedText>
                  <ThemedText style={styles.statLabel}>Downloadable Guides</ThemedText>
                </View>
              </View>

              <View style={[styles.nextSessionCard, { backgroundColor: cardBg }]}>
                <ThemedText type="subtitle" style={styles.nextSessionTitle}>Next Live Q&A</ThemedText>
                <ThemedText style={styles.nextSessionDate}>{professor.nextSession}</ThemedText>
                {hasAccess ? (
                  <Pressable style={[styles.registerButton, { backgroundColor: tintColor }]}>
                    <ThemedText style={styles.registerButtonText}>Register Now</ThemedText>
                  </Pressable>
                ) : (
                  <Pressable style={[styles.registerButton, { backgroundColor: "#666" }]} onPress={handleLockedContent}>
                    <ThemedText style={styles.registerButtonText}>🔒 Upgrade to Register</ThemedText>
                  </Pressable>
                )}
              </View>
            </View>
          )}

          {selectedTab === "videos" && hasAccess && (
            <View style={styles.videosTab}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Video Teachings</ThemedText>
              {[1, 2, 3, 4, 5].map((i) => (
                <View key={i} style={[styles.videoCard, { backgroundColor: cardBg }]}>
                  <View style={styles.videoThumbnail}>
                    <ThemedText style={styles.playIcon}>▶</ThemedText>
                  </View>
                  <View style={styles.videoInfo}>
                    <ThemedText type="defaultSemiBold">Teaching {i}: Core Principles</ThemedText>
                    <ThemedText style={styles.videoDuration}>24:15</ThemedText>
                  </View>
                </View>
              ))}
            </View>
          )}

          {selectedTab === "guides" && hasAccess && (
            <View style={styles.guidesTab}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Downloadable Guides</ThemedText>
              {[1, 2, 3, 4].map((i) => (
                <View key={i} style={[styles.guideCard, { backgroundColor: cardBg }]}>
                  <ThemedText type="defaultSemiBold">📄 Practice Guide {i}</ThemedText>
                  <Pressable style={[styles.downloadButton, { backgroundColor: tintColor }]}>
                    <ThemedText style={styles.downloadButtonText}>Download PDF</ThemedText>
                  </Pressable>
                </View>
              ))}
            </View>
          )}

          {selectedTab === "sessions" && hasAccess && (
            <View style={styles.sessionsTab}>
              <ThemedText type="subtitle" style={styles.sectionTitle}>Upcoming Live Q&A Sessions</ThemedText>
              <View style={[styles.sessionCard, { backgroundColor: cardBg }]}>
                <ThemedText type="defaultSemiBold">{professor.nextSession}</ThemedText>
                <ThemedText style={styles.sessionDescription}>
                  Join {professor.name} for a live Q&A session where you can ask questions and receive personalized guidance.
                </ThemedText>
                <Pressable style={[styles.registerButton, { backgroundColor: tintColor }]}>
                  <ThemedText style={styles.registerButtonText}>Register for Session</ThemedText>
                </Pressable>
              </View>
            </View>
          )}
        </View>
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
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    opacity: 0.8,
  },
  professorHeader: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  professorInfo: {
    flex: 1,
  },
  professorName: {
    fontSize: 24,
    lineHeight: 30,
    marginBottom: 4,
  },
  professorTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  professorGate: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 4,
  },
  professorExpertise: {
    fontSize: 12,
    opacity: 0.6,
  },
  lockBanner: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  lockBannerText: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabText: {
    fontSize: 12,
    fontWeight: "600",
  },
  content: {
    padding: 20,
  },
  overview: {
    gap: 20,
  },
  sectionTitle: {
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
  },
  nextSessionCard: {
    padding: 16,
    borderRadius: 12,
  },
  nextSessionTitle: {
    marginBottom: 8,
  },
  nextSessionDate: {
    fontSize: 14,
    opacity: 0.8,
    marginBottom: 12,
  },
  registerButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  videosTab: {
    gap: 12,
  },
  videoCard: {
    flexDirection: "row",
    padding: 12,
    borderRadius: 12,
    gap: 12,
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    backgroundColor: "#333",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    fontSize: 24,
    color: "#fff",
  },
  videoInfo: {
    flex: 1,
    justifyContent: "center",
  },
  videoDuration: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  guidesTab: {
    gap: 12,
  },
  guideCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  downloadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  downloadButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  sessionsTab: {
    gap: 12,
  },
  sessionCard: {
    padding: 16,
    borderRadius: 12,
  },
  sessionDescription: {
    fontSize: 14,
    lineHeight: 20,
    opacity: 0.8,
    marginTop: 8,
    marginBottom: 12,
  },
});
