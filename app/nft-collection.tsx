import { StyleSheet, ScrollView, View, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  NFT_RARITY_TIERS,
  NFT_COLLECTION,
  getTotalMintRevenue,
  RarityTier,
} from "@/constants/nft-data";

export default function NFTCollectionScreen() {
  const [selectedRarity, setSelectedRarity] = useState<RarityTier | null>(null);
  
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");

  const filteredNFTs = selectedRarity
    ? NFT_COLLECTION.filter((nft) => nft.rarity === selectedRarity)
    : NFT_COLLECTION;

  const totalRevenue = getTotalMintRevenue();

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <ThemedView style={styles.header}>
          <ThemedText type="title">NFT Collection</ThemedText>
          <ThemedText style={styles.subtitle}>144 Realm Glyphs</ThemedText>
        </ThemedView>

        {/* Collection Overview */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Collection Overview
          </ThemedText>
          <View style={styles.overviewStats}>
            <View style={styles.overviewItem}>
              <ThemedText style={styles.overviewValue}>144</ThemedText>
              <ThemedText style={styles.overviewLabel}>Total NFTs</ThemedText>
            </View>
            <View style={styles.overviewItem}>
              <ThemedText style={styles.overviewValue}>{totalRevenue.toFixed(2)} ETH</ThemedText>
              <ThemedText style={styles.overviewLabel}>Mint Revenue</ThemedText>
            </View>
            <View style={styles.overviewItem}>
              <ThemedText style={styles.overviewValue}>7.5%</ThemedText>
              <ThemedText style={styles.overviewLabel}>Royalties</ThemedText>
            </View>
          </View>
        </View>

        {/* Rarity Breakdown */}
        <View style={[styles.card, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.cardTitle}>
            Rarity Tiers
          </ThemedText>
          {NFT_RARITY_TIERS.map((tier, index) => (
            <View key={index} style={styles.rarityItem}>
              <View style={styles.rarityHeader}>
                <View style={[styles.rarityDot, { backgroundColor: tier.color }]} />
                <ThemedText style={styles.rarityTier}>{tier.tier}</ThemedText>
                <ThemedText style={styles.rarityCount}>
                  {tier.count} ({tier.percentage}%)
                </ThemedText>
              </View>
              <View style={styles.rarityDetails}>
                <ThemedText style={styles.rarityPrice}>{tier.priceETH} ETH</ThemedText>
                <ThemedText style={styles.rarityRevenue}>
                  Total: {(tier.count * tier.priceETH).toFixed(2)} ETH
                </ThemedText>
              </View>
              <View style={styles.benefitsList}>
                {tier.benefits.slice(0, 3).map((benefit, i) => (
                  <ThemedText key={i} style={styles.benefit}>
                    • {benefit}
                  </ThemedText>
                ))}
              </View>
            </View>
          ))}
        </View>

        {/* Filter Chips */}
        <View style={styles.filterContainer}>
          <Pressable
            onPress={() => setSelectedRarity(null)}
            style={[
              styles.filterChip,
              { backgroundColor: !selectedRarity ? tintColor : cardBg },
            ]}
          >
            <ThemedText
              style={[
                styles.filterText,
                { color: !selectedRarity ? "#fff" : undefined },
              ]}
            >
              All ({NFT_COLLECTION.length})
            </ThemedText>
          </Pressable>
          {NFT_RARITY_TIERS.map((tier) => (
            <Pressable
              key={tier.tier}
              onPress={() => setSelectedRarity(tier.tier)}
              style={[
                styles.filterChip,
                { backgroundColor: selectedRarity === tier.tier ? tintColor : cardBg },
              ]}
            >
              <ThemedText
                style={[
                  styles.filterText,
                  { color: selectedRarity === tier.tier ? "#fff" : undefined },
                ]}
              >
                {tier.tier} ({tier.count})
              </ThemedText>
            </Pressable>
          ))}
        </View>

        {/* NFT Grid */}
        <View style={styles.gridContainer}>
          <FlatList
            data={filteredNFTs}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            scrollEnabled={false}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => {
              const tierInfo = NFT_RARITY_TIERS.find((t) => t.tier === item.rarity);
              return (
                <Pressable
                  style={[styles.nftCard, { backgroundColor: cardBg }]}
                  onPress={() => {}}
                >
                  <View
                    style={[
                      styles.nftPlaceholder,
                      { backgroundColor: tierInfo?.color || "#666" },
                    ]}
                  >
                    <ThemedText style={styles.nftRealmId}>#{item.realmId}</ThemedText>
                  </View>
                  <View
                    style={[styles.rarityBadge, { backgroundColor: tierInfo?.color || "#666" }]}
                  >
                    <ThemedText style={styles.rarityBadgeText}>{item.rarity}</ThemedText>
                  </View>
                  <ThemedText style={styles.nftName} numberOfLines={2}>
                    {item.name}
                  </ThemedText>
                  <ThemedText style={styles.nftPrice}>{item.priceETH} ETH</ThemedText>
                </Pressable>
              );
            }}
          />
        </View>

        <View style={{ height: 40 }} />
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
    paddingTop: 60,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  card: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  cardTitle: {
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overviewItem: {
    alignItems: "center",
  },
  overviewValue: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  rarityItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  rarityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  rarityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  rarityTier: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
  },
  rarityCount: {
    fontSize: 13,
    opacity: 0.7,
  },
  rarityDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  rarityPrice: {
    fontSize: 14,
    fontWeight: "600",
  },
  rarityRevenue: {
    fontSize: 13,
    opacity: 0.7,
  },
  benefitsList: {
    gap: 4,
  },
  benefit: {
    fontSize: 12,
    opacity: 0.7,
    lineHeight: 16,
  },
  filterContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
    flexWrap: "wrap",
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  filterText: {
    fontSize: 13,
    fontWeight: "600",
  },
  gridContainer: {
    paddingHorizontal: 12,
  },
  grid: {
    paddingBottom: 20,
  },
  nftCard: {
    flex: 1,
    margin: 8,
    padding: 12,
    borderRadius: 12,
    maxWidth: "47%",
  },
  nftPlaceholder: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  nftRealmId: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  rarityBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  rarityBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  nftName: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
    lineHeight: 16,
  },
  nftPrice: {
    fontSize: 14,
    fontWeight: "bold",
    opacity: 0.9,
  },
});
