import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Stack } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

type Mission = {
  id: string;
  title: string;
  description: string;
  category: "practice" | "study" | "community" | "shadow";
  difficulty: "easy" | "medium" | "hard" | "expert";
  xpReward: number;
  coinReward: number;
  completed: boolean;
};

const DAILY_MISSIONS: Omit<Mission, "completed">[] = [
  {
    id: "meditation",
    title: "Morning Meditation",
    description: "Complete a 10-minute meditation practice",
    category: "practice",
    difficulty: "easy",
    xpReward: 50,
    coinReward: 10,
  },
  {
    id: "check-in",
    title: "Daily Check-In",
    description: "Complete your morning or evening check-in",
    category: "practice",
    difficulty: "easy",
    xpReward: 30,
    coinReward: 5,
  },
  {
    id: "realm-study",
    title: "Study a Realm",
    description: "Read and explore one Realm in detail",
    category: "study",
    difficulty: "medium",
    xpReward: 100,
    coinReward: 20,
  },
  {
    id: "ai-chat",
    title: "AI Guidance Session",
    description: "Have a meaningful conversation with the AI Assistant",
    category: "study",
    difficulty: "medium",
    xpReward: 75,
    coinReward: 15,
  },
  {
    id: "genesis-post",
    title: "Share Your Journey",
    description: "Post an insight or question in Genesis",
    category: "community",
    difficulty: "medium",
    xpReward: 80,
    coinReward: 15,
  },
  {
    id: "support-member",
    title: "Support a Fellow Practitioner",
    description: "Comment on or like 3 Genesis posts",
    category: "community",
    difficulty: "easy",
    xpReward: 40,
    coinReward: 8,
  },
  {
    id: "shadow-work",
    title: "Shadow Integration",
    description: "Journal about a shadow aspect you're working with",
    category: "shadow",
    difficulty: "hard",
    xpReward: 150,
    coinReward: 30,
  },
  {
    id: "breathwork",
    title: "Breathwork Practice",
    description: "Complete 5 minutes of conscious breathwork",
    category: "practice",
    difficulty: "easy",
    xpReward: 60,
    coinReward: 12,
  },
  {
    id: "astrology-study",
    title: "Study Your Chart",
    description: "Review your birth chart and current transits",
    category: "study",
    difficulty: "medium",
    xpReward: 90,
    coinReward: 18,
  },
  {
    id: "master-challenge",
    title: "Master Challenge",
    description: "Complete all other missions today",
    category: "practice",
    difficulty: "expert",
    xpReward: 500,
    coinReward: 100,
  },
];

