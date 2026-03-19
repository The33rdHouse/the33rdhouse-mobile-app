/**
 * ScreenHeader — Shared page header component with sacred geometry CDN artwork.
 * Mirrors the web app's PageHeader component for visual consistency.
 */
import { View, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ThemedText } from "@/components/themed-text";
import { getSacredGeoByIndex } from "@/constants/cdn-assets";

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  geoIndex?: number;
}

export function ScreenHeader({ title, subtitle, badge, geoIndex = 0 }: ScreenHeaderProps) {
  const geoImage = getSacredGeoByIndex(geoIndex);

  return (
    <View style={styles.container}>
      {/* Cosmic gradient background */}
      <LinearGradient
        colors={["#0a0412", "#1a0a2e", "#000000"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      {/* Radial purple glow */}
      <View style={styles.radialGlow} />
      {/* Sacred geometry watermark — right side */}
      <Image
        source={{ uri: geoImage }}
        style={styles.geoImage}
        resizeMode="contain"
      />
      {/* Gold top border line */}
      <View style={styles.topBorder} />
      {/* Content */}
      <View style={styles.content}>
        {badge && (
          <View style={styles.badgeContainer}>
            <ThemedText style={styles.badgeText}>{badge}</ThemedText>
          </View>
        )}
        <ThemedText style={styles.title}>{title}</ThemedText>
        {/* Gold divider */}
        <View style={styles.divider} />
        {subtitle && (
          <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
        )}
      </View>
      {/* Bottom fade */}
      <LinearGradient
        colors={["transparent", "#000000"]}
        style={styles.bottomFade}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    overflow: "hidden",
    position: "relative",
    minHeight: 200,
    backgroundColor: "#0a0412",
  },
  radialGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(147, 51, 234, 0.08)",
  },
  geoImage: {
    position: "absolute",
    right: -20,
    top: 0,
    bottom: 0,
    width: "55%",
    opacity: 0.1,
  },
  topBorder: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(212, 175, 55, 0.4)",
  },
  content: {
    alignItems: "center",
    gap: 12,
    position: "relative",
    zIndex: 10,
  },
  badgeContainer: {
    borderWidth: 1,
    borderColor: "rgba(147, 51, 234, 0.5)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#a78bfa",
    fontFamily: "monospace",
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#d4af37",
    textAlign: "center",
    lineHeight: 44,
  },
  divider: {
    width: 120,
    height: 1,
    backgroundColor: "rgba(212, 175, 55, 0.6)",
  },
  subtitle: {
    fontSize: 15,
    color: "#c4b5a0",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 340,
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 40,
  },
});
