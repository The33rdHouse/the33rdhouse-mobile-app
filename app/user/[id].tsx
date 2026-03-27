/**
 * User Profile Screen — The 33rd House
 * Displays a public user profile with their posts, stats, and gate progress.
 */
import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/use-auth";
import { GATES_DATA } from "@/constants/gates-data";

// Placeholder user data for offline/demo mode
const DEMO_USERS: Record<
  string,
  {
    name: string;
    tier: string;
    level: number;
    xp: number;
    gate: number;
    joinedDate: string;
    bio: string;
    postsCount: number;
    followersCount: number;
    followingCount: number;
  }
> = {
  "1": {
    name: "Initiate Alpha",
    tier: "seeker",
    level: 7,
    xp: 2450,
    gate: 2,
    joinedDate: "2025-09-15",
    bio: "Walking the path of The Builder. Every day is a new foundation.",
    postsCount: 23,
    followersCount: 45,
    followingCount: 12,
  },
  "2": {
    name: "Sovereign Phoenix",
    tier: "sovereign",
    level: 14,
    xp: 8900,
    gate: 6,
    joinedDate: "2025-06-01",
    bio: "The Healer's path chose me. I am learning to mend what was broken.",
    postsCount: 67,
    followersCount: 189,
    followingCount: 34,
  },
  "3": {
    name: "Elder Obsidian",
    tier: "ascended",
    level: 28,
    xp: 24500,
    gate: 10,
    joinedDate: "2025-01-01",
    bio: "Founding citizen. The Master's gate is not the end — it is the beginning of true service.",
    postsCount: 156,
    followersCount: 512,
    followingCount: 8,
  },
};

const TIER_COLORS: Record<string, string> = {
  free: "#666",
  seeker: "#9b59b6",
  sovereign: "#e74c3c",
  ascended: "#f39c12",
};

