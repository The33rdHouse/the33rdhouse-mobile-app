import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/use-auth";

type LeaderboardEntry = {
  rank: number;
  userId: string;
  name: string;
  avatar: string;
  xp: number;
  level: number;
  realmsExplored: number;
  gatesCompleted: number;
  membershipTier: "free" | "seeker" | "sovereign" | "ascended";
};

// Mock leaderboard data - would come from backend in real app
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  {
    rank: 1,
    userId: "user1",
    name: "Dragon Master",
    avatar: "🐉",
    xp: 15000,
    level: 42,
    realmsExplored: 144,
    gatesCompleted: 12,
    membershipTier: "ascended",
  },
  {
    rank: 2,
    userId: "user2",
    name: "Shadow Walker",
    avatar: "🌑",
    xp: 12500,
    level: 38,
    realmsExplored: 120,
    gatesCompleted: 10,
    membershipTier: "sovereign",
  },
  {
    rank: 3,
    userId: "user3",
    name: "Light Bringer",
    avatar: "✨",
    xp: 11000,
    level: 35,
    realmsExplored: 108,
    gatesCompleted: 9,
    membershipTier: "sovereign",
  },
  {
    rank: 4,
    userId: "user4",
    name: "Serpent Sage",
    avatar: "🐍",
    xp: 9500,
    level: 31,
    realmsExplored: 96,
    gatesCompleted: 8,
    membershipTier: "seeker",
  },
  {
    rank: 5,
    userId: "user5",
    name: "Phoenix Rising",
    avatar: "🔥",
    xp: 8200,
    level: 28,
    realmsExplored: 84,
    gatesCompleted: 7,
    membershipTier: "seeker",
  },
  {
    rank: 6,
    userId: "user6",
    name: "Moon Dancer",
    avatar: "🌙",
    xp: 7100,
    level: 25,
    realmsExplored: 72,
    gatesCompleted: 6,
    membershipTier: "seeker",
  },
  {
    rank: 7,
    userId: "user7",
    name: "Star Seeker",
    avatar: "⭐",
    xp: 6300,
    level: 23,
    realmsExplored: 60,
    gatesCompleted: 5,
    membershipTier: "free",
  },
  {
    rank: 8,
    userId: "user8",
    name: "Earth Keeper",
    avatar: "🌍",
    xp: 5500,
    level: 20,
    realmsExplored: 48,
    gatesCompleted: 4,
    membershipTier: "free",
  },
  {
    rank: 9,
    userId: "user9",
    name: "Wind Whisperer",
    avatar: "💨",
    xp: 4800,
    level: 18,
    realmsExplored: 36,
    gatesCompleted: 3,
    membershipTier: "free",
  },
  {
    rank: 10,
    userId: "user10",
    name: "Water Bearer",
    avatar: "💧",
    xp: 4200,
    level: 16,
    realmsExplored: 24,
    gatesCompleted: 2,
    membershipTier: "free",
  },
];

