/**
 * Library Screen — The 33rd House
 * The Sacred Archive — PDF library of teachings, codices, and sacred texts.
 */
import { useState } from "react";
import { ScrollView, View, StyleSheet, Pressable, TextInput, Linking, Image } from "react-native";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { ScreenHeader } from "@/components/screen-header";
import { useThemeColor } from "@/hooks/use-theme-color";
import { CDN } from "@/constants/cdn-assets";

interface LibraryDoc {
  title: string;
  cdnUrl: string;
  size: string;
  tier: string;
  category: string;
}

const PDF_LIBRARY: LibraryDoc[] = [
  { title: "90 Day Activation Package", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/SDDHwUxlFROaAWPd.pdf", size: "307KB", tier: "seeker", category: "practice" },
  { title: "Beyond Duality: The Christ Consciousness", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/BvYGAAdWpXBcJeKN.pdf", size: "351KB", tier: "initiate", category: "teachings" },
  { title: "Channeled Synthesis Complete Breakdown", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/GFJLxFOddirNumAF.pdf", size: "323KB", tier: "elder", category: "teachings" },
  { title: "Chronicles of House Valuri", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/AxFbcYxCTRmAIaog.pdf", size: "2.8MB", tier: "seeker", category: "teachings" },
  { title: "Community Onboarding", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/QivlzhklWXXpRkxe.pdf", size: "3.1MB", tier: "free", category: "reference" },
  { title: "Cosmic Integration", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/pDXvbfKBeqHpvdhD.pdf", size: "2.5MB", tier: "elder", category: "teachings" },
  { title: "Family Keeper Onboarding", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/XIoMgdjXqXtvOyDl.pdf", size: "3.2MB", tier: "seeker", category: "reference" },
  { title: "Guardian Charter (Branded)", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/AMQaEntkFpuJCRME.pdf", size: "11MB", tier: "elder", category: "ceremony" },
  { title: "Kundalini Curriculum", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/hkomzBCnlVglDRXq.pdf", size: "4.5MB", tier: "initiate", category: "curriculum" },
  { title: "Maritime Body Vessel", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/XjTnYEIzaTQqBkVh.pdf", size: "2.9MB", tier: "initiate", category: "teachings" },
  { title: "Master Reign", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/VxNbXZNPgUTpWZDZ.pdf", size: "3.0MB", tier: "elder", category: "teachings" },
  { title: "Mythic Posters Collection", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/zaJvzbkwjNRnJizi.pdf", size: "28MB", tier: "free", category: "reference" },
  { title: "Nadi Energy System", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/QMIeQXTcZWGrdmWD.pdf", size: "3.0MB", tier: "initiate", category: "teachings" },
  { title: "Practice Pack", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/voaWaeDUBpQCWGpU.pdf", size: "3.1MB", tier: "seeker", category: "practice" },
  { title: "Purple Flame Historical Citations", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/yjjOTXVEZhPFfTpr.pdf", size: "351KB", tier: "elder", category: "evidence" },
  { title: "Symbols Doctrine", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/MDhyTdezZPAqogWX.pdf", size: "3.0MB", tier: "initiate", category: "teachings" },
  { title: "Teaching Pack", cdnUrl: "https://files.manuscdn.com/user_upload_by_module/session_file/310519663033211106/xRjdrsVhubIBRNzj.pdf", size: "3.1MB", tier: "elder", category: "curriculum" },
];

const CATEGORIES = ["all", "teachings", "practice", "curriculum", "reference", "ceremony", "evidence"];

const tierColors: Record<string, string> = {
  free: "#22c55e",
  seeker: "#a78bfa",
  initiate: "#3b82f6",
  elder: "#f59e0b",
  keeper: "#ef4444",
};

const categoryIcons: Record<string, string> = {
  teachings: "📜",
  practice: "🧘",
  curriculum: "📚",
  reference: "🗺️",
  ceremony: "🔮",
  evidence: "🔍",
  all: "📖",
};

export default function LibraryScreen() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  const filtered = PDF_LIBRARY.filter((doc) => {
    const matchSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "all" || doc.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleOpen = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="The Library"
          subtitle="The Sacred Archive — codices, teachings, and reference texts for the initiated student."
          badge="Sacred Archive"
          geoIndex={7}
        />

        {/* Book cover decorative */}
        <View style={[styles.archiveIntro, { backgroundColor: "rgba(26, 10, 46, 0.6)" }]}>
          <Image
            source={{ uri: CDN.decorative.bookCover }}
            style={styles.bookCoverImage}
            resizeMode="contain"
          />
          <View style={styles.archiveStats}>
            <View style={styles.archiveStat}>
              <ThemedText style={[styles.archiveStatNum, { color: goldColor }]}>{PDF_LIBRARY.length}</ThemedText>
              <ThemedText style={styles.archiveStatLabel}>Sacred Texts</ThemedText>
            </View>
            <View style={styles.archiveStat}>
              <ThemedText style={[styles.archiveStatNum, { color: goldColor }]}>5</ThemedText>
              <ThemedText style={styles.archiveStatLabel}>Access Tiers</ThemedText>
            </View>
            <View style={styles.archiveStat}>
              <ThemedText style={[styles.archiveStatNum, { color: goldColor }]}>6</ThemedText>
              <ThemedText style={styles.archiveStatLabel}>Categories</ThemedText>
            </View>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchSection}>
          <View style={[styles.searchInput, { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.3)" }]}>
            <ThemedText style={styles.searchIcon}>🔍</ThemedText>
            <TextInput
              style={[styles.searchField, { color: "#f0e6d2" }]}
              placeholder="Search the archive..."
              placeholderTextColor="#666"
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        {/* Category Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
          <View style={styles.categoryRow}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat}
                style={[
                  styles.categoryChip,
                  activeCategory === cat
                    ? { backgroundColor: tintColor }
                    : { backgroundColor: cardBg, borderColor: "rgba(147,51,234,0.3)", borderWidth: 1 },
                ]}
                onPress={() => setActiveCategory(cat)}
              >
                <ThemedText style={styles.categoryChipIcon}>{categoryIcons[cat]}</ThemedText>
                <ThemedText
                  style={[
                    styles.categoryChipText,
                    { color: activeCategory === cat ? "#fff" : "#c4b5a0" },
                  ]}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </ScrollView>

        {/* Results count */}
        <View style={styles.resultsRow}>
          <ThemedText style={styles.resultsText}>
            {filtered.length} {filtered.length === 1 ? "text" : "texts"} found
          </ThemedText>
        </View>

        {/* Document List */}
        <View style={styles.docList}>
          {filtered.map((doc, i) => (
            <View key={i} style={[styles.docCard, { backgroundColor: cardBg }]}>
              <View style={styles.docHeader}>
                <ThemedText style={styles.docCategoryIcon}>{categoryIcons[doc.category] ?? "📄"}</ThemedText>
                <View style={styles.docTitles}>
                  <ThemedText style={[styles.docTitle, { color: goldColor }]}>{doc.title}</ThemedText>
                  <View style={styles.docMeta}>
                    <View style={[styles.tierBadge, { backgroundColor: (tierColors[doc.tier] ?? "#666") + "20", borderColor: tierColors[doc.tier] ?? "#666" }]}>
                      <ThemedText style={[styles.tierText, { color: tierColors[doc.tier] ?? "#666" }]}>
                        {doc.tier}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.docSize}>{doc.size}</ThemedText>
                    <ThemedText style={styles.docCategory}>{doc.category}</ThemedText>
                  </View>
                </View>
              </View>
              <Pressable
                style={[styles.openBtn, { backgroundColor: tintColor + "20", borderColor: tintColor }]}
                onPress={() => handleOpen(doc.cdnUrl)}
              >
                <ThemedText style={[styles.openBtnText, { color: tintColor }]}>Open PDF</ThemedText>
              </Pressable>
            </View>
          ))}
        </View>

        <View style={{ height: 60 }} />
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  archiveIntro: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  bookCoverImage: {
    width: 60,
    height: 80,
    opacity: 0.8,
  },
  archiveStats: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  archiveStat: {
    alignItems: "center",
    gap: 2,
  },
  archiveStatNum: {
    fontSize: 24,
    fontWeight: "bold",
  },
  archiveStatLabel: {
    fontSize: 11,
    color: "#c4b5a0",
  },
  searchSection: {
    padding: 16,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchField: {
    flex: 1,
    fontSize: 15,
  },
  categoryScroll: {
    paddingLeft: 16,
    marginBottom: 4,
  },
  categoryRow: {
    flexDirection: "row",
    gap: 8,
    paddingRight: 16,
  },
  categoryChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  categoryChipIcon: {
    fontSize: 13,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: "500",
  },
  resultsRow: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  resultsText: {
    fontSize: 13,
    color: "#666",
  },
  docList: {
    padding: 16,
    gap: 12,
  },
  docCard: {
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  docHeader: {
    flexDirection: "row",
    gap: 12,
    alignItems: "flex-start",
  },
  docCategoryIcon: {
    fontSize: 22,
    marginTop: 2,
  },
  docTitles: {
    flex: 1,
    gap: 6,
  },
  docTitle: {
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 22,
  },
  docMeta: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  },
  tierBadge: {
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  tierText: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  docSize: {
    fontSize: 11,
    color: "#666",
  },
  docCategory: {
    fontSize: 11,
    color: "#888",
    textTransform: "capitalize",
  },
  openBtn: {
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
  },
  openBtnText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