const TIER_LABELS: Record<string, string> = {
  free: "Free",
  seeker: "Seeker",
  sovereign: "Sovereign",
  ascended: "Ascended",
};

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const cardBg = useThemeColor({}, "card");
  const goldColor = useThemeColor({}, "gold");
  const tintColor = useThemeColor({}, "tint");

  // In production, this would fetch from the API
  // For now, use demo data or generate a placeholder
  const profileUser = DEMO_USERS[id || "1"] || {
    name: `Initiate ${id}`,
    tier: "free",
    level: 1,
    xp: 0,
    gate: 0,
    joinedDate: "2026-01-01",
    bio: "A new seeker on the path.",
    postsCount: 0,
    followersCount: 0,
    followingCount: 0,
  };

  const currentGate = GATES_DATA[profileUser.gate] || GATES_DATA[0];
  const tierColor = TIER_COLORS[profileUser.tier] || "#666";
  const tierLabel = TIER_LABELS[profileUser.tier] || "Free";
  const isOwnProfile = currentUser && String(currentUser.id) === id;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen options={{ title: "Profile", headerShown: true }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={goldColor} />
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: profileUser.name,
          headerShown: true,
          headerStyle: { backgroundColor: "#0a0412" },
          headerTintColor: goldColor,
        }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={[styles.avatarLarge, { borderColor: tierColor }]}>
            <ThemedText style={styles.avatarLargeText}>
              {profileUser.name.charAt(0).toUpperCase()}
            </ThemedText>
          </View>
          <ThemedText type="title" style={styles.userName}>
            {profileUser.name}
          </ThemedText>
          <View style={[styles.tierBadge, { backgroundColor: tierColor }]}>
            <ThemedText style={styles.tierBadgeText}>{tierLabel}</ThemedText>
          </View>
          <ThemedText style={styles.bio}>{profileUser.bio}</ThemedText>
          <ThemedText style={styles.joinedText}>
            Joined {new Date(profileUser.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </ThemedText>
        </View>

        {/* Stats Row */}
        <View style={[styles.statsRow, { backgroundColor: cardBg }]}>
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: goldColor }]}>
              {profileUser.postsCount}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Posts</ThemedText>
          </View>
          <View style={[styles.statDivider, { backgroundColor: "rgba(147,51,234,0.2)" }]} />
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: goldColor }]}>
              {profileUser.followersCount}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Followers</ThemedText>
          </View>
          <View style={[styles.statDivider, { backgroundColor: "rgba(147,51,234,0.2)" }]} />
          <View style={styles.statItem}>
            <ThemedText style={[styles.statNumber, { color: goldColor }]}>
              {profileUser.followingCount}
            </ThemedText>
            <ThemedText style={styles.statLabel}>Following</ThemedText>
          </View>
        </View>

        {/* Gate Progress */}
        <View style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>
            Current Gate
          </ThemedText>
          <View style={styles.gateCard}>
            <View style={styles.gateInfo}>
              <ThemedText style={[styles.gateNumber, { color: tintColor }]}>
                Gate {currentGate.id}
              </ThemedText>
              <ThemedText style={[styles.gateName, { color: goldColor }]}>
                {currentGate.name}
              </ThemedText>
              <ThemedText style={styles.gateZodiac}>
                {currentGate.zodiac} / {currentGate.element} / {currentGate.planet}
              </ThemedText>
            </View>
          </View>

          {/* Level & XP */}
          <View style={styles.levelRow}>
            <View style={styles.levelInfo}>
              <ThemedText style={styles.levelLabel}>Level</ThemedText>
              <ThemedText style={[styles.levelNumber, { color: goldColor }]}>
                {profileUser.level}
              </ThemedText>
            </View>
            <View style={styles.xpBar}>
              <View style={styles.xpBarBg}>
                <View
                  style={[
                    styles.xpBarFill,
                    {
                      backgroundColor: tintColor,
                      width: `${Math.min((profileUser.xp % 1000) / 10, 100)}%`,
                    },
                  ]}
                />
              </View>
              <ThemedText style={styles.xpText}>
                {profileUser.xp.toLocaleString()} XP
              </ThemedText>
            </View>
          </View>
        </View>

        {/* Gate Progress Bar */}
        <View style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>
            Gate Journey
          </ThemedText>
          <View style={styles.gateProgressRow}>
            {Array.from({ length: 13 }, (_, i) => (
              <View
                key={i}
                style={[
                  styles.gateProgressDot,
                  {
                    backgroundColor:
                      i <= profileUser.gate ? tintColor : "rgba(147,51,234,0.15)",
                    borderColor:
                      i === profileUser.gate ? goldColor : "transparent",
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.gateProgressText,
                    { color: i <= profileUser.gate ? "#fff" : "rgba(255,255,255,0.3)" },
                  ]}
                >
                  {i}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionRow}>
          {isOwnProfile ? (
            <Pressable
              style={[styles.actionBtn, { backgroundColor: tintColor }]}
              onPress={() => router.push("/(tabs)/profile" as any)}
            >
              <ThemedText style={styles.actionBtnText}>Edit Profile</ThemedText>
            </Pressable>
          ) : (
            <>
              <Pressable
                style={[styles.actionBtn, { backgroundColor: tintColor }]}
                onPress={() => {
                  // Follow/unfollow logic to be wired with tRPC
                }}
              >
                <ThemedText style={styles.actionBtnText}>Follow</ThemedText>
              </Pressable>
              <Pressable
                style={[
                  styles.actionBtn,
                  { backgroundColor: "transparent", borderColor: goldColor, borderWidth: 1 },
                ]}
                onPress={() => {
                  // Message logic to be wired with tRPC
                }}
              >
                <ThemedText style={[styles.actionBtnText, { color: goldColor }]}>
                  Message
                </ThemedText>
              </Pressable>
            </>
          )}
        </View>

        {/* Recent Posts Placeholder */}
        <View style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>
            Recent Posts
          </ThemedText>
          {profileUser.postsCount > 0 ? (
            <ThemedText style={styles.placeholderText}>
              {profileUser.postsCount} posts in the Genesis feed. Posts will load from the server when connected.
            </ThemedText>
          ) : (
            <ThemedText style={styles.placeholderText}>
              No posts yet. The journey begins with a single word.
            </ThemedText>
          )}
          <Pressable
            style={[styles.viewPostsBtn, { borderColor: tintColor }]}
            onPress={() => router.push("/(tabs)/genesis" as any)}
          >
            <ThemedText style={[styles.viewPostsBtnText, { color: tintColor }]}>
              View in Genesis Feed
            </ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  profileHeader: {
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: "rgba(10, 4, 18, 0.8)",
  },
  avatarLarge: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "rgba(147, 51, 234, 0.3)",
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarLargeText: {
    fontSize: 36,
    fontWeight: "700",
    color: "#fff",
  },
  userName: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
  },
  tierBadge: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
  },
  tierBadgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  bio: {
    fontSize: 14,
    color: "rgba(255,255,255,0.7)",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  joinedText: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(147,51,234,0.2)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "700",
  },
  statLabel: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: "100%",
  },
  section: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(147,51,234,0.2)",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  gateCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  gateInfo: {
    flex: 1,
  },
  gateNumber: {
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  gateName: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  gateZodiac: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  levelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 12,
  },
  levelInfo: {
    alignItems: "center",
    minWidth: 50,
  },
  levelLabel: {
    fontSize: 10,
    color: "rgba(255,255,255,0.5)",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  levelNumber: {
    fontSize: 28,
    fontWeight: "700",
  },
  xpBar: {
    flex: 1,
  },
  xpBarBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(147,51,234,0.15)",
    overflow: "hidden",
  },
  xpBarFill: {
    height: "100%",
    borderRadius: 4,
  },
  xpText: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    marginTop: 4,
  },
  gateProgressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 4,
  },
  gateProgressDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  gateProgressText: {
    fontSize: 9,
    fontWeight: "700",
  },
  actionRow: {
    flexDirection: "row",
    gap: 12,
    marginHorizontal: 16,
    marginTop: 16,
  },
  actionBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  placeholderText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 20,
    marginBottom: 12,
  },
  viewPostsBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  viewPostsBtnText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