export default function LeaderboardScreen() {
  const { user } = useAuth();
  const [timeFilter, setTimeFilter] = useState<"weekly" | "monthly" | "all-time">("all-time");
  const [categoryFilter, setCategoryFilter] = useState<"xp" | "realms" | "gates">("xp");

  const cardBg = useThemeColor({}, "card");
  const goldColor = useThemeColor({}, "gold");
  const tintColor = useThemeColor({}, "tint");

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "ascended":
        return "#f39c12";
      case "sovereign":
        return "#e74c3c";
      case "seeker":
        return "#9b59b6";
      default:
        return "#666";
    }
  };

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case "ascended":
        return "👑";
      case "sovereign":
        return "💎";
      case "seeker":
        return "🔮";
      default:
        return "";
    }
  };

  const getRankMedal = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  };

  // Mock current user stats
  const currentUserRank = 47;
  const currentUserXP = 2100;
  const currentUserPercentile = 68;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Leaderboard",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Your Rank Card */}
          <View style={[styles.yourRankCard, { backgroundColor: tintColor }]}>
            <View style={styles.yourRankHeader}>
              <ThemedText type="subtitle" style={{ color: "#fff" }}>
                Your Rank
              </ThemedText>
              <ThemedText style={[styles.percentile, { color: "#fff" }]}>
                Top {currentUserPercentile}%
              </ThemedText>
            </View>
            <View style={styles.yourRankStats}>
              <View style={styles.yourRankItem}>
                <ThemedText style={[styles.yourRankValue, { color: "#fff" }]}>
                  #{currentUserRank}
                </ThemedText>
                <ThemedText style={[styles.yourRankLabel, { color: "#fff", opacity: 0.9 }]}>
                  Global Rank
                </ThemedText>
              </View>
              <View style={styles.yourRankItem}>
                <ThemedText style={[styles.yourRankValue, { color: "#fff" }]}>
                  {currentUserXP}
                </ThemedText>
                <ThemedText style={[styles.yourRankLabel, { color: "#fff", opacity: 0.9 }]}>
                  Total XP
                </ThemedText>
              </View>
            </View>
          </View>

          {/* Time Filter */}
          <View style={styles.filterRow}>
            <Pressable
              onPress={() => setTimeFilter("weekly")}
              style={[
                styles.filterChip,
                {
                  backgroundColor: timeFilter === "weekly" ? goldColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  timeFilter === "weekly" && { color: "#000", fontWeight: "700" },
                ]}
              >
                Weekly
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => setTimeFilter("monthly")}
              style={[
                styles.filterChip,
                {
                  backgroundColor: timeFilter === "monthly" ? goldColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  timeFilter === "monthly" && { color: "#000", fontWeight: "700" },
                ]}
              >
                Monthly
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => setTimeFilter("all-time")}
              style={[
                styles.filterChip,
                {
                  backgroundColor: timeFilter === "all-time" ? goldColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  timeFilter === "all-time" && { color: "#000", fontWeight: "700" },
                ]}
              >
                All-Time
              </ThemedText>
            </Pressable>
          </View>

          {/* Category Filter */}
          <View style={styles.filterRow}>
            <Pressable
              onPress={() => setCategoryFilter("xp")}
              style={[
                styles.filterChip,
                {
                  backgroundColor: categoryFilter === "xp" ? tintColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  categoryFilter === "xp" && { fontWeight: "700" },
                ]}
              >
                ⚡ XP
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => setCategoryFilter("realms")}
              style={[
                styles.filterChip,
                {
                  backgroundColor: categoryFilter === "realms" ? tintColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  categoryFilter === "realms" && { fontWeight: "700" },
                ]}
              >
                🌟 Realms
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => setCategoryFilter("gates")}
              style={[
                styles.filterChip,
                {
                  backgroundColor: categoryFilter === "gates" ? tintColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  categoryFilter === "gates" && { fontWeight: "700" },
                ]}
              >
                🚪 Gates
              </ThemedText>
            </Pressable>
          </View>

          {/* Leaderboard List */}
          <View style={styles.leaderboardList}>
            {MOCK_LEADERBOARD.map((entry) => (
              <View
                key={entry.userId}
                style={[
                  styles.leaderboardItem,
                  {
                    backgroundColor: cardBg,
                    borderLeftWidth: 4,
                    borderLeftColor: getTierColor(entry.membershipTier),
                  },
                ]}
              >
                <View style={styles.rankContainer}>
                  <ThemedText style={styles.rankText}>{getRankMedal(entry.rank)}</ThemedText>
                </View>

                <View style={styles.avatarContainer}>
                  <ThemedText style={styles.avatar}>{entry.avatar}</ThemedText>
                </View>

                <View style={styles.userInfo}>
                  <View style={styles.nameRow}>
                    <ThemedText type="defaultSemiBold" style={styles.userName}>
                      {entry.name}
                    </ThemedText>
                    {entry.membershipTier !== "free" && (
                      <ThemedText style={styles.tierBadge}>
                        {getTierBadge(entry.membershipTier)}
                      </ThemedText>
                    )}
                  </View>
                  <ThemedText style={styles.userLevel}>Level {entry.level}</ThemedText>
                </View>

                <View style={styles.statsContainer}>
                  {categoryFilter === "xp" && (
                    <ThemedText style={[styles.statValue, { color: goldColor }]}>
                      {entry.xp.toLocaleString()} XP
                    </ThemedText>
                  )}
                  {categoryFilter === "realms" && (
                    <ThemedText style={[styles.statValue, { color: goldColor }]}>
                      {entry.realmsExplored} Realms
                    </ThemedText>
                  )}
                  {categoryFilter === "gates" && (
                    <ThemedText style={[styles.statValue, { color: goldColor }]}>
                      {entry.gatesCompleted} Gates
                    </ThemedText>
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Motivational Message */}
          <View style={[styles.motivationCard, { backgroundColor: cardBg }]}>
            <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
              🔥 Keep Climbing!
            </ThemedText>
            <ThemedText style={{ opacity: 0.8, textAlign: "center" }}>
              You're only {MOCK_LEADERBOARD[MOCK_LEADERBOARD.length - 1].xp - currentUserXP} XP away from the top 10!
              Complete daily missions to level up faster.
            </ThemedText>
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
  yourRankCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 24,
  },
  yourRankHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  percentile: {
    fontSize: 14,
    opacity: 0.9,
  },
  yourRankStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  yourRankItem: {
    alignItems: "center",
  },
  yourRankValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 4,
  },
  yourRankLabel: {
    fontSize: 13,
  },
  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: "center",
  },
  filterText: {
    fontSize: 13,
  },
  leaderboardList: {
    gap: 12,
    marginBottom: 24,
  },
  leaderboardItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
  },
  rankContainer: {
    width: 40,
    alignItems: "center",
  },
  rankText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  avatarContainer: {
    marginRight: 12,
  },
  avatar: {
    fontSize: 32,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
  },
  tierBadge: {
    fontSize: 14,
  },
  userLevel: {
    fontSize: 12,
    opacity: 0.7,
  },
  statsContainer: {
    alignItems: "flex-end",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "700",
  },
  motivationCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
});
