import { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { useAuth } from "@/hooks/use-auth";
import { trpc } from "@/lib/trpc";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = parseInt(id);
  const { user } = useAuth();
  const [commentText, setCommentText] = useState("");

  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");
  const textColor = useThemeColor({}, "text");

  // Fetch post
  const { data: post, isLoading: postLoading } = trpc.genesis.getPost.useQuery({ postId });

  // Fetch comments
  const { data: comments, refetch: refetchComments } = trpc.genesis.getComments.useQuery({ postId });

  // Like mutation
  const likeMutation = trpc.genesis.toggleLike.useMutation();

  // Comment mutation
  const commentMutation = trpc.genesis.createComment.useMutation({
    onSuccess: () => {
      setCommentText("");
      refetchComments();
    },
  });

  const handleLike = () => {
    likeMutation.mutate({ targetType: "post", targetId: postId, reactionType: "heart" });
  };

  const handleComment = () => {
    if (commentText.trim()) {
      commentMutation.mutate({ postId, content: commentText.trim() });
    }
  };

  if (postLoading) {
    return (
      <ThemedView style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={goldColor} />
      </ThemedView>
    );
  }

  if (!post) {
    return (
      <ThemedView style={[styles.container, styles.centerContent]}>
        <ThemedText>Post not found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Post",
          headerShown: true,
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
      >
        <ScrollView>
          {/* Post Content */}
          <View style={[styles.postCard, { backgroundColor: cardBg }]}>
            <Pressable
              style={styles.postHeader}
              onPress={() => { /* User profile screen not yet implemented */ }}
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
              {post.gateTag !== null && (
                <View style={[styles.gateTag, { backgroundColor: goldColor }]}>
                  <ThemedText style={styles.gateTagText}>Gate {post.gateTag}</ThemedText>
                </View>
              )}
            </Pressable>

            <ThemedText style={styles.postContent}>{post.content}</ThemedText>

            {post.mediaUrl && (
              <View style={[styles.mediaPlaceholder, { backgroundColor: "#333" }]}>
                <ThemedText style={styles.mediaText}>📷 Media</ThemedText>
              </View>
            )}

            <View style={styles.postActions}>
              <Pressable style={styles.actionButton} onPress={handleLike}>
                <ThemedText style={styles.actionIcon}>
                  {post.likesCount > 0 ? "❤️" : "🤍"}
                </ThemedText>
                <ThemedText style={styles.actionCount}>{post.likesCount}</ThemedText>
              </Pressable>
              <View style={styles.actionButton}>
                <ThemedText style={styles.actionIcon}>💬</ThemedText>
                <ThemedText style={styles.actionCount}>{post.commentsCount}</ThemedText>
              </View>
            </View>
          </View>

          {/* Comments Section */}
          <View style={styles.commentsSection}>
            <ThemedText type="subtitle" style={styles.commentsTitle}>
              Comments ({comments?.length || 0})
            </ThemedText>

            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <View key={comment.id} style={[styles.commentCard, { backgroundColor: cardBg }]}>
                  <Pressable
                    style={styles.commentHeader}
                    onPress={() => { /* User profile screen not yet implemented */ }}
                  >
                    <View style={[styles.smallAvatar, { backgroundColor: tintColor }]}>
                      <ThemedText style={styles.smallAvatarText}>U</ThemedText>
                    </View>
                    <View style={styles.commentMeta}>
                      <ThemedText type="defaultSemiBold">User {comment.userId}</ThemedText>
                      <ThemedText style={styles.commentTime}>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </ThemedText>
                    </View>
                  </Pressable>
                  <ThemedText style={styles.commentContent}>{comment.content}</ThemedText>
                  <View style={styles.commentActions}>
                    <Pressable
                      style={styles.commentAction}
                      onPress={() => {
                        likeMutation.mutate({
                          targetType: "comment",
                          targetId: comment.id,
                          reactionType: "heart",
                        });
                      }}
                    >
                      <ThemedText style={styles.commentActionText}>
                        {comment.likesCount > 0 ? "❤️" : "🤍"} {comment.likesCount}
                      </ThemedText>
                    </Pressable>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyComments}>
                <ThemedText style={styles.emptyText}>No comments yet. Be the first!</ThemedText>
              </View>
            )}
          </View>

          <View style={{ height: 100 }} />
        </ScrollView>

        {/* Comment Input */}
        <View style={[styles.commentInput, { backgroundColor: cardBg }]}>
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder="Write a comment..."
            placeholderTextColor={textColor + "80"}
            value={commentText}
            onChangeText={setCommentText}
            multiline
            maxLength={1000}
          />
          <Pressable
            style={[
              styles.sendButton,
              { backgroundColor: commentText.trim() ? goldColor : cardBg },
            ]}
            onPress={handleComment}
            disabled={!commentText.trim() || commentMutation.isPending}
          >
            <ThemedText
              style={[
                styles.sendButtonText,
                commentText.trim() ? { color: "#000" } : { opacity: 0.5 },
              ]}
            >
              {commentMutation.isPending ? "..." : "Send"}
            </ThemedText>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  postCard: {
    padding: 20,
    marginBottom: 8,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 20,
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
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  gateTagText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#000",
  },
  postContent: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  mediaPlaceholder: {
    height: 200,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  mediaText: {
    fontSize: 24,
  },
  postActions: {
    flexDirection: "row",
    gap: 24,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  actionIcon: {
    fontSize: 20,
  },
  actionCount: {
    fontSize: 14,
    opacity: 0.8,
  },
  commentsSection: {
    padding: 20,
  },
  commentsTitle: {
    marginBottom: 16,
  },
  commentCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  commentHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  smallAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  smallAvatarText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  commentMeta: {
    flex: 1,
  },
  commentTime: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 2,
  },
  commentContent: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 8,
  },
  commentActions: {
    flexDirection: "row",
    gap: 16,
  },
  commentAction: {
    paddingVertical: 4,
  },
  commentActionText: {
    fontSize: 12,
    opacity: 0.8,
  },
  emptyComments: {
    paddingVertical: 32,
    alignItems: "center",
  },
  emptyText: {
    opacity: 0.5,
  },
  commentInput: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  input: {
    flex: 1,
    fontSize: 14,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
  },
  sendButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
});
