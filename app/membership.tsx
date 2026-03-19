/**
 * Membership Screen — The 33rd House
 * Membership tiers, the covenant of entry, and FAQ.
 */
import { ScrollView, View, StyleSheet, Pressable } from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";

const tiers = [
  {
    key: "seeker",
    name: "Seeker",
    price: "Free",
    period: "forever",
    description: "Begin your journey. Access the foundation and limited access to the public library.",
    features: [
      "Access to Gates 0–2 (Threshold, Warrior, Builder)",
      "Public library (selected texts)",
      "Community forum access",
      "Monthly sacred calendar",
      "The 33rd House newsletter",
    ],
    cta: "Start Free",
    icon: "🔥",
    color: "#7C3AED",
  },
  {
    key: "inner-circle",
    name: "Inner Circle",
    price: "$27",
    period: "/month",
    description: "Unlock the complete curriculum and join the living community of initiates.",
    features: [
      "All Seeker features",
      "Full curriculum through Gate 5 (The Heart)",
      "Complete library access",
      "Inner Circle community",
      "Monthly live sessions",
      "Guided meditations (72 Realms)",
      "Sacred journal & tracking tools",
    ],
    cta: "Join Inner Circle",
    highlighted: true,
    badge: "Most Popular",
    icon: "✨",
    color: "#9333ea",
  },
  {
    key: "adept",
    name: "Adept",
    price: "$97",
    period: "/month",
    description: "Advanced teachings with AI-powered guidance and deeper community access.",
    features: [
      "All Inner Circle features",
      "Advanced curriculum through Gate 8 (The Transformer)",
      "AI-powered sacred guidance",
      "Adept study groups",
      "Quarterly 1:1 mentorship call",
      "Advanced meditation library",
      "Priority community support",
    ],
    cta: "Unlock Adept",
    icon: "⭐",
    color: "#1D4ED8",
  },
  {
    key: "elder",
    name: "Elder",
    price: "$297",
    period: "/month",
    description: "Complete access with personal mentorship and Elder Council membership.",
    features: [
      "All Adept features",
      "Complete curriculum — all Gates 0–12 unlocked",
      "Monthly personal mentorship",
      "Elder Council access",
      "Co-creation opportunities",
      "Early access to new teachings",
      "Legacy membership benefits",
    ],
    cta: "Join Elder Circle",
    icon: "👑",
    color: "#C9A84C",
  },
];

const covenantTenets = [
  "Respect the sacred space and its members",
  "Commit to the practice, not just the knowledge",
  "Hold the teachings in confidence where appropriate",
  "Bring your authentic self — no performance",
  "Honour the lineage and the Founder",
  "Serve the community as you are served",
];

const faqs = [
  {
    q: "Can I cancel anytime?",
    a: "Yes. All memberships are month-to-month and can be cancelled at any time. Your access continues until the end of the billing period.",
  },
  {
    q: "What is the difference between the curriculum and the library?",
    a: "The curriculum is the structured 48-week programme — guided, sequential, with assignments and integration practices. The library is the complete archive of texts, codices, and reference materials for independent study.",
  },
  {
    q: "Is this a religion?",
    a: "No. The 33rd House is a sacred knowledge institution — a school, not a church. We draw from many traditions but require no belief in any of them. The work is empirical: you test it in your own experience.",
  },
  {
    q: "How long does the curriculum take?",
    a: "The full 12-module curriculum is designed for 48 weeks (one year). However, the initiatic path is lifelong — the curriculum is the beginning, not the end.",
  },
];

