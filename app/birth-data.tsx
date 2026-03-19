import { StyleSheet, TextInput, Pressable, ScrollView, Alert } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import type { BirthData } from "@/lib/astrology";

export default function BirthDataScreen() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const goldColor = useThemeColor({}, "gold");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    loadBirthData();
  }, []);

  const loadBirthData = async () => {
    try {
      const saved = await AsyncStorage.getItem("birthData");
      if (saved) {
        const data: BirthData = JSON.parse(saved);
        setDate(data.date);
        setTime(data.time);
        setLatitude(data.latitude.toString());
        setLongitude(data.longitude.toString());
      }
    } catch (error) {
      console.error("Failed to load birth data:", error);
    }
  };

  const handleSave = async () => {
    // Validate inputs
    if (!date || !time) {
      Alert.alert("Missing Information", "Please enter your birth date and time.");
      return;
    }

    // Validate date format (YYYY-MM-DD)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      Alert.alert("Invalid Date", "Please use format: YYYY-MM-DD (e.g., 1990-01-15)");
      return;
    }

    // Validate time format (HH:MM)
    if (!/^\d{2}:\d{2}$/.test(time)) {
      Alert.alert("Invalid Time", "Please use format: HH:MM (e.g., 14:30)");
      return;
    }

    const birthData: BirthData = {
      date,
      time,
      latitude: latitude ? parseFloat(latitude) : 0,
      longitude: longitude ? parseFloat(longitude) : 0,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    try {
      await AsyncStorage.setItem("birthData", JSON.stringify(birthData));
      Alert.alert("Success", "Birth data saved! The AI will now provide personalized astrology readings.");
      router.back();
    } catch (error) {
      console.error("Failed to save birth data:", error);
      Alert.alert("Error", "Failed to save birth data. Please try again.");
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Birth Data
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          Enter your birth information for personalized astrology readings
        </ThemedText>

        <ThemedView style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Birth Date *
          </ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor }]}
            placeholder="YYYY-MM-DD (e.g., 1990-01-15)"
            placeholderTextColor={textColor + "60"}
            value={date}
            onChangeText={setDate}
            keyboardType="numbers-and-punctuation"
          />
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Birth Time *
          </ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor }]}
            placeholder="HH:MM (e.g., 14:30)"
            placeholderTextColor={textColor + "60"}
            value={time}
            onChangeText={setTime}
            keyboardType="numbers-and-punctuation"
          />
          <ThemedText style={styles.hint}>Use 24-hour format</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Birth Location (Optional)
          </ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor }]}
            placeholder="City, Country"
            placeholderTextColor={textColor + "60"}
            value={location}
            onChangeText={setLocation}
          />
          <ThemedText style={styles.hint}>For more accurate rising sign calculation</ThemedText>
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Coordinates (Optional)
          </ThemedText>
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor }]}
            placeholder="Latitude (e.g., 40.7128)"
            placeholderTextColor={textColor + "60"}
            value={latitude}
            onChangeText={setLatitude}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, { color: textColor, borderColor: tintColor, marginTop: 8 }]}
            placeholder="Longitude (e.g., -74.0060)"
            placeholderTextColor={textColor + "60"}
            value={longitude}
            onChangeText={setLongitude}
            keyboardType="numeric"
          />
        </ThemedView>

        <Pressable
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: goldColor }]}
        >
          <ThemedText style={styles.saveButtonText}>Save Birth Data</ThemedText>
        </Pressable>

        <ThemedText style={styles.privacyNote}>
          🔒 Your birth data is stored locally on your device and never shared with third parties.
        </ThemedText>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 24,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    marginBottom: 12,
    fontSize: 16,
  },
  input: {
    fontSize: 16,
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
  },
  hint: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 4,
  },
  saveButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  privacyNote: {
    fontSize: 12,
    opacity: 0.6,
    textAlign: "center",
    marginBottom: 40,
  },
});
