import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/use-auth";

const TIERS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    color: "#666",
    features: [
      "Access to Gates 0–2 (Threshold, Warrior, Builder)",
      "36 Realms unlocked",
      "Community Feed (view only)",
      "Daily Check-In",
      "Daily Missions & Badges",
    ],
    limitations: [
      "No AI Assistant",
      "No Professor access",
      "No affiliate earnings",
      "No War Room access",
    ],
  },
  {
    id: "seeker",
    name: "Seeker",
    price: 33,
    period: "month",
    color: "#9b59b6",
    popular: false,
    features: [
      "✅ Everything in Free",
      "Access to Gates 0–5 (through The Heart)",
      "72 Realms unlocked",
      "Full Community Feed access",
      "Unlimited AI Assistant",
      "War Room access",
      "Affiliate commissions",
    ],
    cta: "Start Your Journey",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: 333,
    period: "month",
    color: "#e74c3c",
    popular: true,
    features: [
      "✅ Everything in Seeker",
      "Access to Gates 0–8 (through The Transformer)",
      "108 Realms unlocked",
      "Professor access & live sessions",
      "Priority AI support",
      "Video generation tools",
      "Weekly live Q&A sessions",
      "Success Stories featured",
    ],
    cta: "Claim Sovereignty",
  },
  {
    id: "ascended",
    name: "Ascended",
    price: 3333,
    period: "month",
    color: "#f39c12",
    popular: false,
    features: [
      "✅ Everything in Sovereign",
      "Access to ALL Gates (0-12)",
      "All 144 Realms unlocked",
      "1-on-1 Coaching (2 sessions/month)",
      "Private Mastermind Group",
      "Custom AI training on your journey",
      "Direct Professor access",
      "20% Affiliate commissions",
      "VIP Retreat invitations",
      "Lifetime access guarantee",
    ],
    cta: "Ascend Now",
  },
];

