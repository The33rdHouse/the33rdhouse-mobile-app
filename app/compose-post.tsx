import { useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Stack, router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { trpc } from "@/lib/trpc";

export default function ComposePostScreen() {
  const [content, setContent] = useState("");
  const [privacy, setPrivacy] = useState<"public" | "private" | "friends">("public");
  const [gateTag, setGateTag] = useState<number | null>(null);

  const cardBg = useThemeColor({}, "card");
  const goldColor = useThemeColor({}, "gold");

  const createPost = trpc.genesis.createPost.useMutation({
    onSuccess: () => {
      Alert.alert("Success", "Your post has been published!");
      router.back();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const handlePost = () => {
    if (!content.trim()) {
      Alert.alert("Error", "Please write something before posting");
      return;
    }

    createPost.mutate({
      content: content.trim(),
      privacy,
      gateTag: gateTag ?? undefined,
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Post",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          {/* Content Input */}
          <TextInput
            style={[styles.textInput, { backgroundColor: cardBg, color: "#fff" }]}
            placeholder="Share your journey, insights, or questions..."
            placeholderTextColor="#888"
            value={content}
            onChangeText={setContent}
            multiline
            maxLength={5000}
            autoFocus
          />
          <ThemedText style={styles.charCount}>{content.length} / 5000</ThemedText>

          {/* Privacy Selection */}
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Privacy
          </ThemedText>
          <View style={styles.optionsRow}>
            {(["public", "private", "friends"] as const).map((option) => (
              <Pressable
                key={option}
                onPress={() => setPrivacy(option)}
                style={[
                  styles.optionChip,
                  {
                    backgroundColor: privacy === option ? goldColor : cardBg,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.optionText,
                    privacy === option && { color: "#000", fontWeight: "700" },
                  ]}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </ThemedText>
              </Pressable>
            ))}
          </View>

          {/* Gate Tag Selection */}
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Gate Tag (Optional)
          </ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.gateTagsContainer}
          >
            <Pressable
              onPress={() => setGateTag(null)}
              style={[
                styles.gateTagChip,
                {
                  backgroundColor: gateTag === null ? goldColor : cardBg,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.gateTagText,
                  gateTag === null && { color: "#000", fontWeight: "700" },
                ]}
              >
                None
              </ThemedText>
            </Pressable>

            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((gate) => (
              <Pressable
                key={gate}
                onPress={() => setGateTag(gate)}
                style={[
                  styles.gateTagChip,
                  {
                    backgroundColor: gateTag === gate ? goldColor : cardBg,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.gateTagText,
                    gateTag === gate && { color: "#000", fontWeight: "700" },
                  ]}
                >
                  Gate {gate}
                </ThemedText>
              </Pressable>
            ))}
          </ScrollView>

          {/* Post Button */}
          <Pressable
            onPress={handlePost}
            disabled={createPost.isPending}
            style={[
              styles.postButton,
              {
                backgroundColor: createPost.isPending ? "#666" : goldColor,
              },
            ]}
          >
            {createPost.isPending ? (
              <ActivityIndicator color="#000" />
            ) : (
              <ThemedText style={styles.postButtonText}>Publish Post</ThemedText>
            )}
          </Pressable>
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
  textInput: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    minHeight: 200,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    opacity: 0.5,
    textAlign: "right",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
  },
  optionsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  optionChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  optionText: {
    fontSize: 14,
  },
  gateTagsContainer: {
    gap: 8,
    marginBottom: 32,
  },
  gateTagChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  gateTagText: {
    fontSize: 13,
  },
  postButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 16,
  },
  postButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
