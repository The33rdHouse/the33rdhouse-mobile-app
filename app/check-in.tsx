import { useState, useEffect } from "react";
import { View, StyleSheet, Pressable, ScrollView, TextInput } from "react-native";
import { useRouter, Stack } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useThemeColor } from "@/hooks/use-theme-color";

type CheckInType = "morning" | "evening";

const MORNING_QUESTIONS = [
  "How are you feeling this morning? (1-10)",
  "What energy level do you have today? (1-10)",
  "What's your intention for today?",
  "Which Gate or Realm are you working with?",
  "What practice will you commit to today?",
];

const EVENING_QUESTIONS = [
  "How was your day overall? (1-10)",
  "What did you learn or discover today?",
  "Did you complete your intended practice?",
  "What shadow patterns showed up today?",
  "What are you grateful for?",
];

export default function CheckInScreen() {
  const [checkInType, setCheckInType] = useState<CheckInType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const tintColor = useThemeColor({}, "tint");
  const cardBg = useThemeColor({}, "card");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    loadStreak();
  }, []);

  const loadStreak = async () => {
    try {
      const streakData = await AsyncStorage.getItem("check_in_streak");
      if (streakData) {
        setStreak(parseInt(streakData));
      }
    } catch (error) {
      console.error("Error loading streak:", error);
    }
  };

  const handleStart = (type: CheckInType) => {
    setCheckInType(type);
    setCurrentQuestion(0);
    setAnswers([]);
    setCurrentAnswer("");
  };

  const handleNext = () => {
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    setCurrentAnswer("");

    const questions = checkInType === "morning" ? MORNING_QUESTIONS : EVENING_QUESTIONS;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleComplete(newAnswers);
    }
  };

  const handleComplete = async (finalAnswers: string[]) => {
    setLoading(true);
    try {
      const checkIn = {
        type: checkInType,
        date: new Date().toISOString(),
        answers: finalAnswers,
      };

      // Save check-in
      const history = await AsyncStorage.getItem("check_in_history");
      const checkIns = history ? JSON.parse(history) : [];
      checkIns.push(checkIn);
      await AsyncStorage.setItem("check_in_history", JSON.stringify(checkIns));

      // Update streak
      const newStreak = streak + 1;
      await AsyncStorage.setItem("check_in_streak", String(newStreak));
      setStreak(newStreak);

      // Show completion
      setCheckInType(null);
      setCurrentQuestion(0);
      setAnswers([]);
      
      // Navigate back
      router.back();
    } catch (error) {
      console.error("Error saving check-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    router.back();
  };

  const questions = checkInType === "morning" ? MORNING_QUESTIONS : EVENING_QUESTIONS;
  const progress = checkInType ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      <Stack.Screen
        options={{
          title: "Daily Check-In",
          headerShown: true,
        }}
      />
      <ThemedView
        style={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, 20),
          },
        ]}
      >
        {!checkInType ? (
          /* Selection Screen */
          <ScrollView contentContainerStyle={styles.selectionContainer}>
            <ThemedText type="title" style={styles.title}>
              Daily Check-In
            </ThemedText>
            <ThemedText style={styles.subtitle}>
              Track your journey with morning intentions and evening reflections
            </ThemedText>

            {streak > 0 && (
              <View style={[styles.streakBadge, { backgroundColor: tintColor }]}>
                <ThemedText style={styles.streakText}>🔥 {streak} Day Streak!</ThemedText>
              </View>
            )}

            <View style={styles.optionsContainer}>
              <Pressable
                style={[styles.optionCard, { backgroundColor: cardBg }]}
                onPress={() => handleStart("morning")}
              >
                <ThemedText style={styles.optionIcon}>🌅</ThemedText>
                <ThemedText type="subtitle">Morning Check-In</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Set your intention and energy for the day ahead
                </ThemedText>
              </Pressable>

              <Pressable
                style={[styles.optionCard, { backgroundColor: cardBg }]}
                onPress={() => handleStart("evening")}
              >
                <ThemedText style={styles.optionIcon}>🌙</ThemedText>
                <ThemedText type="subtitle">Evening Reflection</ThemedText>
                <ThemedText style={styles.optionDescription}>
                  Reflect on your day, lessons learned, and gratitude
                </ThemedText>
              </Pressable>
            </View>

            <Pressable style={styles.skipButton} onPress={handleSkip}>
              <ThemedText style={styles.skipText}>Maybe Later</ThemedText>
            </Pressable>
          </ScrollView>
        ) : (
          /* Question Flow */
          <View style={styles.questionContainer}>
            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <View style={[styles.progressBar, { width: `${progress}%`, backgroundColor: tintColor }]} />
            </View>

            <ScrollView contentContainerStyle={styles.questionContent}>
              <ThemedText style={styles.questionNumber}>
                Question {currentQuestion + 1} of {questions.length}
              </ThemedText>
              <ThemedText type="title" style={styles.question}>
                {questions[currentQuestion]}
              </ThemedText>

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: cardBg,
                    color: textColor,
                    borderColor: tintColor,
                  },
                ]}
                placeholder="Your answer..."
                placeholderTextColor={textColor + "80"}
                value={currentAnswer}
                onChangeText={setCurrentAnswer}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </ScrollView>

            {/* Action Buttons */}
            <View style={styles.actionButtons}>
              <Pressable
                style={[
                  styles.nextButton,
                  {
                    backgroundColor: currentAnswer.trim() ? tintColor : "#666",
                  },
                ]}
                onPress={handleNext}
                disabled={!currentAnswer.trim() || loading}
              >
                <ThemedText style={styles.nextButtonText}>
                  {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                </ThemedText>
              </Pressable>
            </View>
          </View>
        )}
      </ThemedView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectionContainer: {
    padding: 24,
    paddingTop: 40,
  },
  title: {
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    textAlign: "center",
    opacity: 0.7,
    marginBottom: 32,
  },
  streakBadge: {
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 32,
  },
  streakText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  optionsContainer: {
    gap: 16,
  },
  optionCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  optionIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  optionDescription: {
    textAlign: "center",
    opacity: 0.7,
    marginTop: 8,
  },
  skipButton: {
    marginTop: 32,
    padding: 16,
    alignItems: "center",
  },
  skipText: {
    opacity: 0.6,
  },
  questionContainer: {
    flex: 1,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: "rgba(0,0,0,0.1)",
  },
  progressBar: {
    height: "100%",
  },
  questionContent: {
    padding: 24,
    flex: 1,
  },
  questionNumber: {
    fontSize: 14,
    opacity: 0.6,
    marginBottom: 16,
  },
  question: {
    marginBottom: 32,
  },
  input: {
    padding: 16,
    borderRadius: 12,
    fontSize: 16,
    minHeight: 120,
    borderWidth: 2,
  },
  actionButtons: {
    padding: 24,
  },
  nextButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