export default function MissionsScreen() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [streak, setStreak] = useState(0);
  const [totalXP, setTotalXP] = useState(0);
  const [totalCoins, setTotalCoins] = useState(0);
  const [loading, setLoading] = useState(true);

  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  useEffect(() => {
    loadMissions();
  }, []);

  const loadMissions = async () => {
    try {
      const today = new Date().toDateString();
      const lastDate = await AsyncStorage.getItem("missions_last_date");
      const storedMissions = await AsyncStorage.getItem("missions_today");
      const storedStreak = await AsyncStorage.getItem("missions_streak");
      const storedXP = await AsyncStorage.getItem("total_xp");
      const storedCoins = await AsyncStorage.getItem("total_coins");

      // Reset missions if new day
      if (lastDate !== today) {
        const freshMissions = DAILY_MISSIONS.map((m) => ({ ...m, completed: false }));
        setMissions(freshMissions);
        await AsyncStorage.setItem("missions_today", JSON.stringify(freshMissions));
        await AsyncStorage.setItem("missions_last_date", today);
      } else if (storedMissions) {
        setMissions(JSON.parse(storedMissions));
      } else {
        const freshMissions = DAILY_MISSIONS.map((m) => ({ ...m, completed: false }));
        setMissions(freshMissions);
      }

      setStreak(storedStreak ? parseInt(storedStreak) : 0);
      setTotalXP(storedXP ? parseInt(storedXP) : 0);
      setTotalCoins(storedCoins ? parseInt(storedCoins) : 0);
    } catch (error) {
      console.error("Failed to load missions:", error);
    } finally {
      setLoading(false);
    }
  };

  const completeMission = async (missionId: string) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission || mission.completed) return;

    const updatedMissions = missions.map((m) =>
      m.id === missionId ? { ...m, completed: true } : m
    );

    const newXP = totalXP + mission.xpReward;
    const newCoins = totalCoins + mission.coinReward;

    setMissions(updatedMissions);
    setTotalXP(newXP);
    setTotalCoins(newCoins);

    await AsyncStorage.setItem("missions_today", JSON.stringify(updatedMissions));
    await AsyncStorage.setItem("total_xp", newXP.toString());
    await AsyncStorage.setItem("total_coins", newCoins.toString());

    // Check if all missions completed
    const allCompleted = updatedMissions.every((m) => m.completed);
    if (allCompleted) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      await AsyncStorage.setItem("missions_streak", newStreak.toString());
      Alert.alert(
        "🔥 All Missions Complete!",
        `Amazing work! Your streak is now ${newStreak} days. You earned ${mission.xpReward} XP and ${mission.coinReward} coins!`
      );
    } else {
      Alert.alert(
        "✅ Mission Complete!",
        `You earned ${mission.xpReward} XP and ${mission.coinReward} coins!`
      );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "#27ae60";
      case "medium":
        return "#f39c12";
      case "hard":
        return "#e74c3c";
      case "expert":
        return "#9b59b6";
      default:
        return "#666";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "practice":
        return "🧘";
      case "study":
        return "📚";
      case "community":
        return "🌍";
      case "shadow":
        return "🌑";
      default:
        return "⭐";
    }
  };

  const completedCount = missions.filter((m) => m.completed).length;
  const progress = missions.length > 0 ? (completedCount / missions.length) * 100 : 0;

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Loading missions...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Daily Missions",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Stats Header */}
          <View style={[styles.statsCard, { backgroundColor: cardBg }]}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>🔥 {streak}</ThemedText>
                <ThemedText style={styles.statLabel}>Day Streak</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>⚡ {totalXP}</ThemedText>
                <ThemedText style={styles.statLabel}>Total XP</ThemedText>
              </View>
              <View style={styles.statItem}>
                <ThemedText style={styles.statValue}>🪙 {totalCoins}</ThemedText>
                <ThemedText style={styles.statLabel}>Coins</ThemedText>
              </View>
            </View>

            <View style={styles.progressContainer}>
              <ThemedText style={styles.progressText}>
                {completedCount}/{missions.length} Missions Complete
              </ThemedText>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progress}%`, backgroundColor: goldColor },
                  ]}
                />
              </View>
            </View>
          </View>

          {/* Missions List */}
          <View style={styles.missionsContainer}>
            {missions.map((mission) => (
              <View
                key={mission.id}
                style={[
                  styles.missionCard,
                  {
                    backgroundColor: cardBg,
                    opacity: mission.completed ? 0.6 : 1,
                  },
                ]}
              >
                <View style={styles.missionHeader}>
                  <ThemedText style={styles.missionIcon}>
                    {getCategoryIcon(mission.category)}
                  </ThemedText>
                  <View style={styles.missionInfo}>
                    <ThemedText type="defaultSemiBold" style={styles.missionTitle}>
                      {mission.title}
                    </ThemedText>
                    <ThemedText style={styles.missionDescription}>
                      {mission.description}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.missionFooter}>
                  <View style={styles.rewardsContainer}>
                    <ThemedText style={styles.rewardText}>⚡ {mission.xpReward} XP</ThemedText>
                    <ThemedText style={styles.rewardText}>🪙 {mission.coinReward}</ThemedText>
                    <View
                      style={[
                        styles.difficultyBadge,
                        { backgroundColor: getDifficultyColor(mission.difficulty) },
                      ]}
                    >
                      <ThemedText style={styles.difficultyText}>
                        {mission.difficulty.toUpperCase()}
                      </ThemedText>
                    </View>
                  </View>

                  <Pressable
                    onPress={() => completeMission(mission.id)}
                    disabled={mission.completed}
                    style={[
                      styles.completeButton,
                      {
                        backgroundColor: mission.completed ? "#27ae60" : tintColor,
                      },
                    ]}
                  >
                    <ThemedText style={styles.completeButtonText}>
                      {mission.completed ? "✓ Done" : "Complete"}
                    </ThemedText>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  statsCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  missionsContainer: {
    gap: 16,
  },
  missionCard: {
    padding: 16,
    borderRadius: 12,
  },
  missionHeader: {
    flexDirection: "row",
    marginBottom: 12,
  },
  missionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  missionInfo: {
    flex: 1,
  },
  missionTitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  missionDescription: {
    fontSize: 13,
    opacity: 0.7,
    lineHeight: 18,
  },
  missionFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rewardsContainer: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  rewardText: {
    fontSize: 13,
    opacity: 0.9,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  completeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#fff",
  },
});
