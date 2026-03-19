import { useEffect } from "react";
import { Pressable, StyleSheet, type PressableProps } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "./themed-text";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PulsingButtonProps extends PressableProps {
  title: string;
  backgroundColor?: string;
  textColor?: string;
  pulse?: boolean;
}

export function PulsingButton({
  title,
  backgroundColor = "#8B5CF6",
  textColor = "#fff",
  pulse = true,
  style,
  ...props
}: PulsingButtonProps) {
  const scale = useSharedValue(1);
  const shadowOpacity = useSharedValue(0.3);

  useEffect(() => {
    if (pulse) {
      scale.value = withRepeat(
        withSequence(
          withTiming(1.02, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1,
        false
      );
      shadowOpacity.value = withRepeat(
        withSequence(
          withTiming(0.6, { duration: 1000 }),
          withTiming(0.3, { duration: 1000 })
        ),
        -1,
        false
      );
    }
  }, [pulse]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    shadowOpacity: shadowOpacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <AnimatedPressable
      style={[
        styles.button,
        { backgroundColor },
        animatedStyle,
        style,
      ]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      <ThemedText style={[styles.text, { color: textColor }]}>{title}</ThemedText>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