export default function PricingScreen() {
  const { user, isAuthenticated } = useAuth();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly");

  const cardBg = useThemeColor({}, "card");
  const goldColor = useThemeColor({}, "gold");

  const currentTier = (user as any)?.membershipTier || "free";

  const handleSelectPlan = (tierId: string) => {
    if (!isAuthenticated) {
      Alert.alert("Login Required", "Please login to upgrade your membership");
      router.push("/(tabs)/" as any);
      return;
    }

    if (tierId === "free") {
      Alert.alert("Already Free", "You're already on the free tier");
      return;
    }

    if (tierId === currentTier) {
      Alert.alert("Current Plan", `You're already on the ${tierId} plan`);
      return;
    }

    // Show upgrade confirmation (checkout flow to be implemented with payment provider)
    const tierName = TIERS.find((t) => t.id === tierId)?.name || tierId;
    const tierPrice = TIERS.find((t) => t.id === tierId)?.price || 0;
    Alert.alert(
      `Upgrade to ${tierName}`,
      `$${tierPrice}/month — full checkout coming soon. Contact support@33rdhouse.org to upgrade now.`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Contact Support", onPress: () => {} },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Membership Tiers",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Choose Your Path
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Transform your consciousness. Reclaim your sovereignty.
            </ThemedText>
          </View>

          {/* Billing Toggle */}
          <View style={styles.billingToggle}>
            <Pressable
              onPress={() => setBillingCycle("monthly")}
              style={[
                styles.toggleButton,
                {
                  backgroundColor: billingCycle === "monthly" ? goldColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.toggleText,
                  billingCycle === "monthly" && { color: "#000", fontWeight: "700" },
                ]}
              >
                Monthly
              </ThemedText>
            </Pressable>
            <Pressable
              onPress={() => setBillingCycle("annual")}
              style={[
                styles.toggleButton,
                {
                  backgroundColor: billingCycle === "annual" ? goldColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.toggleText,
                  billingCycle === "annual" && { color: "#000", fontWeight: "700" },
                ]}
              >
                Annual (Save 20%)
              </ThemedText>
            </Pressable>
          </View>

          {/* Pricing Cards */}
          {TIERS.map((tier) => {
            const annualPrice = tier.price * 12 * 0.8;
            const displayPrice = billingCycle === "annual" && tier.price > 0 ? annualPrice : tier.price;
            const isCurrentTier = tier.id === currentTier;

            return (
              <View
                key={tier.id}
                style={[
                  styles.tierCard,
                  {
                    backgroundColor: cardBg,
                    borderColor: tier.popular ? goldColor : "transparent",
                    borderWidth: tier.popular ? 2 : 0,
                  },
                ]}
              >
                {tier.popular && (
                  <View style={[styles.popularBadge, { backgroundColor: goldColor }]}>
                    <ThemedText style={styles.popularText}>MOST POPULAR</ThemedText>
                  </View>
                )}

                {isCurrentTier && (
                  <View style={[styles.currentBadge, { backgroundColor: "#27ae60" }]}>
                    <ThemedText style={styles.currentText}>CURRENT PLAN</ThemedText>
                  </View>
                )}

                <ThemedText type="title" style={[styles.tierName, { color: tier.color }]}>
                  {tier.name}
                </ThemedText>

                <View style={styles.priceContainer}>
                  <ThemedText style={styles.priceSymbol}>$</ThemedText>
                  <ThemedText style={styles.priceAmount}>
                    {displayPrice === 0 ? "0" : displayPrice.toLocaleString()}
                  </ThemedText>
                  <ThemedText style={styles.pricePeriod}>
                    /{billingCycle === "annual" && tier.price > 0 ? "year" : tier.period}
                  </ThemedText>
                </View>

                <View style={styles.featuresContainer}>
                  {tier.features.map((feature, index) => (
                    <View key={index} style={styles.featureRow}>
                      <ThemedText style={styles.featureIcon}>
                        {feature.startsWith("✅") ? "" : "✓"}
                      </ThemedText>
                      <ThemedText style={styles.featureText}>{feature}</ThemedText>
                    </View>
                  ))}

                  {tier.limitations && (
                    <>
                      <View style={styles.divider} />
                      {tier.limitations.map((limitation, index) => (
                        <View key={index} style={styles.featureRow}>
                          <ThemedText style={[styles.featureIcon, { opacity: 0.5 }]}>✗</ThemedText>
                          <ThemedText style={[styles.featureText, { opacity: 0.5 }]}>
                            {limitation}
                          </ThemedText>
                        </View>
                      ))}
                    </>
                  )}
                </View>

                <Pressable
                  onPress={() => handleSelectPlan(tier.id)}
                  disabled={isCurrentTier}
                  style={[
                    styles.ctaButton,
                    {
                      backgroundColor: isCurrentTier ? "#666" : tier.color,
                    },
                  ]}
                >
                  <ThemedText style={styles.ctaText}>
                    {isCurrentTier ? "Current Plan" : tier.cta || "Select Plan"}
                  </ThemedText>
                </Pressable>
              </View>
            );
          })}

          {/* Money-Back Guarantee */}
          <View style={[styles.guaranteeBox, { backgroundColor: cardBg }]}>
            <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
              💎 30-Day Money-Back Guarantee
            </ThemedText>
            <ThemedText style={{ opacity: 0.8, textAlign: "center" }}>
              If you don't see transformation in 30 days, we'll refund every penny. No questions asked.
            </ThemedText>
          </View>

          {/* Social Proof */}
          <View style={styles.socialProof}>
            <ThemedText type="defaultSemiBold" style={{ fontSize: 18, marginBottom: 12 }}>
              Join 10,000+ Practitioners
            </ThemedText>
            <ThemedText style={{ opacity: 0.7, textAlign: "center" }}>
              "The 33rd House transformed my life. I've never felt more sovereign." - Sarah K., Sovereign Member
            </ThemedText>
          </View>
        </ScrollView>
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    textAlign: "center",
  },
  billingToggle: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 32,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    alignItems: "center",
  },
  toggleText: {
    fontSize: 14,
  },
  tierCard: {
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    position: "relative",
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    left: "50%",
    transform: [{ translateX: -60 }],
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#000",
  },
  currentBadge: {
    position: "absolute",
    top: -12,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 10,
  },
  currentText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  tierName: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: 24,
  },
  priceSymbol: {
    fontSize: 24,
    marginTop: 8,
    opacity: 0.8,
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: "bold",
  },
  pricePeriod: {
    fontSize: 16,
    marginTop: 16,
    opacity: 0.7,
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    marginRight: 12,
    color: "#27ae60",
  },
  featureText: {
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginVertical: 16,
  },
  ctaButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  ctaText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  guaranteeBox: {
    padding: 20,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  socialProof: {
    alignItems: "center",
    marginBottom: 40,
  },
});
