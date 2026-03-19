import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Configure how notifications are handled when app is in foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationSettings {
  checkInReminders: boolean;
  badgeUnlocks: boolean;
  astrologyAlerts: boolean;
  morningCheckInTime: string; // HH:MM format
  eveningCheckInTime: string; // HH:MM format
}

const DEFAULT_SETTINGS: NotificationSettings = {
  checkInReminders: true,
  badgeUnlocks: true,
  astrologyAlerts: true,
  morningCheckInTime: "08:00",
  eveningCheckInTime: "20:00",
};

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === "granted";
}

export async function getNotificationSettings(): Promise<NotificationSettings> {
  try {
    const settings = await AsyncStorage.getItem("notificationSettings");
    return settings ? JSON.parse(settings) : DEFAULT_SETTINGS;
  } catch (error) {
    console.error("Failed to load notification settings:", error);
    return DEFAULT_SETTINGS;
  }
}

export async function saveNotificationSettings(settings: NotificationSettings): Promise<void> {
  try {
    await AsyncStorage.setItem("notificationSettings", JSON.stringify(settings));
    // Reschedule notifications with new settings
    await scheduleAllNotifications();
  } catch (error) {
    console.error("Failed to save notification settings:", error);
  }
}

export async function scheduleAllNotifications(): Promise<void> {
  // Cancel all existing notifications
  await Notifications.cancelAllScheduledNotificationsAsync();

  const settings = await getNotificationSettings();

  // Schedule check-in reminders
  if (settings.checkInReminders) {
    await scheduleDailyCheckInReminders(settings.morningCheckInTime, settings.eveningCheckInTime);
  }
}

async function scheduleDailyCheckInReminders(
  morningTime: string,
  eveningTime: string
): Promise<void> {
  const [morningHour, morningMinute] = morningTime.split(":").map(Number);
  const [eveningHour, eveningMinute] = eveningTime.split(":").map(Number);

  // Morning check-in
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🌅 Morning Check-In",
      body: "Start your day with intention. How are you feeling?",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: morningHour,
      minute: morningMinute,
    } as any,
  });

  // Evening check-in
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🌙 Evening Reflection",
      body: "Take a moment to reflect on your day's journey.",
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: eveningHour,
      minute: eveningMinute,
    } as any,
  });
}

export async function sendBadgeUnlockNotification(
  badgeName: string,
  rarity: string
): Promise<void> {
  const settings = await getNotificationSettings();
  if (!settings.badgeUnlocks) return;

  const rarityEmoji = {
    Common: "⭐",
    Rare: "💎",
    Epic: "🔥",
    Legendary: "👑",
  }[rarity] || "⭐";

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${rarityEmoji} Badge Unlocked!`,
      body: `You've earned the "${badgeName}" badge!`,
      sound: true,
    },
    trigger: null, // Send immediately
  });
}

export async function sendGateCompletionNotification(
  gateNumber: number,
  gateName: string
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🎉 Gate Completed!",
      body: `Congratulations! You've completed Gate ${gateNumber}: ${gateName}`,
      sound: true,
    },
    trigger: null,
  });
}

export async function sendOptimalPracticeTimeNotification(
  moonPhase: string,
  recommendation: string
): Promise<void> {
  const settings = await getNotificationSettings();
  if (!settings.astrologyAlerts) return;

  const phaseEmoji = {
    "New Moon": "🌑",
    "Waxing Crescent": "🌒",
    "First Quarter": "🌓",
    "Waxing Gibbous": "🌔",
    "Full Moon": "🌕",
    "Waning Gibbous": "🌖",
    "Last Quarter": "🌗",
    "Waning Crescent": "🌘",
  }[moonPhase] || "🌙";

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `${phaseEmoji} Optimal Practice Time`,
      body: `${moonPhase}: ${recommendation}`,
      sound: true,
    },
    trigger: null,
  });
}

export async function sendZodiacTransitNotification(
  zodiacSign: string,
  message: string
): Promise<void> {
  const settings = await getNotificationSettings();
  if (!settings.astrologyAlerts) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `♈ ${zodiacSign} Transit`,
      body: message,
      sound: true,
    },
    trigger: null,
  });
}

// Initialize notifications on app start
export async function initializeNotifications(): Promise<void> {
  const hasPermission = await requestNotificationPermissions();
  if (hasPermission) {
    await scheduleAllNotifications();
  }
}
