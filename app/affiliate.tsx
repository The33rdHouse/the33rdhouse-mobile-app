import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Pressable, ScrollView, Share, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useAuth } from "@/hooks/use-auth";
import { useThemeColor } from "@/hooks/use-theme-color";

// Mock affiliate data (would come from database)
const MOCK_AFFILIATE_DATA = {
  code: "DRAGON33",
  totalClicks: 247,
  totalSignups: 18,
  conversionRate: 7.3,
  pendingEarnings: 12450, // in cents
  paidEarnings: 45600,
  lifetimeEarnings: 58050,
  referrals: [
    { id: 1, name: "Sarah M.", tier: "seeker", status: "converted", earned: 330, date: "2024-01-15" },
    { id: 2, name: "Mike T.", tier: "sovereign", status: "converted", earned: 4995, date: "2024-01-12" },
    { id: 3, name: "Luna K.", tier: "seeker", status: "converted", earned: 330, date: "2024-01-10" },
    { id: 4, name: "Alex R.", tier: "ascended", status: "converted", earned: 6666, date: "2024-01-08" },
    { id: 5, name: "Emma W.", tier: "pending", status: "pending", earned: 0, date: "2024-01-20" },
  ],
};

const COMMISSION_RATES = {
  seeker: 10, // 10% of $33 = $3.30
  sovereign: 15, // 15% of $333 = $49.95
  ascended: 20, // 20% of $3,333 = $666.60
};

