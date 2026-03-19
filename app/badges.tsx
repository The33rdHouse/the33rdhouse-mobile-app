import { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Pressable } from "react-native";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeColor } from "@/hooks/use-theme-color";
import { BADGES_DATA, Badge } from "@/constants/badges-data";
import { sendBadgeUnlockNotification } from "@/lib/notification-manager";

interface BadgeProgress {
  badgeId: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export default function BadgesScreen() {
  const [badgeProgress, setBadgeProgress] = useState<BadgeProgress[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [totalUnlocked, setTotalUnlocked] = useState(0);
  
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    loadBadgeProgress();
  }, []);

  const loadBadgeProgress = async () => {
    try {
      // Load user stats
      const explored = await AsyncStorage.getItem("exploredRealms");
      const gateProgress = await AsyncStorage.getItem("gateProgress");
      const streak = await AsyncStorage.getItem("check_in_streak");
      const startDate = await AsyncStorage.getItem("journeyStartDate");
      const chatHistory = await AsyncStorage.getItem("aiChatHistory");
      const birthData = await AsyncStorage.getItem("birthData");

      const realmsExplored = explored ? JSON.parse(explored).length : 0;
      const gatesCompleted = gateProgress
        ? JSON.parse(gateProgress).filter((g: any) => g.completion === 100).length
        : 0;
      const checkInStreak = streak ? parseInt(streak) : 0;
      const daysActive = startDate
        ? Math.floor((Date.now() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))
        : 0;
      const aiConversations = chatHistory ? JSON.parse(chatHistory).filter((m: any) => m.role === "user").length : 0;
      const hasBirthData = !!birthData;

      // Check each badge
      const progress: BadgeProgress[] = BADGES_DATA.map((badge) => {
        let unlocked = false;

        switch (badge.unlockCondition.type) {
          case "realms_explored":
            unlocked = realmsExplored >= badge.unlockCondition.value;
            break;
          case "gates_completed":
            unlocked = gatesCompleted >= badge.unlockCondition.value;
            break;
          case "check_in_streak":
            unlocked = checkInStreak >= badge.unlockCondition.value;
            break;
          case "days_active":
            unlocked = daysActive >= badge.unlockCondition.value;
            break;
          case "ai_conversations":
            unlocked = aiConversations >= badge.unlockCondition.value;
            break;
          case "special":
            if (badge.id === "special_birth_data") {
              unlocked = hasBirthData;
            }
            break;
        }

        // Send notification for newly unlocked badges
        const previousProgress = badgeProgress.find(p => p.badgeId === badge.id);
        if (unlocked && (!previousProgress || !previousProgress.unlocked)) {
          sendBadgeUnlockNotification(badge.name, badge.rarity);
        }

        return {
          badgeId: badge.id,
          unlocked,
          unlockedAt: unlocked ? new Date().toISOString() : undefined,
        };
      });

      setBadgeProgress(progress);
      setTotalUnlocked(progress.filter((p) => p.unlocked).length);
    } catch (error) {
      console.error("Failed to load badge progress:", error);
    }
  };

  const filteredBadges = BADGES_DATA.filter((badge) => {
    if (filter === "all") return true;
    if (filter === "unlocked") {
      const progress = badgeProgress.find((p) => p.badgeId === badge.id);
      return progress?.unlocked;
    }
    if (filter === "locked") {
      const progress = badgeProgress.find((p) => p.badgeId === badge.id);
      return !progress?.unlocked;
    }
    return badge.category === filter;
  });

  const renderBadge = ({ item }: { item: Badge }) => {
    const progress = badgeProgress.find((p) => p.badgeId === item.id);
    const unlocked = progress?.unlocked || false;

    return (
      <View style={[styles.badgeCard, { backgroundColor: cardBg, opacity: unlocked ? 1 : 0.4 }]}>
        <View
          style={[
            styles.badgeIcon,
            {
              backgroundColor: unlocked ? item.color + "30" : "#666",
              borderColor: unlocked ? item.color : "#888",
            },
          ]}
        >
          <ThemedText style={styles.badgeEmoji}>{unlocked ? item.icon : "🔒"}</ThemedText>
        </View>
        <ThemedText type="defaultSemiBold" style={styles.badgeName}>
          {item.name}
        </ThemedText>
        <ThemedText style={styles.badgeDescription}>{item.description}</ThemedText>
        <View style={[styles.rarityBadge, { backgroundColor: getRarityColor(item.rarity) }]}>
          <ThemedText style={styles.rarityText}>{item.rarity.toUpperCase()}</ThemedText>
        </View>
      </View>
    );
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "#808080";
      case "rare":
        return "#4169E1";
      case "epic":
        return "#9370DB";
      case "legendary":
        return "#FFD700";
      default:
        return "#666";
    }
  };

  const categories = [
    { key: "all", label: "All" },
    { key: "unlocked", label: "Unlocked" },
    { key: "locked", label: "Locked" },
    { key: "realms", label: "Realms" },
    { key: "gates", label: "Gates" },
    { key: "streaks", label: "Streaks" },
    { key: "practices", label: "Practices" },
    { key: "special", label: "Special" },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Badges",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <View style={[styles.header, { backgroundColor: cardBg }]}>
          <ThemedText type="title" style={styles.headerTitle}>
            {totalUnlocked} / {BADGES_DATA.length}
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>Badges Unlocked</ThemedText>
        </View>

        <View style={styles.filterContainer}>
          <FlatList
            horizontal
            data={categories}
            keyExtractor={(item) => item.key}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterList}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => setFilter(item.key)}
                style={[
                  styles.filterChip,
                  {
                    backgroundColor: filter === item.key ? tintColor : cardBg,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.filterText,
                    { color: filter === item.key ? "#fff" : textColor },
                  ]}
                >
                  {item.label}
                </ThemedText>
              </Pressable>
            )}
          />
        </View>

        <FlatList
          data={filteredBadges}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          renderItem={renderBadge}
        />
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
    marginTop: 8,
  },
  filterContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterList: {
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600",
  },
  grid: {
    padding: 12,
  },
  badgeCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    minHeight: 200,
  },
  badgeIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  badgeEmoji: {
    fontSize: 40,
  },
  badgeName: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  badgeDescription: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 12,
  },
  rarityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rarityText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
});
