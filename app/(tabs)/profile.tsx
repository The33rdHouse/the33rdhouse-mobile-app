import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/use-auth";

export default function ProfileScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");

  // Mock data - would come from user progress in real app
  const stats = {
    startDate: "January 2025",
    daysActive: 45,
    realmsExplored: 24,
    currentGate: "Gate 1: The Warrior",
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Profile</ThemedText>
        </ThemedView>

        {/* User Info Card */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <View style={[styles.avatar, { backgroundColor: tintColor }]}>
            <ThemedText style={styles.avatarText}>
              {isAuthenticated && user?.name ? user.name[0].toUpperCase() : "?"}
            </ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.userName}>
            {isAuthenticated && user ? user.name || user.email || "Practitioner" : "Guest"}
          </ThemedText>
          {isAuthenticated && user?.email && (
            <ThemedText style={styles.userEmail}>{user.email}</ThemedText>
          )}
        </View>

        {/* Journey Stats */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Journey Stats
          </ThemedText>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>{stats.startDate}</ThemedText>
              <ThemedText style={styles.statLabel}>Start Date</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>{stats.daysActive}</ThemedText>
              <ThemedText style={styles.statLabel}>Days Active</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>{stats.realmsExplored}</ThemedText>
              <ThemedText style={styles.statLabel}>Realms Explored</ThemedText>
            </View>
            <View style={styles.statItem}>
              <ThemedText style={styles.statValue}>{stats.currentGate}</ThemedText>
              <ThemedText style={styles.statLabel}>Current Gate</ThemedText>
            </View>
          </View>
        </View>

        {/* Quick Links */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Quick Links
          </ThemedText>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/professors" as any)}
          >
            <ThemedText style={styles.linkText}>👨‍🏫 Professors</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/affiliate" as any)}
          >
            <ThemedText style={styles.linkText}>💰 Affiliate Program</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/leaderboard" as any)}
          >
            <ThemedText style={styles.linkText}>🏆 Leaderboard</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/pricing" as any)}
          >
            <ThemedText style={styles.linkText}>👑 Upgrade Membership</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/birth-data" as any)}
          >
            <ThemedText style={styles.linkText}>🔮 Birth Data & Astrology</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/badges" as any)}
          >
            <ThemedText style={styles.linkText}>🏆 Badges & Achievements</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/dao" as any)}
          >
            <ThemedText style={styles.linkText}>💰 DAO Dashboard</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/nft-collection" as any)}
          >
            <ThemedText style={styles.linkText}>🖼️ NFT Collection</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/create-video" as any)}
          >
            <ThemedText style={styles.linkText}>🎥 Create Video</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
        </View>

        {/* About the House */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            About the House
          </ThemedText>
          <Pressable style={styles.linkButton} onPress={() => router.push("../about" as any)}>
            <ThemedText style={styles.linkText}>📖 About The 33rd House</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => router.push("../doctrine" as any)}>
            <ThemedText style={styles.linkText}>📜 The Doctrine</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => router.push("../gates" as any)}>
            <ThemedText style={styles.linkText}>⭐ The 12 Gates</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => router.push("../eras" as any)}>
            <ThemedText style={styles.linkText}>🏛️ The 12 Eras</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => router.push("../library" as any)}>
            <ThemedText style={styles.linkText}>📚 Sacred Library</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => router.push("../curriculum" as any)}>
            <ThemedText style={styles.linkText}>🎓 The Curriculum</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => router.push("../founder" as any)}>
            <ThemedText style={styles.linkText}>👑 The Founder</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <Pressable style={styles.linkButton} onPress={() => router.push("../membership" as any)}>
            <ThemedText style={styles.linkText}>✨ Membership Tiers</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
        </View>

        {/* Settings */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            Settings
          </ThemedText>
          <Pressable
            style={styles.linkButton}
            onPress={() => router.push("/notification-settings" as any)}
          >
            <ThemedText style={styles.linkText}>🔔 Notification Settings</ThemedText>
            <ThemedText style={styles.linkArrow}>→</ThemedText>
          </Pressable>
          <View style={styles.settingItem}>
            <ThemedText>Dark Mode</ThemedText>
            <ThemedText style={styles.settingValue}>Auto</ThemedText>
          </View>
          <View style={styles.settingItem}>
            <ThemedText>Language</ThemedText>
            <ThemedText style={styles.settingValue}>English</ThemedText>
          </View>
        </View>

        {/* Auth Actions */}
        {isAuthenticated ? (
          <Pressable
            style={[styles.logoutButton, { backgroundColor: cardBg }]}
            onPress={logout}
          >
            <ThemedText style={[styles.logoutText, { color: "#FF3B30" }]}>
              Logout
            </ThemedText>
          </Pressable>
        ) : (
          <Pressable
            style={[styles.loginButton, { backgroundColor: tintColor }]}
            onPress={() => router.push("/(tabs)/" as any)}
          >
            <ThemedText style={styles.loginText}>Login</ThemedText>
          </Pressable>
        )}

        <View style={{ height: 40 }} />
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
  card: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    textAlign: "center",
    marginBottom: 4,
  },
  userEmail: {
    textAlign: "center",
    opacity: 0.7,
    fontSize: 14,
  },
  cardTitle: {
    marginBottom: 16,
  },
  statsGrid: {
    gap: 16,
  },
  statItem: {
    paddingVertical: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
  linkButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  linkText: {
    fontSize: 16,
  },
  linkArrow: {
    fontSize: 20,
    opacity: 0.5,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  settingValue: {
    opacity: 0.7,
  },
  logoutButton: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
  },
  loginButton: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  loginText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
