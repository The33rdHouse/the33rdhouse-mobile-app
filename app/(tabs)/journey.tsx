import { StyleSheet, ScrollView, View, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { GATES_DATA } from "@/constants/gates-data";
import { useThemeColor } from "@/hooks/use-theme-color";
import { canAccessGate, getUpgradeMessage, getRequiredTierForGate, type MembershipTier } from "@/lib/tier-gating";
import { router } from "expo-router";

interface GateProgress {
  gateId: number;
  status: "not_started" | "in_progress" | "complete";
  completion: number;
}

export default function JourneyScreen() {
  const [gateProgress, setGateProgress] = useState<GateProgress[]>([]);
  const [expandedGate, setExpandedGate] = useState<number | null>(null);
  const [userTier, setUserTier] = useState<MembershipTier>("free");
  
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  useEffect(() => {
    loadProgress();
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

  const loadProgress = async () => {
    try {
      const saved = await AsyncStorage.getItem("gateProgress");
      if (saved) {
        setGateProgress(JSON.parse(saved));
      } else {
        // Initialize with all gates not started
        const initial = GATES_DATA.map((gate) => ({
          gateId: gate.id,
          status: "not_started" as const,
          completion: 0,
        }));
        setGateProgress(initial);
      }
    } catch (error) {
      console.error("Failed to load progress:", error);
    }
  };

  const overallProgress = gateProgress.length > 0
    ? Math.round(
        gateProgress.reduce((sum, g) => sum + g.completion, 0) / gateProgress.length
      )
    : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return goldColor;
      case "in_progress":
        return tintColor;
      default:
        return "#666";
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <ThemedText type="title">Your Journey</ThemedText>
          <ThemedText style={styles.subtitle}>The Path Through 13 Gates</ThemedText>
        </ThemedView>

        <View style={[styles.progressCard, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle">Overall Progress</ThemedText>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { backgroundColor: "#333" }]}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${overallProgress}%`, backgroundColor: goldColor },
                ]}
              />
            </View>
            <ThemedText type="defaultSemiBold" style={styles.progressText}>
              {overallProgress}%
            </ThemedText>
          </View>
        </View>

        <View style={styles.gatesList}>
          {GATES_DATA.map((gate) => {
            const progress = gateProgress.find((g) => g.gateId === gate.id);
            const isExpanded = expandedGate === gate.id;

            return (
              <Pressable
                key={gate.id}
                style={[styles.gateCard, { backgroundColor: canAccessGate(userTier, gate.id) ? cardBg : "rgba(100,100,100,0.3)" }]}
                onPress={() => {
                  if (canAccessGate(userTier, gate.id)) {
                    setExpandedGate(isExpanded ? null : gate.id);
                  } else {
                    const requiredTier = getRequiredTierForGate(gate.id);
                    Alert.alert(
                      "🔒 Locked Gate",
                      getUpgradeMessage(requiredTier),
                      [
                        { text: "Maybe Later", style: "cancel" },
                        { text: "Upgrade Now", onPress: () => router.push("/pricing" as any) },
                      ]
                    );
                  }
                }}
              >
                <View style={styles.gateHeader}>
                  <View
                    style={[
                      styles.gateNumber,
                      { backgroundColor: getStatusColor(progress?.status || "not_started") },
                    ]}
                  >
                    <ThemedText style={styles.gateNumberText}>{gate.id}</ThemedText>
                  </View>
                  <View style={styles.gateInfo}>
                    <ThemedText type="defaultSemiBold">{gate.name}</ThemedText>
                    <ThemedText style={styles.gateZodiac}>{gate.zodiac} • {gate.element}</ThemedText>
                  </View>
                  <ThemedText style={styles.gateCompletion}>
                    {progress?.completion || 0}%
                  </ThemedText>
                </View>

                {isExpanded && (
                  <View style={styles.gateDetails}>
                    <ThemedText style={styles.gateDescription}>{gate.description}</ThemedText>
                    <View style={styles.gateMetadata}>
                      <View style={styles.metadataItem}>
                        <ThemedText style={styles.metadataLabel}>Duration</ThemedText>
                        <ThemedText style={styles.metadataValue}>{gate.duration}</ThemedText>
                      </View>
                      <View style={styles.metadataItem}>
                        <ThemedText style={styles.metadataLabel}>Difficulty</ThemedText>
                        <ThemedText style={styles.metadataValue}>{gate.difficulty}</ThemedText>
                      </View>
                    </View>
                    <ThemedText style={styles.practicesTitle}>Key Practices:</ThemedText>
                    {gate.practices.map((practice, index) => (
                      <ThemedText key={index} style={styles.practice}>
                        • {practice}
                      </ThemedText>
                    ))}
                  </View>
                )}
              </Pressable>
            );
          })}
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
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  progressCard: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  progressBarContainer: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    fontSize: 18,
  },
  gatesList: {
    padding: 20,
    gap: 12,
  },
  gateCard: {
    padding: 16,
    borderRadius: 16,
  },
  gateHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  gateNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  gateNumberText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  gateInfo: {
    flex: 1,
  },
  gateZodiac: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 2,
  },
  gateCompletion: {
    fontSize: 16,
    fontWeight: "600",
  },
  gateDetails: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  gateDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
    opacity: 0.8,
  },
  gateMetadata: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
  },
  metadataItem: {
    flex: 1,
  },
  metadataLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  metadataValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  practicesTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  practice: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.8,
  },
});
