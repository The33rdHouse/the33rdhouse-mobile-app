import { useEffect } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface ShimmerEffectProps {
  width: number;
  height: number;
}

export function ShimmerEffect({ width, height }: ShimmerEffectProps) {
  const translateX = useSharedValue(-width);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width, { duration: 2000, easing: Easing.linear }),
      -1,
      false
    );
  }, [width]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        {
          width: width * 2,
          height,
        },
        animatedStyle,
      ]}
    >
      <LinearGradient
        colors={[
          "rgba(255, 215, 0, 0)",
          "rgba(255, 215, 0, 0.3)",
          "rgba(255, 215, 0, 0.6)",
          "rgba(255, 215, 0, 0.3)",
          "rgba(255, 215, 0, 0)",
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1 }}
      />
    </Animated.View>
  );
}
