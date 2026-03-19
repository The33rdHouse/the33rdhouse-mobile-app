import { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from "react-native-reanimated";

interface RotatingDragonProps {
  size?: number;
}

export function RotatingDragon({ size = 60 }: RotatingDragonProps) {
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    // Subtle rotation animation
    rotation.value = withRepeat(
      withTiming(10, { duration: 3000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );

    // Breathing scale animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }, { scale: scale.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={[styles.dragon, { fontSize: size }]}>🐉</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  dragon: {
    textShadowColor: "#FFD700",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
