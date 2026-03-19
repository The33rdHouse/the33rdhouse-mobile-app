import { StyleSheet, View, TextInput, Pressable, FlatList, Alert } from "react-native";
import { useState, useEffect } from "react";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { REALMS_DATA } from "@/constants/realms-data";
import { useThemeColor } from "@/hooks/use-theme-color";
import { canAccessRealm, getUpgradeMessage, getRequiredTierForRealm, type MembershipTier } from "@/lib/tier-gating";
import { ShimmerEffect } from "@/components/shimmer-effect";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function RealmCard({ item, cardBg, tintColor, userTier, onPress }: any) {
  const scale = useSharedValue(1);
  const hasAccess = canAccessRealm(userTier, item.id);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[styles.card, { backgroundColor: hasAccess ? cardBg : "rgba(100,100,100,0.3)" }, animatedStyle]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {!hasAccess && (
        <>
          <View style={styles.lockBadge}>
            <ThemedText style={styles.lockIcon}>🔒</ThemedText>
          </View>
          <ShimmerEffect width={150} height={200} />
        </>
      )}
      <View style={[styles.realmNumber, { backgroundColor: tintColor, opacity: hasAccess ? 1 : 0.5 }]}>
        <ThemedText style={styles.realmNumberText}>{item.id}</ThemedText>
      </View>
      <ThemedText type="defaultSemiBold" style={styles.realmName}>
        {item.name}
      </ThemedText>
      <ThemedText style={styles.gateName}>{item.gateName}</ThemedText>
      <View style={styles.tags}>
        <View style={styles.tag}>
          <ThemedText style={styles.tagText}>{item.zodiac}</ThemedText>
        </View>
        <View style={styles.tag}>
          <ThemedText style={styles.tagText}>{item.element}</ThemedText>
        </View>
      </View>
    </AnimatedPressable>
  );
}

export default function RealmsScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterElement, setFilterElement] = useState<string | null>(null);
  const [userTier, setUserTier] = useState<MembershipTier>("free");

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
  
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");

  const filteredRealms = REALMS_DATA.filter((realm) => {
    const matchesSearch = realm.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesElement = !filterElement || realm.element === filterElement;
    return matchesSearch && matchesElement;
  });

  const elements = ["Fire", "Water", "Air", "Earth"];

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Explore Realms</ThemedText>
        <ThemedText style={styles.subtitle}>144 Realms of Consciousness</ThemedText>
      </ThemedView>

      <View style={[styles.searchContainer, { backgroundColor: cardBg }]}>
        <TextInput
          style={[styles.searchInput, { color: textColor }]}
          placeholder="Search realms..."
          placeholderTextColor={textColor + "80"}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filterContainer}>
        <Pressable
          onPress={() => setFilterElement(null)}
          style={[
            styles.filterChip,
            { backgroundColor: !filterElement ? tintColor : cardBg },
          ]}
        >
          <ThemedText
            style={[
              styles.filterText,
              { color: !filterElement ? "#fff" : textColor },
            ]}
          >
            All
          </ThemedText>
        </Pressable>
        {elements.map((element) => (
          <Pressable
            key={element}
            onPress={() => setFilterElement(element)}
            style={[
              styles.filterChip,
              { backgroundColor: filterElement === element ? tintColor : cardBg },
            ]}
          >
            <ThemedText
              style={[
                styles.filterText,
                { color: filterElement === element ? "#fff" : textColor },
              ]}
            >
              {element}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredRealms}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <RealmCard
            item={item}
            cardBg={cardBg}
            tintColor={tintColor}
            userTier={userTier}
            onPress={() => {
              if (canAccessRealm(userTier, item.id)) {
                router.push(`/realm/${item.id}` as any);
              } else {
                const requiredTier = getRequiredTierForRealm(item.id);
                Alert.alert(
                  "🔒 Locked Realm",
                  getUpgradeMessage(requiredTier),
                  [
                    { text: "Maybe Later", style: "cancel" },
                    { text: "Upgrade Now", onPress: () => router.push("/pricing" as any) },
                  ]
                );
              }
            }}
          />
        )}
      />
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
  searchContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
  },
  searchInput: {
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
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
  card: {
    flex: 1,
    margin: 8,
    padding: 16,
    borderRadius: 16,
    minHeight: 160,
  },
  realmNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  realmNumberText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  realmName: {
    fontSize: 16,
    marginBottom: 4,
  },
  gateName: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    gap: 4,
    flexWrap: "wrap",
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(255, 215, 0, 0.2)",
  },
  tagText: {
    fontSize: 10,
    fontWeight: "600",
  },
  lockBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  lockIcon: {
    fontSize: 20,
  },
});
