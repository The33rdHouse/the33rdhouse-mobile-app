import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, withSpring, Easing } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColor } from "@/hooks/use-theme-color";
import Svg, { Circle } from "react-native-svg";
import { AnimatedGradientBackground } from "@/components/animated-gradient-bg";
import { FloatingParticles } from "@/components/floating-particles";
import { PulsingButton } from "@/components/pulsing-button";
import { RotatingDragon } from "@/components/rotating-dragon";

export default function HomeScreen() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [realmsExplored, setRealmsExplored] = useState(0);
  const [daysOnJourney, setDaysOnJourney] = useState(0);
  const [checkingOnboarding, setCheckingOnboarding] = useState(true);

  // Fade-in animation
  const fadeAnim = useSharedValue(0);
  const scaleAnim = useSharedValue(0.9);

  useEffect(() => {
    fadeAnim.value = withTiming(1, { duration: 800 });
    scaleAnim.value = withSpring(1, { damping: 15 });
  }, []);

  const fadeInStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
    transform: [{ scale: scaleAnim.value }],
  }));
  
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const completed = await AsyncStorage.getItem("onboarding_completed");
      if (!completed) {
        router.replace("/onboarding" as any);
        return;
      }
      await loadDashboardData();
    } catch (error) {
      console.error("Error checking onboarding:", error);
    } finally {
      setCheckingOnboarding(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const gateProgress = await AsyncStorage.getItem("gateProgress");
      if (gateProgress) {
        const gates = JSON.parse(gateProgress);
        const avgProgress = gates.reduce((sum: number, g: any) => sum + g.completion, 0) / gates.length;
        setProgress(Math.round(avgProgress));
      }
      
      const explored = await AsyncStorage.getItem("exploredRealms");
      if (explored) {
        setRealmsExplored(JSON.parse(explored).length);
      }
      
      const startDate = await AsyncStorage.getItem("journeyStartDate");
      if (startDate) {
        const start = new Date(startDate);
        const now = new Date();
        const days = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
        setDaysOnJourney(days);
      } else {
        await AsyncStorage.setItem("journeyStartDate", new Date().toISOString());
        setDaysOnJourney(0);
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  if (checkingOnboarding) {
    return (
      <ThemedView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ThemedText>Loading...</ThemedText>
      </ThemedView>
    );
  }

  const ProgressRing = ({ progress, size = 200 }: { progress: number; size?: number }) => {
    const strokeWidth = 12;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    // Breathing animation
    const scale = useSharedValue(1);
    const opacity = useSharedValue(1);

    useEffect(() => {
      scale.value = withRepeat(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      opacity.value = withRepeat(
        withTiming(0.8, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    }));

    return (
      <Animated.View style={[{ width: size, height: size, justifyContent: "center", alignItems: "center" }, animatedStyle]}>
        <Svg width={size} height={size}>
          <Circle
            stroke="rgba(255, 255, 255, 0.1)"
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke={goldColor}
            fill="none"
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${size / 2}, ${size / 2}`}
          />
        </Svg>
        <View style={{ position: "absolute" }}>
          <ThemedText style={{ fontSize: 48, fontWeight: "bold" }}>{progress}%</ThemedText>
        </View>
      </Animated.View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      <AnimatedGradientBackground />
      <FloatingParticles />
      <ScrollView>
        <ThemedView style={styles.header}>
          <View style={styles.headerContent}>
            <RotatingDragon size={50} />
            <View style={styles.headerText}>
              <ThemedText type="title">Welcome to The 33rd House</ThemedText>
              <ThemedText style={styles.subtitle}>
                {isAuthenticated && user ? `${user.name || "Practitioner"}` : "Begin Your Journey"}
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        <View style={[styles.progressCard, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>Your Progress</ThemedText>
          <View style={styles.progressRingContainer}>
            <ProgressRing progress={progress} size={200} />
          </View>
          <ThemedText style={styles.currentGate}>Current: Gate 1 - The Warrior</ThemedText>
        </View>

        <Animated.View style={[styles.statsRow, fadeInStyle]}>
          <View style={[styles.statCard, { backgroundColor: cardBg }]}>
            <ThemedText style={[styles.statValue, { color: goldColor }]}>{realmsExplored}</ThemedText>
            <ThemedText style={styles.statLabel}>Realms Explored</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: cardBg }]}>
            <ThemedText style={[styles.statValue, { color: goldColor }]}>{daysOnJourney}</ThemedText>
            <ThemedText style={styles.statLabel}>Days on Journey</ThemedText>
          </View>
        </Animated.View>

        <View style={styles.actionsContainer}>
          <PulsingButton
            title="Continue Journey"
            backgroundColor={tintColor}
            onPress={() => router.push("../journey" as any)}
            style={styles.actionButton}
          />
          <PulsingButton
            title="Explore Realms"
            backgroundColor={cardBg}
            pulse={false}
            onPress={() => router.push("../realms" as any)}
            style={styles.actionButton}
          />
          <PulsingButton
            title="View Analytics"
            backgroundColor={cardBg}
            pulse={false}
            onPress={() => router.push("../analytics" as any)}
            style={styles.actionButton}
          />
          <PulsingButton
            title="Daily Check-In"
            backgroundColor={goldColor}
            pulse={true}
            onPress={() => router.push("../check-in" as any)}
            style={styles.actionButton}
          />
          <PulsingButton
            title="⚡ Daily Missions"
            backgroundColor={cardBg}
            pulse={false}
            onPress={() => router.push("../missions" as any)}
            style={styles.actionButton}
          />
        </View>

        {/* Explore the House — navigation to all content screens */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="defaultSemiBold" style={[styles.cardTitle, { color: goldColor }]}>Explore the House</ThemedText>
          <View style={styles.houseLinksGrid}>
            {[
              { icon: "📖", label: "About", route: "../about" },
              { icon: "📜", label: "Doctrine", route: "../doctrine" },
              { icon: "⭐", label: "12 Gates", route: "../gates" },
              { icon: "🌐", label: "Realms", route: "../realms" },
              { icon: "🏛️", label: "12 Eras", route: "../eras" },
              { icon: "📚", label: "Library", route: "../library" },
              { icon: "🎓", label: "Curriculum", route: "../curriculum" },
              { icon: "👑", label: "Founder", route: "../founder" },
              { icon: "✨", label: "Membership", route: "../membership" },
            ].map((item) => (
              <Pressable
                key={item.route}
                style={[styles.houseLinkCard, { borderColor: "rgba(147,51,234,0.3)" }]}
                onPress={() => router.push(item.route as any)}
              >
                <ThemedText style={styles.houseLinkIcon}>{item.icon}</ThemedText>
                <ThemedText style={[styles.houseLinkLabel, { color: goldColor }]}>{item.label}</ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Recent Activity</ThemedText>
          <ThemedText style={styles.activityText}>• Started Gate 1: The Warrior</ThemedText>
          <ThemedText style={styles.activityText}>• Explored Realm 13: The Call to Arms</ThemedText>
          <ThemedText style={styles.activityText}>• Completed meditation practice</ThemedText>
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
  header: {
    padding: 20,
    paddingTop: 60,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  progressCard: {
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  cardTitle: {
    marginBottom: 16,
  },
  progressRingContainer: {
    marginVertical: 20,
  },
  currentGate: {
    fontSize: 16,
    opacity: 0.8,
    marginTop: 16,
  },
  statsRow: {
    flexDirection: "row",
    paddingHorizontal: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 13,
    opacity: 0.7,
  },
  actionsContainer: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  card: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
  },
  activityText: {
    fontSize: 14,
    lineHeight: 24,
    opacity: 0.8,
  },
  houseLinksGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 8,
  },
  houseLinkCard: {
    width: "30%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(147,51,234,0.06)",
  },
  houseLinkIcon: {
    fontSize: 22,
  },
  houseLinkLabel: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
  },
});
