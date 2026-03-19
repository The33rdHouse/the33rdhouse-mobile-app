import { useState } from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeColor } from "@/hooks/use-theme-color";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: 1,
    title: "Welcome to The 33rd House",
    subtitle: "A Complete Consciousness Transformation System",
    description:
      "The 33rd House integrates 5,000 years of ancient wisdom with modern psychology, astrology, and sovereignty frameworks. This is your journey from fragmentation to wholeness.",
    icon: "🐉",
  },
  {
    id: 2,
    title: "The 12 Gates Journey",
    subtitle: "From Awareness to Mastery to Service",
    description:
      "You'll progress through 12 Star Gates, each containing 12 Realms (144 total). Each Gate represents a developmental stage with specific themes, shadows, and gifts to integrate.",
    icon: "🚪",
  },
  {
    id: 3,
    title: "Integrating Light & Shadow",
    subtitle: "Beyond Duality",
    description:
      "You are not choosing between 'devil' and 'Christ.' You are the alchemical vessel where they unite. The Purple Flame: heaven + earth, light + shadow, masculine + feminine.",
    icon: "🔥",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scrollX = useSharedValue(0);
  
  const tintColor = useThemeColor({}, "tint");
  const backgroundColor = useThemeColor({}, "background");

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      scrollX.value = withSpring(nextIndex * width);
    }
  };

  const handleBegin = async () => {
    try {
      await AsyncStorage.setItem("onboarding_completed", "true");
      await AsyncStorage.setItem("journey_start_date", new Date().toISOString());
      router.replace("/(tabs)");
    } catch (error) {
      console.error("Error completing onboarding:", error);
      router.replace("/(tabs)");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("onboarding_completed", "true");
    router.replace("/(tabs)");
  };

  return (
    <ThemedView
      style={[
        styles.container,
        {
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
        },
      ]}
    >
      {/* Skip Button */}
      {currentIndex < SLIDES.length - 1 && (
        <Pressable style={styles.skipButton} onPress={handleSkip}>
          <ThemedText style={styles.skipText}>Skip</ThemedText>
        </Pressable>
      )}

      {/* Slides */}
      <View style={styles.slidesContainer}>
        {SLIDES.map((slide, index) => {
          const animatedStyle = useAnimatedStyle(() => {
            const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
            
            const opacity = interpolate(
              scrollX.value,
              inputRange,
              [0, 1, 0],
              Extrapolate.CLAMP
            );
            
            const scale = interpolate(
              scrollX.value,
              inputRange,
              [0.8, 1, 0.8],
              Extrapolate.CLAMP
            );

            return {
              opacity,
              transform: [{ scale }],
            };
          });

          const isActive = index === currentIndex;

          return (
            <Animated.View
              key={slide.id}
              style={[
                styles.slide,
                animatedStyle,
                {
                  display: isActive ? "flex" : "none",
                },
              ]}
            >
              <ThemedText style={styles.icon}>{slide.icon}</ThemedText>
              <ThemedText type="title" style={styles.title}>
                {slide.title}
              </ThemedText>
              <ThemedText type="subtitle" style={styles.subtitle}>
                {slide.subtitle}
              </ThemedText>
              <ThemedText style={styles.description}>{slide.description}</ThemedText>
            </Animated.View>
          );
        })}
      </View>

      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {SLIDES.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === currentIndex ? tintColor : "#ccc",
                width: index === currentIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>

      {/* Action Button */}
      <Pressable
        style={[styles.button, { backgroundColor: tintColor }]}
        onPress={currentIndex === SLIDES.length - 1 ? handleBegin : handleNext}
      >
        <ThemedText style={styles.buttonText}>
          {currentIndex === SLIDES.length - 1 ? "Begin Journey" : "Next"}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between",
  },
  skipButton: {
    alignSelf: "flex-end",
    padding: 12,
  },
  skipText: {
    fontSize: 16,
    opacity: 0.6,
  },
  slidesContainer: {
    flex: 1,
    justifyContent: "center",
  },
  slide: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 80,
    marginBottom: 32,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 24,
    opacity: 0.8,
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.7,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  button: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
