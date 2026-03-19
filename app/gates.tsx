/**
 * Gates Screen — The 33rd House
 * The 12 Gates of the Star Gate Cosmology System.
 */
import { ScrollView, View, StyleSheet, Pressable, Image } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { GATES_DATA } from "@/constants/gates-data";
import { getGateCover, getGateSigil } from "@/constants/cdn-assets";

const elementColors: Record<string, string> = {
  Fire: "#ef4444",
  Earth: "#92400e",
  Air: "#3b82f6",
  Water: "#0891b2",
  Spirit: "#7c3aed",
  Ether: "#6d28d9",
};

export default function GatesScreen() {
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="The 12 Gates"
          subtitle="Each gate is a fundamental principle of existence — a threshold of consciousness and a stage in the great journey of transformation from Origin to Return."
          badge="The Star Gate Cosmology"
          geoIndex={3}
        />

        {/* Stats Row */}
        <View style={[styles.statsRow, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          {[
            { value: "12", label: "Gates" },
            { value: "144", label: "Realms" },
            { value: "500", label: "Years" },
          ].map((stat, i) => (
            <View key={i} style={styles.statItem}>
              <View style={[styles.statDot, { backgroundColor: goldColor }]} />
              <ThemedText style={[styles.statValue, { color: goldColor }]}>{stat.value}</ThemedText>
              <ThemedText style={styles.statLabel}>{stat.label}</ThemedText>
            </View>
          ))}
        </View>

        {/* Gates List */}
        <View style={styles.gatesList}>
          {GATES_DATA.filter((g) => g.id > 0).map((gate) => {
            const elementColor = elementColors[gate.element] ?? tintColor;
            const coverUrl = getGateCover(gate.id);
            const sigilUrl = getGateSigil(gate.id);

            return (
              <Pressable
                key={gate.id}
                style={[styles.gateCard, { backgroundColor: cardBg }]}
                onPress={() => router.push(`/(tabs)/journey` as any)}
              >
                {/* Cover Image */}
                <View style={styles.coverContainer}>
                  <Image
                    source={{ uri: coverUrl }}
                    style={styles.coverImage}
                    resizeMode="cover"
                  />
                  <View style={styles.coverOverlay} />
                  {/* Gate number badge */}
                  <View style={[styles.gateNumberBadge, { backgroundColor: tintColor }]}>
                    <ThemedText style={styles.gateNumberText}>{gate.id}</ThemedText>
                  </View>
                  {/* Sigil top-right */}
                  <Image
                    source={{ uri: sigilUrl }}
                    style={styles.sigilImage}
                    resizeMode="contain"
                  />
                </View>

                {/* Gate Info */}
                <View style={styles.gateInfo}>
                  <View style={styles.gateNameRow}>
                    <ThemedText style={[styles.gateName, { color: goldColor }]}>{gate.name}</ThemedText>
                    <View style={[styles.elementBadge, { backgroundColor: elementColor + "30", borderColor: elementColor }]}>
                      <ThemedText style={[styles.elementText, { color: elementColor }]}>{gate.element}</ThemedText>
                    </View>
                  </View>
                  <View style={styles.gateMetaRow}>
                    <ThemedText style={styles.gateMeta}>{gate.zodiac}</ThemedText>
                    <ThemedText style={styles.gateMetaDot}>·</ThemedText>
                    <ThemedText style={styles.gateMeta}>{gate.planet}</ThemedText>
                    <ThemedText style={styles.gateMetaDot}>·</ThemedText>
                    <ThemedText style={styles.gateMeta}>{gate.difficulty}</ThemedText>
                  </View>
                  <ThemedText style={styles.gateDesc} numberOfLines={2}>
                    {gate.description}
                  </ThemedText>
                  <View style={styles.gatePracticesRow}>
                    {gate.practices.slice(0, 2).map((p, j) => (
                      <View key={j} style={[styles.practiceTag, { borderColor: "rgba(147,51,234,0.3)" }]}>
                        <ThemedText style={styles.practiceTagText}>{p}</ThemedText>
                      </View>
                    ))}
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* CTA */}
        <View style={styles.ctaSection}>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: tintColor }]}
            onPress={() => router.push("/(tabs)/realms" as any)}
          >
            <ThemedText style={styles.primaryBtnText}>View All 144 Realms</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.secondaryBtn, { borderColor: goldColor }]}
            onPress={() => router.push("/doctrine" as any)}
          >
            <ThemedText style={[styles.secondaryBtnText, { color: goldColor }]}>Read the Doctrine</ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  statItem: {
    alignItems: "center",
    gap: 4,
  },
  statDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    color: "#c4b5a0",
  },
  gatesList: {
    padding: 16,
    gap: 16,
  },
  gateCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  coverContainer: {
    height: 140,
    position: "relative",
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  gateNumberBadge: {
    position: "absolute",
    bottom: 12,
    left: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  gateNumberText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  sigilImage: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 44,
    height: 44,
    opacity: 0.8,
  },
  gateInfo: {
    padding: 16,
    gap: 8,
  },
  gateNameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gateName: {
    fontSize: 18,
    fontWeight: "700",
    flex: 1,
  },
  elementBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
  },
  elementText: {
    fontSize: 11,
    fontWeight: "600",
  },
  gateMetaRow: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  gateMeta: {
    fontSize: 12,
    color: "#a78bfa",
  },
  gateMetaDot: {
    fontSize: 12,
    color: "#666",
  },
  gateDesc: {
    fontSize: 13,
    color: "#c4b5a0",
    lineHeight: 20,
  },
  gatePracticesRow: {
    flexDirection: "row",
    gap: 6,
    flexWrap: "wrap",
  },
  practiceTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  practiceTagText: {
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
