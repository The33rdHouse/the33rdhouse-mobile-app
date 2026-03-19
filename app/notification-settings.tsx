import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Switch, Pressable, Platform } from "react-native";
import { router } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import {
  getNotificationSettings,
  saveNotificationSettings,
  requestNotificationPermissions,
  type NotificationSettings,
} from "@/lib/notification-manager";

export default function NotificationSettingsScreen() {
  const [settings, setSettings] = useState<NotificationSettings>({
    checkInReminders: true,
    badgeUnlocks: true,
    astrologyAlerts: true,
    morningCheckInTime: "08:00",
    eveningCheckInTime: "20:00",
  });
  const [hasPermission, setHasPermission] = useState(false);

  const cardBg = useThemeColor({}, "card");
  const tintColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");

  useEffect(() => {
    loadSettings();
    checkPermissions();
  }, []);

  const loadSettings = async () => {
    const saved = await getNotificationSettings();
    setSettings(saved);
  };

  const checkPermissions = async () => {
    const granted = await requestNotificationPermissions();
    setHasPermission(granted);
  };

  const handleToggle = async (key: keyof NotificationSettings, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveNotificationSettings(newSettings);
  };

  const handleTimeChange = async (key: "morningCheckInTime" | "eveningCheckInTime", value: string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveNotificationSettings(newSettings);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backButton}>
            <ThemedText style={styles.backText}>← Back</ThemedText>
          </Pressable>
          <ThemedText type="title">Notification Settings</ThemedText>
          <ThemedText style={styles.subtitle}>Manage your reminders and alerts</ThemedText>
        </View>

        {!hasPermission && (
          <View style={[styles.warningCard, { backgroundColor: "rgba(255, 59, 48, 0.2)" }]}>
            <ThemedText style={styles.warningText}>
              ⚠️ Notifications are disabled. Please enable them in your device settings to receive reminders.
            </ThemedText>
            <Pressable
              style={[styles.button, { backgroundColor: tintColor }]}
              onPress={checkPermissions}
            >
              <ThemedText style={styles.buttonText}>Request Permission</ThemedText>
            </Pressable>
          </View>
        )}

        <View style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Daily Check-Ins</ThemedText>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <ThemedText type="defaultSemiBold">Check-In Reminders</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Get reminded to complete your morning and evening check-ins
              </ThemedText>
            </View>
            <Switch
              value={settings.checkInReminders}
              onValueChange={(value) => handleToggle("checkInReminders", value)}
              trackColor={{ false: "#767577", true: tintColor }}
              thumbColor="#fff"
            />
          </View>

          {settings.checkInReminders && (
            <>
              <View style={styles.timeRow}>
                <ThemedText>Morning Check-In</ThemedText>
                <Pressable
                  style={[styles.timePicker, { backgroundColor: cardBg, borderColor: textColor + "40" }]}
                  onPress={() => {
                    // In a real app, this would open a time picker
                    // For now, just show a placeholder
                  }}
                >
                  <ThemedText>{settings.morningCheckInTime}</ThemedText>
                </Pressable>
              </View>

              <View style={styles.timeRow}>
                <ThemedText>Evening Check-In</ThemedText>
                <Pressable
                  style={[styles.timePicker, { backgroundColor: cardBg, borderColor: textColor + "40" }]}
                  onPress={() => {
                    // In a real app, this would open a time picker
                  }}
                >
                  <ThemedText>{settings.eveningCheckInTime}</ThemedText>
                </Pressable>
              </View>
            </>
          )}
        </View>

        <View style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Achievements</ThemedText>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <ThemedText type="defaultSemiBold">Badge Unlocks</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Get notified when you unlock new badges
              </ThemedText>
            </View>
            <Switch
              value={settings.badgeUnlocks}
              onValueChange={(value) => handleToggle("badgeUnlocks", value)}
              trackColor={{ false: "#767577", true: tintColor }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: cardBg }]}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>Astrology & Timing</ThemedText>
          
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <ThemedText type="defaultSemiBold">Astrology Alerts</ThemedText>
              <ThemedText style={styles.settingDescription}>
                Receive notifications about optimal practice times, moon phases, and zodiac transits
              </ThemedText>
            </View>
            <Switch
              value={settings.astrologyAlerts}
              onValueChange={(value) => handleToggle("astrologyAlerts", value)}
              trackColor={{ false: "#767577", true: tintColor }}
              thumbColor="#fff"
            />
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: cardBg }]}>
          <ThemedText style={styles.infoText}>
            💡 Tip: Notifications are designed to support your practice without being intrusive. You can adjust these settings anytime.
          </ThemedText>
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
  backButton: {
    marginBottom: 16,
  },
  backText: {
    fontSize: 16,
    opacity: 0.8,
  },
  subtitle: {
    marginTop: 4,
    opacity: 0.7,
  },
  warningCard: {
    margin: 20,
    padding: 16,
    borderRadius: 12,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  section: {
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 16,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingDescription: {
    fontSize: 12,
    opacity: 0.7,
    marginTop: 4,
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
  },
  timePicker: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  infoCard: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 20,
    opacity: 0.8,
  },
});