export default function MembershipScreen() {
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Membership"
          subtitle="Four paths of initiation — from first seeker to Elder Council. Choose the level of commitment that matches your calling."
          badge="The House Tiers"
          geoIndex={11}
        />

        {/* Intro */}
        <View style={styles.section}>
          <ThemedText style={styles.bodyText}>
            Membership in The 33rd House is not a subscription — it is an initiation. Each tier
            represents a deeper level of commitment to the path, unlocking greater access to the
            teachings, the community, and the direct transmission.
          </ThemedText>
        </View>

        {/* Tier Cards */}
        <View style={styles.tiersSection}>
          {tiers.map((tier) => (
            <View
              key={tier.key}
              style={[
                styles.tierCard,
                { backgroundColor: cardBg, borderColor: tier.highlighted ? tier.color : "rgba(147,51,234,0.2)" },
                tier.highlighted && styles.tierCardHighlighted,
              ]}
            >
              {tier.badge && (
                <View style={[styles.tierBadge, { backgroundColor: tier.color }]}>
                  <ThemedText style={styles.tierBadgeText}>{tier.badge}</ThemedText>
                </View>
              )}
              <View style={styles.tierHeader}>
                <ThemedText style={styles.tierIcon}>{tier.icon}</ThemedText>
                <View style={styles.tierTitles}>
                  <ThemedText style={[styles.tierName, { color: tier.color }]}>{tier.name}</ThemedText>
                  <View style={styles.tierPriceRow}>
                    <ThemedText style={[styles.tierPrice, { color: goldColor }]}>{tier.price}</ThemedText>
                    <ThemedText style={styles.tierPeriod}>{tier.period}</ThemedText>
                  </View>
                </View>
              </View>
              <ThemedText style={styles.tierDesc}>{tier.description}</ThemedText>
              <View style={[styles.tierDivider, { backgroundColor: tier.color + "40" }]} />
              <View style={styles.featuresList}>
                {tier.features.map((f, i) => (
                  <View key={i} style={styles.featureItem}>
                    <ThemedText style={[styles.featureCheck, { color: tier.color }]}>✓</ThemedText>
                    <ThemedText style={styles.featureText}>{f}</ThemedText>
                  </View>
                ))}
              </View>
              <Pressable
                style={[
                  styles.tierCta,
                  tier.highlighted
                    ? { backgroundColor: tier.color }
                    : { backgroundColor: tier.color + "20", borderColor: tier.color, borderWidth: 1 },
                ]}
                onPress={() => router.push("/pricing" as any)}
              >
                <ThemedText
                  style={[styles.tierCtaText, { color: tier.highlighted ? "#fff" : tier.color }]}
                >
                  {tier.cta}
                </ThemedText>
              </Pressable>
            </View>
          ))}
        </View>

        {/* The Covenant */}
        <View style={[styles.section, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The Covenant of Entry</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          <ThemedText style={styles.bodyText}>
            Membership in The 33rd House is not a transaction — it is a covenant. When you join,
            you agree to the Law of the Temple: six principles that govern conduct within the House
            and ensure the integrity of the sacred space.
          </ThemedText>
          <View style={[styles.covenantCard, { backgroundColor: cardBg, borderColor: goldColor + "40" }]}>
            {covenantTenets.map((tenet, i) => (
              <View key={i} style={styles.covenantItem}>
                <ThemedText style={[styles.covenantNumber, { color: goldColor }]}>{i + 1}.</ThemedText>
                <ThemedText style={styles.covenantText}>{tenet}</ThemedText>
              </View>
            ))}
          </View>
        </View>

        {/* FAQ */}
        <View style={styles.section}>
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>Questions</ThemedText>
          <View style={[styles.divider, { backgroundColor: goldColor }]} />
          {faqs.map((faq, i) => (
            <View key={i} style={[styles.faqCard, { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.2)" }]}>
              <ThemedText style={[styles.faqQuestion, { color: goldColor }]}>{faq.q}</ThemedText>
              <ThemedText style={styles.faqAnswer}>{faq.a}</ThemedText>
            </View>
          ))}
        </View>

        {/* Final CTA */}
        <View style={[styles.section, { alignItems: "center", gap: 16 }]}>
          <View style={[styles.divider, { backgroundColor: goldColor, width: 120 }]} />
          <ThemedText style={[styles.sectionTitle, { color: goldColor }]}>The House is Open</ThemedText>
          <ThemedText style={[styles.bodyText, { textAlign: "center" }]}>
            The door is open. The teaching is real. The only question is: are you ready to enter?
          </ThemedText>
          <Pressable
            style={[styles.primaryBtn, { backgroundColor: tintColor }]}
            onPress={() => router.push("/pricing" as any)}
          >
            <ThemedText style={styles.primaryBtnText}>Begin Free</ThemedText>
          </Pressable>
          <Pressable
            style={[styles.secondaryBtn, { borderColor: goldColor }]}
            onPress={() => router.push("/about" as any)}
          >
            <ThemedText style={[styles.secondaryBtnText, { color: goldColor }]}>Learn More</ThemedText>
          </Pressable>
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  section: {
    padding: 24,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    width: 80,
    height: 1,
    alignSelf: "center",
    opacity: 0.7,
    marginBottom: 4,
  },
  bodyText: {
    fontSize: 15,
    lineHeight: 24,
    color: "#c4b5a0",
  },
  tiersSection: {
    padding: 16,
    gap: 16,
  },
  tierCard: {
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    gap: 12,
    position: "relative",
    overflow: "hidden",
  },
  tierCardHighlighted: {
    borderWidth: 2,
  },
  tierBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  tierBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "700",
  },
  tierHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  tierIcon: {
    fontSize: 28,
  },
  tierTitles: {
    gap: 2,
  },
  tierName: {
    fontSize: 20,
    fontWeight: "700",
  },
  tierPriceRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 4,
  },
  tierPrice: {
    fontSize: 22,
    fontWeight: "bold",
  },
  tierPeriod: {
    fontSize: 13,
    color: "#888",
  },
  tierDesc: {
    fontSize: 14,
    color: "#c4b5a0",
    lineHeight: 22,
  },
  tierDivider: {
    height: 1,
  },
  featuresList: {
    gap: 6,
  },
  featureItem: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-start",
  },
  featureCheck: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 1,
  },
  featureText: {
    fontSize: 13,
    color: "#c4b5a0",
    flex: 1,
    lineHeight: 20,
  },
  tierCta: {
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  tierCtaText: {
    fontWeight: "700",
    fontSize: 15,
  },
  covenantCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 10,
  },
  covenantItem: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  covenantNumber: {
    fontSize: 14,
    fontWeight: "700",
    minWidth: 20,
  },
  covenantText: {
    fontSize: 14,
    color: "#c4b5a0",
    flex: 1,
    lineHeight: 22,
  },
  faqCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 8,
  },
  faqQuestion: {
    fontSize: 15,
    fontWeight: "700",
  },
  faqAnswer: {
    fontSize: 14,
    color: "#c4b5a0",
    lineHeight: 22,
  },
  primaryBtn: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  secondaryBtn: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    width: "100%",
  },
  secondaryBtnText: {
    fontWeight: "700",
    fontSize: 16,
  },
});
