import { useEffect } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

interface ParticleProps {
  delay: number;
  startX: number;
  size: number;
}

function Particle({ delay, startX, size }: ParticleProps) {
  const translateY = useSharedValue(height);
  const opacity = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-100, { duration: 8000 + Math.random() * 4000, easing: Easing.linear }),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(0.6, { duration: 2000 }),
        -1,
        true
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        styles.particle,
        {
          left: startX,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
        animatedStyle,
      ]}
    />
  );
}

export function FloatingParticles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    delay: i * 400,
    startX: Math.random() * width,
    size: 2 + Math.random() * 4,
  }));

  return (
    <>
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          delay={particle.delay}
          startX={particle.startX}
          size={particle.size}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: "absolute",
    backgroundColor: "#FFD700",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
});
