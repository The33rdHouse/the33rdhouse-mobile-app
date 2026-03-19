import { useState } from "react";
import { View, StyleSheet, ScrollView, Pressable, TextInput, Alert } from "react-native";
import { Stack } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";

interface VideoTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  duration: number; // seconds
  style: "quote" | "progress" | "realm" | "gate";
}

const TEMPLATES: VideoTemplate[] = [
  {
    id: "daily_quote",
    name: "Daily Wisdom",
    description: "Share a quote or insight with cosmic background",
    icon: "✨",
    duration: 15,
    style: "quote",
  },
  {
    id: "journey_progress",
    name: "Journey Progress",
    description: "Showcase your Gates and Realms progress",
    icon: "🚀",
    duration: 20,
    style: "progress",
  },
  {
    id: "realm_insight",
    name: "Realm Insight",
    description: "Share wisdom from a specific Realm",
    icon: "🔮",
    duration: 30,
    style: "realm",
  },
  {
    id: "gate_teaching",
    name: "Gate Teaching",
    description: "Teach about a specific Gate",
    icon: "🌟",
    duration: 45,
    style: "gate",
  },
];

export default function CreateVideoScreen() {
  const [selectedTemplate, setSelectedTemplate] = useState<VideoTemplate | null>(null);
  const [customText, setCustomText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");

  const handleGenerate = async () => {
    if (!selectedTemplate) {
      Alert.alert("Select Template", "Please select a video template first");
      return;
    }

    if (!customText.trim() && selectedTemplate.style === "quote") {
      Alert.alert("Add Content", "Please add some text for your video");
      return;
    }

    setIsGenerating(true);

    // Simulate video generation
    setTimeout(() => {
      setIsGenerating(false);
      Alert.alert(
        "Video Ready!",
        `Your ${selectedTemplate.name} video has been created. In a real implementation, this would use a video generation API like Remotion, FFmpeg, or a cloud service to create the actual video file.`,
        [
          {
            text: "OK",
            onPress: () => {
              setSelectedTemplate(null);
              setCustomText("");
            },
          },
        ]
      );
    }, 3000);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Create Video",
          headerShown: true,
        }}
      />
      <ThemedView style={styles.container}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedText type="title" style={styles.title}>
            Create Shareable Video
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Generate beautiful videos to share your 33rd House journey
          </ThemedText>

          {/* Template Selection */}
          <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
            Choose Template
          </ThemedText>
          <View style={styles.templatesGrid}>
            {TEMPLATES.map((template) => (
              <Pressable
                key={template.id}
                onPress={() => setSelectedTemplate(template)}
                style={[
                  styles.templateCard,
                  {
                    backgroundColor: cardBg,
                    borderColor: selectedTemplate?.id === template.id ? goldColor : "transparent",
                    borderWidth: selectedTemplate?.id === template.id ? 3 : 0,
                  },
                ]}
              >
                <ThemedText style={styles.templateIcon}>{template.icon}</ThemedText>
                <ThemedText type="defaultSemiBold" style={styles.templateName}>
                  {template.name}
                </ThemedText>
                <ThemedText style={styles.templateDescription}>{template.description}</ThemedText>
                <ThemedText style={styles.templateDuration}>{template.duration}s</ThemedText>
              </Pressable>
            ))}
          </View>

          {/* Custom Content Input */}
          {selectedTemplate && (
            <View style={styles.customSection}>
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Customize Content
              </ThemedText>

              {selectedTemplate.style === "quote" && (
                <>
                  <ThemedText style={styles.inputLabel}>Your Quote or Message</ThemedText>
                  <TextInput
                    style={[styles.textInput, { backgroundColor: cardBg, color: "#fff" }]}
                    placeholder="Enter your wisdom..."
                    placeholderTextColor="#888"
                    value={customText}
                    onChangeText={setCustomText}
                    multiline
                    maxLength={200}
                  />
                  <ThemedText style={styles.charCount}>
                    {customText.length} / 200 characters
                  </ThemedText>
                </>
              )}

              {selectedTemplate.style === "progress" && (
                <View style={[styles.previewCard, { backgroundColor: cardBg }]}>
                  <ThemedText style={styles.previewText}>
                    📊 Your progress will be automatically loaded:
                  </ThemedText>
                  <ThemedText style={styles.previewDetail}>• Current Gate</ThemedText>
                  <ThemedText style={styles.previewDetail}>• Realms Explored</ThemedText>
                  <ThemedText style={styles.previewDetail}>• Days on Journey</ThemedText>
                  <ThemedText style={styles.previewDetail}>• Completion %</ThemedText>
                </View>
              )}

              {selectedTemplate.style === "realm" && (
                <View style={[styles.previewCard, { backgroundColor: cardBg }]}>
                  <ThemedText style={styles.previewText}>
                    🔮 Select a Realm to feature (coming soon)
                  </ThemedText>
                </View>
              )}

              {selectedTemplate.style === "gate" && (
                <View style={[styles.previewCard, { backgroundColor: cardBg }]}>
                  <ThemedText style={styles.previewText}>
                    🌟 Select a Gate to teach (coming soon)
                  </ThemedText>
                </View>
              )}

              {/* Style Options */}
              <ThemedText type="defaultSemiBold" style={styles.sectionTitle}>
                Video Style
              </ThemedText>
              <View style={[styles.styleCard, { backgroundColor: cardBg }]}>
                <ThemedText style={styles.styleDetail}>• Cosmic purple/gold gradient background</ThemedText>
                <ThemedText style={styles.styleDetail}>• Animated text overlays</ThemedText>
                <ThemedText style={styles.styleDetail}>• 33rd House branding</ThemedText>
                <ThemedText style={styles.styleDetail}>• Smooth transitions</ThemedText>
                <ThemedText style={styles.styleDetail}>• Export as MP4 (1080x1920)</ThemedText>
              </View>

              {/* Generate Button */}
              <Pressable
                onPress={handleGenerate}
                disabled={isGenerating}
                style={[
                  styles.generateButton,
                  {
                    backgroundColor: isGenerating ? "#666" : goldColor,
                  },
                ]}
              >
                <ThemedText style={styles.generateButtonText}>
                  {isGenerating ? "Generating..." : "Generate Video"}
                </ThemedText>
              </Pressable>
            </View>
          )}
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
  title: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 16,
    marginTop: 24,
  },
  templatesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  templateCard: {
    width: "48%",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  templateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  templateName: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  templateDescription: {
    fontSize: 12,
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 8,
  },
  templateDuration: {
    fontSize: 11,
    opacity: 0.5,
  },
  customSection: {
    marginTop: 24,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    opacity: 0.9,
  },
  textInput: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: 12,
    opacity: 0.5,
    marginTop: 8,
    textAlign: "right",
  },
  previewCard: {
    padding: 16,
    borderRadius: 12,
  },
  previewText: {
    fontSize: 14,
    marginBottom: 12,
  },
  previewDetail: {
    fontSize: 13,
    opacity: 0.8,
    marginLeft: 8,
    marginBottom: 4,
  },
  styleCard: {
    padding: 16,
    borderRadius: 12,
  },
  styleDetail: {
    fontSize: 13,
    opacity: 0.8,
    marginBottom: 8,
  },
  generateButton: {
    marginTop: 32,
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  generateButtonText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
});