export default function AffiliateScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const cardBg = useThemeColor({}, "background");
  const borderColor = useThemeColor({ light: "#E5E7EB", dark: "#374151" }, "text");
  const inputBg = useThemeColor({ light: "#F9FAFB", dark: "#1F2937" }, "background");

  const [filter, setFilter] = useState<"all" | "converted" | "pending">("all");

  const filteredReferrals =
    filter === "all"
      ? MOCK_AFFILIATE_DATA.referrals
      : MOCK_AFFILIATE_DATA.referrals.filter((r) => r.status === filter);

  const handleShare = async () => {
    const referralLink = `https://the33rdhouse.com/join?ref=${MOCK_AFFILIATE_DATA.code}`;
    try {
      await Share.share({
        message: `🐉 Join me on The 33rd House - A complete consciousness transformation system.\n\nUse my code: ${MOCK_AFFILIATE_DATA.code}\n${referralLink}`,
        url: referralLink,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRequestPayout = () => {
    if (MOCK_AFFILIATE_DATA.pendingEarnings < 5000) {
      Alert.alert(
        "Minimum Not Met",
        "You need at least $50 in pending earnings to request a payout. Keep sharing!",
      );
    } else {
      Alert.alert(
        "Payout Requested",
        `Your payout of $${(MOCK_AFFILIATE_DATA.pendingEarnings / 100).toFixed(2)} has been requested. You'll receive it within 5-7 business days.`,
      );
    }
  };

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </Pressable>
        <ThemedText type="title">💰 Affiliate Program</ThemedText>
        <ThemedText style={styles.subtitle}>
          Earn 10-20% recurring commissions by referring new members
        </ThemedText>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Earnings Overview */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            💸 Earnings Overview
          </ThemedText>
          <View style={styles.earningsGrid}>
            <View style={styles.earningItem}>
              <ThemedText style={styles.earningLabel}>Pending</ThemedText>
              <ThemedText type="title" style={styles.earningAmount}>
                ${(MOCK_AFFILIATE_DATA.pendingEarnings / 100).toFixed(2)}
              </ThemedText>
            </View>
            <View style={styles.earningItem}>
              <ThemedText style={styles.earningLabel}>Paid</ThemedText>
              <ThemedText type="title" style={styles.earningAmount}>
                ${(MOCK_AFFILIATE_DATA.paidEarnings / 100).toFixed(2)}
              </ThemedText>
            </View>
            <View style={styles.earningItem}>
              <ThemedText style={styles.earningLabel}>Lifetime</ThemedText>
              <ThemedText type="title" style={[styles.earningAmount, { color: "#10B981" }]}>
                ${(MOCK_AFFILIATE_DATA.lifetimeEarnings / 100).toFixed(2)}
              </ThemedText>
            </View>
          </View>
          <Pressable style={styles.payoutButton} onPress={handleRequestPayout}>
            <ThemedText style={styles.payoutButtonText}>Request Payout</ThemedText>
          </Pressable>
          <ThemedText style={styles.payoutNote}>
            Minimum payout: $50. Paid within 5-7 business days.
          </ThemedText>
        </View>

        {/* Referral Link */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            🔗 Your Referral Link
          </ThemedText>
          <View style={[styles.linkContainer, { backgroundColor: inputBg, borderColor }]}>
            <TextInput
              value={`https://the33rdhouse.com/join?ref=${MOCK_AFFILIATE_DATA.code}`}
              editable={false}
              style={[styles.linkInput, { color: useThemeColor({}, "text") }]}
            />
          </View>
          <Pressable style={styles.shareButton} onPress={handleShare}>
            <ThemedText style={styles.shareButtonText}>📤 Share Link</ThemedText>
          </Pressable>
        </View>

        {/* Stats */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            📊 Performance Stats
          </ThemedText>
          <View style={styles.statRow}>
            <ThemedText style={styles.statLabel}>Total Clicks</ThemedText>
            <ThemedText type="defaultSemiBold">{MOCK_AFFILIATE_DATA.totalClicks}</ThemedText>
          </View>
          <View style={styles.statRow}>
            <ThemedText style={styles.statLabel}>Total Signups</ThemedText>
            <ThemedText type="defaultSemiBold">{MOCK_AFFILIATE_DATA.totalSignups}</ThemedText>
          </View>
          <View style={styles.statRow}>
            <ThemedText style={styles.statLabel}>Conversion Rate</ThemedText>
            <ThemedText type="defaultSemiBold" style={{ color: "#10B981" }}>
              {MOCK_AFFILIATE_DATA.conversionRate}%
            </ThemedText>
          </View>
        </View>

        {/* Commission Rates */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            💎 Commission Rates
          </ThemedText>
          <View style={styles.rateRow}>
            <ThemedText style={styles.rateTier}>🔮 Seeker ($33/mo)</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.rateAmount}>
              10% = $3.30/mo
            </ThemedText>
          </View>
          <View style={styles.rateRow}>
            <ThemedText style={styles.rateTier}>💎 Sovereign ($333/mo)</ThemedText>
            <ThemedText type="defaultSemiBold" style={styles.rateAmount}>
              15% = $49.95/mo
            </ThemedText>
          </View>
          <View style={styles.rateRow}>
            <ThemedText style={styles.rateTier}>👑 Ascended ($3,333/mo)</ThemedText>
            <ThemedText type="defaultSemiBold" style={[styles.rateAmount, { color: "#EF4444" }]}>
              20% = $666.60/mo
            </ThemedText>
          </View>
          <ThemedText style={styles.rateNote}>
            Earn recurring commissions for as long as they stay subscribed!
          </ThemedText>
        </View>

        {/* Referrals List */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor }]}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
            👥 Your Referrals ({MOCK_AFFILIATE_DATA.referrals.length})
          </ThemedText>

          {/* Filter Chips */}
          <View style={styles.filterContainer}>
            <Pressable
              style={[
                styles.filterChip,
                { borderColor },
                filter === "all" && styles.filterChipActive,
              ]}
              onPress={() => setFilter("all")}
            >
              <ThemedText style={[styles.filterText, filter === "all" && styles.filterTextActive]}>
                All
              </ThemedText>
            </Pressable>
            <Pressable
              style={[
                styles.filterChip,
                { borderColor },
                filter === "converted" && styles.filterChipActive,
              ]}
              onPress={() => setFilter("converted")}
            >
              <ThemedText
                style={[styles.filterText, filter === "converted" && styles.filterTextActive]}
              >
                Converted
              </ThemedText>
            </Pressable>
            <Pressable
              style={[
                styles.filterChip,
                { borderColor },
                filter === "pending" && styles.filterChipActive,
              ]}
              onPress={() => setFilter("pending")}
            >
              <ThemedText
                style={[styles.filterText, filter === "pending" && styles.filterTextActive]}
              >
                Pending
              </ThemedText>
            </Pressable>
          </View>

          {filteredReferrals.map((referral) => (
            <View key={referral.id} style={[styles.referralRow, { borderColor }]}>
              <View style={styles.referralInfo}>
                <ThemedText type="defaultSemiBold">{referral.name}</ThemedText>
                <ThemedText style={styles.referralDate}>{referral.date}</ThemedText>
              </View>
              <View style={styles.referralRight}>
                {referral.status === "converted" ? (
                  <>
                    <View style={styles.tierBadge}>
                      <ThemedText style={styles.tierBadgeText}>
                        {referral.tier === "seeker" && "🔮"}
                        {referral.tier === "sovereign" && "💎"}
                        {referral.tier === "ascended" && "👑"}
                      </ThemedText>
                    </View>
                    <ThemedText type="defaultSemiBold" style={{ color: "#10B981" }}>
                      +${(referral.earned / 100).toFixed(2)}
                    </ThemedText>
                  </>
                ) : (
                  <ThemedText style={styles.pendingText}>Pending</ThemedText>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 12,
  },
  backButton: {
    marginBottom: 8,
  },
  backText: {
    fontSize: 16,
    color: "#8B5CF6",
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 12,
    fontSize: 16,
  },
  earningsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  earningItem: {
    flex: 1,
    alignItems: "center",
  },
  earningLabel: {
    fontSize: 12,
    opacity: 0.6,
    marginBottom: 4,
  },
  earningAmount: {
    fontSize: 24,
  },
  payoutButton: {
    backgroundColor: "#10B981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
  },
  payoutButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  payoutNote: {
    fontSize: 11,
    opacity: 0.6,
    textAlign: "center",
  },
  linkContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  linkInput: {
    fontSize: 14,
  },
  shareButton: {
    backgroundColor: "#8B5CF6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  shareButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  statLabel: {
    opacity: 0.7,
  },
  rateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  rateTier: {
    fontSize: 14,
  },
  rateAmount: {
    fontSize: 14,
  },
  rateNote: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 8,
    fontStyle: "italic",
  },
  filterContainer: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: "#8B5CF6",
    borderColor: "#8B5CF6",
  },
  filterText: {
    fontSize: 12,
  },
  filterTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  referralRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  referralInfo: {
    flex: 1,
  },
  referralDate: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
  referralRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tierBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(139, 92, 246, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  tierBadgeText: {
    fontSize: 14,
  },
  pendingText: {
    fontSize: 12,
    opacity: 0.5,
  },
});
