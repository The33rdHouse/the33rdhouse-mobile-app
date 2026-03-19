import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  TextInput,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";

type FilterType = "all" | "gate0" | "gate1" | "gate2" | "gate3" | "gate4" | "gate5" | "gate6" | "gate7" | "gate8" | "gate9" | "gate10" | "gate11" | "gate12";

export default function GenesisScreen() {
  const { isAuthenticated } = useAuth();
  const [filter, setFilter] = useState<FilterType>("all");
  const [refreshing, setRefreshing] = useState(false);

  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  // Fetch feed
  const gateFilter = filter === "all" ? undefined : parseInt(filter.replace("gate", ""));
  const { data: posts, isLoading, refetch } = trpc.genesis.getFeed.useQuery(
    {
      limit: 20,
      offset: 0,
      gateFilter,
    },
    {
      enabled: isAuthenticated,
    }
  );

  // Like mutation
  const likeMutation = trpc.genesis.toggleLike.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleLike = (postId: number) => {
    likeMutation.mutate({ targetType: "post", targetId: postId, reactionType: "heart" });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  if (!isAuthenticated) {
    return (
      <ThemedView style={styles.container}>
        <View style={styles.emptyState}>
          <ThemedText type="title">🌟 Genesis</ThemedText>
          <ThemedText style={styles.emptyText}>
            Connect with fellow practitioners on their consciousness journey
          </ThemedText>
          <Pressable
            style={[styles.loginButton, { backgroundColor: goldColor }]}
            onPress={() => router.push("/(tabs)/" as any)}
          >
            <ThemedText style={styles.loginButtonText}>Login to Join</ThemedText>
          </Pressable>
        </View>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <ThemedText type="title">Genesis</ThemedText>
        <Pressable
          style={[styles.composeButton, { backgroundColor: goldColor }]}
          onPress={() => router.push("/compose-post" as any)}
        >
          <ThemedText style={styles.composeButtonText}>+ Post</ThemedText>
        </Pressable>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        <Pressable
          onPress={() => setFilter("all")}
          style={[
            styles.filterChip,
            {
              backgroundColor: filter === "all" ? goldColor : cardBg,
            },
          ]}
        >
          <ThemedText
            style={[
              styles.filterText,
              filter === "all" && { color: "#000", fontWeight: "700" },
            ]}
          >
            All
          </ThemedText>
        </Pressable>

        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((gate) => (
          <Pressable
            key={gate}
            onPress={() => setFilter(`gate${gate}` as FilterType)}
            style={[
              styles.filterChip,
              {
                backgroundColor: filter === `gate${gate}` ? goldColor : cardBg,
              },
            ]}
          >
            <ThemedText
              style={[
                styles.filterText,
                filter === `gate${gate}` && { color: "#000", fontWeight: "700" },
              ]}
            >
              Gate {gate}
            </ThemedText>
          </Pressable>
        ))}
      </ScrollView>

      {/* Feed */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={goldColor} />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={goldColor} />
          }
        >
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Pressable
                key={post.id}
                style={[styles.postCard, { backgroundColor: cardBg }]}
                onPress={() => router.push(`/post/${post.id}` as any)}
              >
                <View style={styles.postHeader}>
                  <Pressable
                    style={{ flexDirection: "row", alignItems: "center", flex: 1 }}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push(`/user/${post.userId}` as any);
                    }}
                  >
                    <View style={[styles.avatar, { backgroundColor: tintColor }]}>
                      <ThemedText style={styles.avatarText}>U</ThemedText>
                    </View>
                    <View style={styles.postMeta}>
                      <ThemedText type="defaultSemiBold">User {post.userId}</ThemedText>
                      <ThemedText style={styles.postTime}>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </ThemedText>
                    </View>
                  </Pressable>
                  {post.gateTag !== null && (
                    <View style={[styles.gateTag, { backgroundColor: goldColor }]}>
                      <ThemedText style={styles.gateTagText}>Gate {post.gateTag}</ThemedText>
                    </View>
                  )}
                </View>

                <ThemedText style={styles.postContent}>{post.content}</ThemedText>

                {post.mediaUrl && (
                  <View style={[styles.mediaPlaceholder, { backgroundColor: "#333" }]}>
                    <ThemedText style={styles.mediaText}>📷 Media</ThemedText>
                  </View>
                )}

                <View style={styles.postActions}>
                  <Pressable
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      handleLike(post.id);
                    }}
                  >
                    <ThemedText style={styles.actionIcon}>
                      {post.likesCount > 0 ? "❤️" : "🤍"}
                    </ThemedText>
                    <ThemedText style={styles.actionCount}>{post.likesCount}</ThemedText>
                  </Pressable>
                  <Pressable
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      router.push(`/post/${post.id}` as any);
                    }}
                  >
                    <ThemedText style={styles.actionIcon}>💬</ThemedText>
                    <ThemedText style={styles.actionCount}>{post.commentsCount}</ThemedText>
                  </Pressable>
                  <Pressable
                    style={styles.actionButton}
                    onPress={(e) => {
                      e.stopPropagation();
                      // Share functionality
                    }}
                  >
                    <ThemedText style={styles.actionIcon}>🔗</ThemedText>
                    <ThemedText style={styles.actionCount}>Share</ThemedText>
                  </Pressable>
                </View>
              </Pressable>
            ))
          ) : (
            <View style={styles.emptyState}>
              <ThemedText type="subtitle">No posts yet</ThemedText>
              <ThemedText style={styles.emptyText}>
                Be the first to share your journey!
              </ThemedText>
            </View>
          )}
        </ScrollView>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  composeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  composeButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#000",
  },
  filtersContainer: {
    maxHeight: 50,
  },
  filtersContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterText: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
  },
  postCard: {
    margin: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  postMeta: {
    flex: 1,
  },
  postTime: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  gateTag: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gateTagText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#000",
  },
  postContent: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  mediaPlaceholder: {
    height: 200,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  mediaText: {
    fontSize: 24,
  },
  postActions: {
    flexDirection: "row",
    gap: 24,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionIcon: {
    fontSize: 18,
  },
  actionCount: {
    fontSize: 14,
    opacity: 0.7,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 40,
  },
  emptyText: {
    textAlign: "center",
    opacity: 0.7,
    marginTop: 12,
    marginBottom: 24,
  },
  loginButton: {
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});
