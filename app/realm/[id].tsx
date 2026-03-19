import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { ScrollView, StyleSheet, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { REALMS_DATA } from "@/constants/realms-data";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function RealmDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [isExplored, setIsExplored] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");

  const realmId = parseInt(id || "1");
  const realm = REALMS_DATA.find((r) => r.id === realmId);

  useEffect(() => {
    loadExploredStatus();
  }, [realmId]);

  const loadExploredStatus = async () => {
    try {
      const explored = await AsyncStorage.getItem(`realm_${realmId}_explored`);
      setIsExplored(explored === "true");
    } catch (error) {
      console.error("Error loading explored status:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleExplored = async () => {
    try {
      const newStatus = !isExplored;
      await AsyncStorage.setItem(`realm_${realmId}_explored`, String(newStatus));
      setIsExplored(newStatus);
    } catch (error) {
      console.error("Error saving explored status:", error);
    }
  };

  if (!realm) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText>Realm not found</ThemedText>
      </ThemedView>
    );
  }

  const prevRealm = realmId > 1 ? realmId - 1 : null;
  const nextRealm = realmId < 144 ? realmId + 1 : null;

  return (
    <>
      <Stack.Screen
        options={{
          title: realm.name,
          headerShown: true,
        }}
      />
      <ScrollView
        style={[styles.container, { backgroundColor }]}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 20) + 80,
        }}
      >
        {/* Header */}
        <ThemedView style={styles.header}>
          <ThemedText type="title" style={styles.title}>
            {realm.name}
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Realm {realm.id} • {realm.gate} • {realm.zodiac}
          </ThemedText>
          {isExplored && (
            <View style={[styles.badge, { backgroundColor: tintColor }]}>
              <ThemedText style={styles.badgeText}>✓ Explored</ThemedText>
            </View>
          )}
        </ThemedView>

        {/* Archetype Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            ✨ Archetype (Light)
          </ThemedText>
          <ThemedText style={styles.archetypeText}>{realm.archetype}</ThemedText>
          <ThemedText style={styles.description}>
            The archetype represents the highest expression of this realm - the gift you receive when you fully
            embody its energy. This is the light aspect, the divine potential waiting to be activated.
          </ThemedText>
        </ThemedView>

        {/* Shadow Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🌑 Shadow (Wound)
          </ThemedText>
          <ThemedText style={styles.shadowText}>{realm.shadow}</ThemedText>
          <ThemedText style={styles.description}>
            The shadow represents the wounded or inverted aspect of this realm - the pattern that emerges when
            you're disconnected from your power. Integration requires acknowledging and working with this shadow.
          </ThemedText>
        </ThemedView>

        {/* Correspondences */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🔮 Sacred Correspondences
          </ThemedText>
          <View style={styles.correspondenceGrid}>
            <View style={styles.correspondenceItem}>
              <ThemedText style={styles.correspondenceLabel}>Element</ThemedText>
              <ThemedText style={styles.correspondenceValue}>{realm.element}</ThemedText>
            </View>
            <View style={styles.correspondenceItem}>
              <ThemedText style={styles.correspondenceLabel}>Planet</ThemedText>
              <ThemedText style={styles.correspondenceValue}>{realm.planet}</ThemedText>
            </View>
            <View style={styles.correspondenceItem}>
              <ThemedText style={styles.correspondenceLabel}>Crystal</ThemedText>
              <ThemedText style={styles.correspondenceValue}>
                {realm.element === "Fire"
                  ? "Carnelian"
                  : realm.element === "Water"
                    ? "Moonstone"
                    : realm.element === "Air"
                      ? "Clear Quartz"
                      : "Black Tourmaline"}
              </ThemedText>
            </View>
            <View style={styles.correspondenceItem}>
              <ThemedText style={styles.correspondenceLabel}>Plant</ThemedText>
              <ThemedText style={styles.correspondenceValue}>
                {realm.element === "Fire"
                  ? "Cinnamon"
                  : realm.element === "Water"
                    ? "Jasmine"
                    : realm.element === "Air"
                      ? "Lavender"
                      : "Cedar"}
              </ThemedText>
            </View>
            <View style={styles.correspondenceItem}>
              <ThemedText style={styles.correspondenceLabel}>Incense</ThemedText>
              <ThemedText style={styles.correspondenceValue}>
                {realm.element === "Fire"
                  ? "Dragon's Blood"
                  : realm.element === "Water"
                    ? "Myrrh"
                    : realm.element === "Air"
                      ? "Frankincense"
                      : "Patchouli"}
              </ThemedText>
            </View>
            <View style={styles.correspondenceItem}>
              <ThemedText style={styles.correspondenceLabel}>Mantra</ThemedText>
              <ThemedText style={styles.correspondenceValue}>
                {String(realm.gate).includes("1")
                  ? "LAM"
                  : String(realm.gate).includes("2")
                    ? "VAM"
                    : String(realm.gate).includes("3")
                      ? "RAM"
                      : String(realm.gate).includes("5")
                        ? "YAM"
                        : String(realm.gate).includes("6")
                          ? "HAM"
                          : String(realm.gate).includes("7")
                            ? "OM"
                            : "AUM"}
              </ThemedText>
            </View>
          </View>
        </ThemedView>

        {/* Integration Practice */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🔥 Integration Practice
          </ThemedText>
          <ThemedText style={styles.practiceText}>
            1. **Acknowledge the Shadow**: Sit with the wounded aspect. Where do you feel it in your body? What
            stories does it tell?
          </ThemedText>
          <ThemedText style={styles.practiceText}>
            2. **Invoke the Archetype**: Call in the light aspect. Feel its qualities. Imagine embodying this
            energy fully.
          </ThemedText>
          <ThemedText style={styles.practiceText}>
            3. **The Alchemical Marriage**: Hold both shadow and light simultaneously. They are two sides of the
            same coin. You are the crucible where they unite.
          </ThemedText>
          <ThemedText style={styles.practiceText}>
            4. **Somatic Integration**: Move your body. Dance, shake, breathe. Let the energy move through you.
          </ThemedText>
        </ThemedView>

        {/* Somatic Practice */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            🧘 Somatic Practice
          </ThemedText>
          <ThemedText style={styles.description}>
            {realm.element === "Fire"
              ? "Stand with feet hip-width apart. Breathe into your belly. Feel the fire rising from your root to your crown. Move with power and intention. Let your body express the warrior within."
              : realm.element === "Water"
                ? "Sit or lie down comfortably. Breathe deeply into your sacral center. Feel the waves of emotion flowing through you. Allow tears, laughter, or any expression to move freely."
                : realm.element === "Air"
                  ? "Sit in a comfortable position. Focus on your breath. Inhale clarity, exhale confusion. Feel your mind becoming spacious and clear like the sky."
                  : "Stand barefoot on the earth if possible. Feel your connection to the ground. Breathe into your body. Feel solid, stable, rooted. You are the mountain."}
          </ThemedText>
        </ThemedView>

        {/* Astrological Timing */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            ⭐ Astrological Timing
          </ThemedText>
          <ThemedText style={styles.description}>
            **Best Time to Work with This Realm:**
          </ThemedText>
          <ThemedText style={styles.description}>
            • When the Sun or Moon is in {realm.zodiac}
          </ThemedText>
          <ThemedText style={styles.description}>
            • During {realm.element} element days (consult lunar calendar)
          </ThemedText>
          <ThemedText style={styles.description}>
            • When {realm.planet} is prominent in transits
          </ThemedText>
          <ThemedText style={styles.description}>
            • On days ruled by {realm.element} energy
          </ThemedText>
        </ThemedView>

        {/* Navigation */}
        <View style={styles.navigation}>
          {prevRealm && (
            <Pressable
              style={[styles.navButton, { borderColor: tintColor }]}
              onPress={() => router.push(`/realm/${prevRealm}`)}
            >
              <ThemedText style={[styles.navButtonText, { color: tintColor }]}>
                ← Realm {prevRealm}
              </ThemedText>
            </Pressable>
          )}
          {nextRealm && (
            <Pressable
              style={[styles.navButton, { borderColor: tintColor }]}
              onPress={() => router.push(`/realm/${nextRealm}`)}
            >
              <ThemedText style={[styles.navButtonText, { color: tintColor }]}>
                Realm {nextRealm} →
              </ThemedText>
            </Pressable>
          )}
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View
        style={[
          styles.fixedBottom,
          {
            paddingBottom: Math.max(insets.bottom, 20),
            backgroundColor,
          },
        ]}
      >
        <Pressable
          style={[
            styles.exploreButton,
            {
              backgroundColor: isExplored ? "#666" : tintColor,
            },
          ]}
          onPress={toggleExplored}
          disabled={loading}
        >
          <ThemedText style={styles.exploreButtonText}>
            {isExplored ? "✓ Explored" : "Mark as Explored"}
          </ThemedText>
        </Pressable>
      </View>
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
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: "center",
  },
  badge: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  section: {
    padding: 20,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    marginBottom: 12,
  },
  archetypeText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#7C3AED",
  },
  shadowText: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#DC2626",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    opacity: 0.8,
    marginBottom: 8,
  },
  correspondenceGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  correspondenceItem: {
    width: "48%",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  correspondenceLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  correspondenceValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  practiceText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  navButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: "center",
  },
  navButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  fixedBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.1)",
  },
  exploreButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  exploreButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
