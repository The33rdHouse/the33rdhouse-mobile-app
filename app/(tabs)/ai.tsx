import {
  StyleSheet,
  ScrollView,
  View,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { trpc } from "@/lib/trpc";
import * as Speech from "expo-speech";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIAssistantScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const chatMutation = trpc.ai.chat.useMutation();

  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    loadChatHistory();
    // Send welcome message if first time
    AsyncStorage.getItem("aiWelcomeSent").then((sent) => {
      if (!sent) {
        setTimeout(() => {
          addAssistantMessage(
            "Welcome to 33H-AI Intelligence. I'm your consciousness transformation guide. I can help you with:\n\n• Assess your current state\n• Recommend practices\n• Predict your journey\n• Answer questions about Gates and Realms\n\nHow can I assist you today?"
          );
          AsyncStorage.setItem("aiWelcomeSent", "true");
        }, 500);
      }
    });
  }, []);

  const loadChatHistory = async () => {
    try {
      const saved = await AsyncStorage.getItem("aiChatHistory");
      if (saved) {
        const parsed = JSON.parse(saved);
        setMessages(
          parsed.map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          }))
        );
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  };

  const saveChatHistory = async (newMessages: Message[]) => {
    try {
      await AsyncStorage.setItem("aiChatHistory", JSON.stringify(newMessages));
    } catch (error) {
      console.error("Failed to save chat history:", error);
    }
  };

  const addAssistantMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "assistant",
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => {
      const updated = [...prev, newMessage];
      saveChatHistory(updated);
      return updated;
    });
    setIsTyping(false);
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      // Load user context
      const gateProgress = await AsyncStorage.getItem("gateProgress");
      const explored = await AsyncStorage.getItem("exploredRealms");
      const startDate = await AsyncStorage.getItem("journeyStartDate");
      const birthDataStr = await AsyncStorage.getItem("birthData");

      let progress = 0;
      let realmsExplored = 0;
      let daysOnJourney = 0;

      if (gateProgress) {
        const gates = JSON.parse(gateProgress);
        progress = Math.round(
          gates.reduce((sum: number, g: any) => sum + g.completion, 0) / gates.length
        );
      }

      if (explored) {
        realmsExplored = JSON.parse(explored).length;
      }

      if (startDate) {
        const start = new Date(startDate);
        const now = new Date();
        daysOnJourney = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      }

      // Parse birth data if available
      let birthData = undefined;
      if (birthDataStr) {
        birthData = JSON.parse(birthDataStr);
      }

      // Call OpenAI API via tRPC
      const result = await chatMutation.mutateAsync({
        messages: messages
          .filter((m) => m.role !== "assistant" || m.content !== "AI is thinking...")
          .map((m) => ({
            role: m.role,
            content: m.content,
          })),
        userContext: {
          currentGate: 1,
          realmsExplored,
          daysOnJourney,
          progress,
        },
        birthData,
      });

      return result.message;
    } catch (error) {
      console.error("AI response error:", error);
      return "I'm having trouble connecting right now. Please try again in a moment.";
    }
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => {
      const updated = [...prev, userMessage];
      saveChatHistory(updated);
      return updated;
    });
    setInputText("");
    setIsTyping(true);

    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);

    // Generate AI response
    const response = await generateAIResponse(userMessage.content);
    addAssistantMessage(response);

    // Scroll to bottom again after response
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const clearHistory = async () => {
    setMessages([]);
    await AsyncStorage.removeItem("aiChatHistory");
    await AsyncStorage.removeItem("aiWelcomeSent");
  };

  const handleVoiceInput = async () => {
    // Note: expo-speech only supports text-to-speech, not speech-to-text
    // For real speech recognition, we'd need expo-speech-recognition or a cloud API
    // For now, show a placeholder message
    Alert.alert(
      "Voice Input",
      "Voice input requires additional setup with a speech recognition service. For now, please type your message.",
      [{ text: "OK" }]
    );
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={90}
      >
        <ThemedView style={styles.header}>
          <ThemedText type="title">AI Assistant</ThemedText>
          <Pressable onPress={clearHistory}>
            <ThemedText style={styles.clearButton}>Clear</ThemedText>
          </Pressable>
        </ThemedView>

        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
        >
          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageBubble,
                message.role === "user"
                  ? [styles.userBubble, { backgroundColor: tintColor }]
                  : [styles.assistantBubble, { backgroundColor: cardBg }],
              ]}
            >
              <ThemedText
                style={[
                  styles.messageText,
                  message.role === "user" && styles.userMessageText,
                ]}
              >
                {message.content}
              </ThemedText>
              <ThemedText
                style={[
                  styles.timestamp,
                  message.role === "user" && styles.userTimestamp,
                ]}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </ThemedText>
            </View>
          ))}

          {isTyping && (
            <View style={[styles.messageBubble, styles.assistantBubble, { backgroundColor: cardBg }]}>
              <ThemedText style={styles.typingText}>AI is thinking...</ThemedText>
            </View>
          )}
        </ScrollView>

        <View style={[styles.inputContainer, { backgroundColor: cardBg }]}>
          <TextInput
            style={[styles.input, { color: textColor }]}
            placeholder="Ask me anything..."
            placeholderTextColor={textColor + "80"}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <Pressable
            onPress={handleVoiceInput}
            style={[
              styles.micButton,
              { backgroundColor: isListening ? "#FF3B30" : "#666" },
            ]}
            disabled={isTyping}
          >
            <ThemedText style={styles.micButtonText}>{isListening ? "🔴" : "🎤"}</ThemedText>
          </Pressable>
          <Pressable
            onPress={handleSend}
            style={[
              styles.sendButton,
              { backgroundColor: inputText.trim() ? goldColor : "#666" },
            ]}
            disabled={!inputText.trim()}
          >
            <IconSymbol name="paperplane.fill" size={20} color="#fff" />
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
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  clearButton: {
    fontSize: 14,
    opacity: 0.7,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    gap: 12,
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 20,
  },
  userMessageText: {
    color: "#fff",
  },
  timestamp: {
    fontSize: 11,
    opacity: 0.6,
    marginTop: 4,
  },
  userTimestamp: {
    color: "#fff",
  },
  typingText: {
    fontSize: 14,
    fontStyle: "italic",
    opacity: 0.7,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    padding: 12,
    gap: 8,
  },
  input: {
    flex: 1,
    fontSize: 15,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  micButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  micButtonText: {
    fontSize: 20,
  },
});
