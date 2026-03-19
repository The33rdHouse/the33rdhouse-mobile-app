import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolateColor,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

export function AnimatedGradientBackground() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 0.5, 1],
      ["#1a0033", "#2d004d", "#1a0033"] // Deep purple cosmic gradient
    );

    return {
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
      <LinearGradient
        colors={["rgba(74, 20, 140, 0.3)", "rgba(0, 0, 0, 0.8)", "rgba(0, 0, 0, 0.95)"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
    </Animated.View>
  );
}
