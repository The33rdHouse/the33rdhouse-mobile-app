# Expo Mobile Template

A React Native mobile app template built with **Expo SDK 54**, **TypeScript**, and **React 19**. This template provides everything you need to build beautiful, performant iOS-style mobile applications.

**Tech Stack:** React Native 0.81 | Expo Router 6 | TypeScript 5.9 | react-native-reanimated 4.x

---

## Quick Start

1. **Pick a visual style first** — Decide a palette, typography scale, corner radius, and component style (see **Design Guidelines** below)
2. **Customize theme and branding** — Edit colors in `constants/theme.ts` and update app details in `app.config.ts`
3. **Edit the home screen** — `app/(tabs)/index.tsx` is your app's main entry point
4. **Add new tabs and screens** — Create files in `app/(tabs)/` and configure in `_layout.tsx`

---

## Project Structure

```
app/
  (tabs)/
    _layout.tsx      ← Tab bar configuration
    index.tsx        ← Home screen (EDIT THIS FIRST)
  modal.tsx          ← Modal screen example
  oauth/             ← Auth callback (don't modify)
components/
  themed-text.tsx    ← Text with dark/light mode
  themed-view.tsx    ← View with dark/light mode
  ui/
    icon-symbol.tsx  ← Tab bar icon mapping
constants/
  theme.ts           ← Colors and fonts
hooks/
  use-auth.ts        ← Auth state hook
  use-theme-color.ts ← Theme color hook
lib/
  trpc.ts            ← API client
assets/images/       ← App icons and splash
```

---

## Mobile Design Guidelines

Avoid "AI slop", meaning no generic pastel palettes, excessive card grids, or purple/blue gradients.

- **Palette**: 1 accent + 3 text levels (primary/secondary/disabled) + 2-3 surfaces (bg/card/elevated).
- **Typography**: 4-5 sizes (title 32 → body 16 → caption 12). lineHeight ≥ 1.3× fontSize. Body min 14pt.
- **Spacing**: 8pt grid. Use consistent increments (8, 12, 16, 24, 32). Avoid arbitrary values.
- **Layout**: Primary actions in thumb zone (bottom 1/3). Touch targets ≥ 44pt. Respect safe areas.
- **Radius**: Buttons 8-12, Cards 12-16, Sheets 16-24. Pick 1-2 values; stay consistent.
- **Navigation**: Bottom tabs for top-level only. No tab-in-tab. Use segmented control (2-3) or chips (3-5) for filters.
- **Icons**: Tab bar 24-28pt, buttons 20-24pt. All filled OR all outline—never mixed.

---

## UI Components

### ThemedText

Use `ThemedText` for all text to automatically support dark/light mode:

```tsx
<ThemedText type="title">Large Title</ThemedText>
<ThemedText type="subtitle">Section Header</ThemedText>
<ThemedText type="default">Body text</ThemedText>
<ThemedText type="defaultSemiBold">Bold text</ThemedText>
<ThemedText type="link">Tappable link</ThemedText>
```

### ThemedView

Use `ThemedView` for containers that need themed backgrounds:

```tsx
<ThemedView style={styles.container}>
  <ThemedText>Content with themed background</ThemedText>
</ThemedView>
```

### Safe Area Handling

**Always use safe area insets** for modals, full-screen content, and bottom sheets:

```tsx
import { useSafeAreaInsets } from "react-native-safe-area-context";

function MyScreen() {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={{
      paddingTop: Math.max(insets.top, 20),
      paddingBottom: Math.max(insets.bottom, 20),
      paddingLeft: Math.max(insets.left, 20),
      paddingRight: Math.max(insets.right, 20),
    }}>
      {/* Content */}
    </View>
  );
}
```

---

## Tab Navigation

### Adding a New Tab

1. Create the screen file in `app/(tabs)/`:

```tsx
// app/(tabs)/settings.tsx
export default function SettingsScreen() {
  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText type="title">Settings</ThemedText>
    </ThemedView>
  );
}
```

2. **Add icon mapping first** in `components/ui/icon-symbol.tsx`:

```tsx
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  // Add your new icon:
  "gearshape.fill": "settings",
};
```

3. Configure the tab in `app/(tabs)/_layout.tsx`:

```tsx
<Tabs.Screen
  name="settings"
  options={{
    title: "Settings",
    tabBarIcon: ({ color }) => (
      <IconSymbol size={28} name="gearshape.fill" color={color} />
    ),
  }}
/>
```

### Common Icon Mappings

| SF Symbol | Material Icon | Use Case |
|-----------|---------------|----------|
| `gearshape.fill` | `settings` | Settings |
| `person.fill` | `person` | Profile |
| `magnifyingglass` | `search` | Search |
| `bell.fill` | `notifications` | Notifications |
| `heart.fill` | `favorite` | Favorites |
| `plus` | `add` | Create/Add |
| `trash.fill` | `delete` | Delete |
| `bookmark.fill` | `bookmark` | Bookmarks |

---

## Theme Customization

Edit `constants/theme.ts` to customize your app's colors:

```tsx
export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: "#007AFF",        // Primary color
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: "#007AFF",
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: "#fff",
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: "#fff",
  },
};
```

Use themed colors in your components:

```tsx
import { useThemeColor } from "@/hooks/use-theme-color";

function MyComponent() {
  const primaryColor = useThemeColor({}, "tint");
  const textColor = useThemeColor({}, "text");
  
  return (
    <View style={{ backgroundColor: primaryColor }}>
      <Text style={{ color: textColor }}>Themed content</Text>
    </View>
  );
}
```

---

## Local Data Storage

For apps that don't need cloud sync, use `AsyncStorage` for local persistence:

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

// Save data
await AsyncStorage.setItem("user_settings", JSON.stringify(settings));

// Load data
const data = await AsyncStorage.getItem("user_settings");
const settings = data ? JSON.parse(data) : defaultSettings;

// Delete data
await AsyncStorage.removeItem("user_settings");
```

### Custom Storage Hook

```tsx
function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(key).then((data) => {
      if (data) setValue(JSON.parse(data));
      setLoading(false);
    });
  }, [key]);

  const save = async (newValue: T) => {
    setValue(newValue);
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
  };

  return { value, save, loading };
}

// Usage
const { value: count, save: setCount } = useLocalStorage("tap_count", 0);
```

---

## Common UI Patterns

### Grid Layout

```tsx
<View style={{ flexDirection: "row", flexWrap: "wrap" }}>
  {items.map((item) => (
    <View key={item.id} style={{ width: "33.33%", padding: 8 }}>
      <Card item={item} />
    </View>
  ))}
</View>
```

### Progress Ring

```tsx
import Svg, { Circle } from "react-native-svg";

function ProgressRing({ progress, size = 120, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <Svg width={size} height={size}>
      {/* Background circle */}
      <Circle
        stroke="#e0e0e0"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
      />
      {/* Progress circle */}
      <Circle
        stroke="#007AFF"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        rotation="-90"
        origin={`${size / 2}, ${size / 2}`}
      />
    </Svg>
  );
}
```

### Large Tap Button

```tsx
<Pressable
  onPress={handleTap}
  style={({ pressed }) => [
    styles.tapButton,
    pressed && styles.tapButtonPressed,
  ]}
>
  <ThemedText type="title" style={{ color: "#fff" }}>
    {count}
  </ThemedText>
</Pressable>

const styles = StyleSheet.create({
  tapButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
  },
  tapButtonPressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
});
```

### Bottom Sheet Modal

Add a modal screen in `app/_layout.tsx`:

```tsx
<Stack.Screen
  name="sheet"
  options={{
    presentation: "modal",
    animation: "slide_from_bottom",
  }}
/>
```

Navigate to it:

```tsx
import { router } from "expo-router";

router.push("/sheet");
```

---

## Animations

### Basic Animation with Reanimated

```tsx
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from "react-native-reanimated";

function AnimatedButton() {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(1.2, {}, () => {
      scale.value = withSpring(1);
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <Animated.View style={[styles.button, animatedStyle]}>
        <ThemedText>Tap me</ThemedText>
      </Animated.View>
    </Pressable>
  );
}
```

### Breathing Animation

Perfect for meditation or focus apps:

```tsx
import { withRepeat, withTiming } from "react-native-reanimated";

const scale = useSharedValue(1);

useEffect(() => {
  scale.value = withRepeat(
    withTiming(1.3, { duration: 4000 }),
    -1,  // Infinite
    true // Reverse
  );
}, []);

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ scale: scale.value }],
  opacity: 0.5 + scale.value * 0.3,
}));
```

### Fade In on Mount

```tsx
const opacity = useSharedValue(0);

useEffect(() => {
  opacity.value = withTiming(1, { duration: 500 });
}, []);

const animatedStyle = useAnimatedStyle(() => ({
  opacity: opacity.value,
}));
```

---

## Gestures

### Swipe Detection

```tsx
import { Gesture, GestureDetector } from "react-native-gesture-handler";

function SwipeableCard({ onSwipe }) {
  const gesture = Gesture.Pan()
    .onEnd((event) => {
      const { translationX, translationY } = event;
      
      if (Math.abs(translationX) > Math.abs(translationY)) {
        // Horizontal swipe
        onSwipe(translationX > 0 ? "right" : "left");
      } else {
        // Vertical swipe
        onSwipe(translationY > 0 ? "down" : "up");
      }
    });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={styles.card}>
        <ThemedText>Swipe me!</ThemedText>
      </Animated.View>
    </GestureDetector>
  );
}
```

### Drag to Reorder

```tsx
const translateY = useSharedValue(0);

const gesture = Gesture.Pan()
  .onUpdate((event) => {
    translateY.value = event.translationY;
  })
  .onEnd(() => {
    translateY.value = withSpring(0);
  });

const animatedStyle = useAnimatedStyle(() => ({
  transform: [{ translateY: translateY.value }],
}));
```

---

## Native Features

### Audio Playback

```tsx
import { Audio } from "expo-av";

const [sound, setSound] = useState<Audio.Sound>();

async function playSound(uri: string) {
  const { sound } = await Audio.Sound.createAsync({ uri });
  setSound(sound);
  await sound.playAsync();
}

// Enable background audio
await Audio.setAudioModeAsync({
  playsInSilentModeIOS: true,
  staysActiveInBackground: true,
});

// Cleanup
useEffect(() => {
  return () => {
    sound?.unloadAsync();
  };
}, [sound]);
```

### Local Notifications

```tsx
import * as Notifications from "expo-notifications";

// Request permission
await Notifications.requestPermissionsAsync();

// Schedule notification
await Notifications.scheduleNotificationAsync({
  content: {
    title: "Time to drink water!",
    body: "Stay hydrated 💧",
  },
  trigger: {
    seconds: 3600,
    repeats: true,
  },
});

// Cancel all
await Notifications.cancelAllScheduledNotificationsAsync();
```

### Haptic Feedback

```tsx
import * as Haptics from "expo-haptics";

// Light tap feedback
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

// Medium impact
Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

// Success notification
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

// Error notification
Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
```

### Keep Screen Awake

```tsx
import { useKeepAwake } from "expo-keep-awake";

function MeditationScreen() {
  useKeepAwake(); // Screen stays on while this component is mounted
  
  return <Timer />;
}
```

---

## Performance Best Practices

### Use FlatList for Lists

```tsx
// Good
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
/>

// Bad - renders all items at once
<ScrollView>
  {items.map((item) => <ItemCard key={item.id} item={item} />)}
</ScrollView>
```

### Memoize Components

```tsx
// Memoize components that receive objects/arrays
const ItemCard = React.memo(({ item }) => (
  <View>
    <ThemedText>{item.name}</ThemedText>
  </View>
));

// Memoize callbacks
const handlePress = useCallback(() => {
  // handle press
}, [dependency]);

// Memoize expensive computations
const filteredItems = useMemo(
  () => items.filter((item) => item.active),
  [items]
);
```

### Use StyleSheet

```tsx
// Good - styles created once
const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: "bold" },
});

// Bad - new object every render
<View style={{ padding: 16 }}>
```

---

## Common Pitfalls

| Pitfall | Solution |
|---------|----------|
| Broken user flows / missing screens/ non-functional buttons | Verify core user flows end-to-end (happy path) before delivery. Create destination screens before adding buttons that link to them. Every `onPress` must navigate to a real screen or trigger an action, never use empty handlers or navigate to non-existent routes |
| Missing icon mapping | Add to `icon-symbol.tsx` BEFORE using in tabs |
| Text clipped at top/bottom | Ensure `lineHeight > fontSize` (1.2-1.5×) for text visibility. Edit `themed-text.tsx` for global styles or add `lineHeight` to inline styles (e.g., `style={{ fontSize: 24, lineHeight: 32 }}`) |
| Excessive top/bottom padding or content under notch | Never use additive `insets.top + spacing`. Use `useSafeAreaInsets()` with `Math.max()` pattern instead |
| Slow list scrolling | Use `FlatList`, never `ScrollView` with `.map()` |
| Styles recreated every render | Use `StyleSheet.create()` outside component |

---

## Backend Capabilities

If your app needs server-side features, see `docs/backend.md` for:

| Feature | When You Need It |
|---------|-----------------|
| **User Authentication** | User accounts, login/logout |
| **Cloud Database** | Cross-device data sync |
| **tRPC API** | Server-side logic, data validation |
| **LLM Integration** | AI-powered features |
| **File Storage** | User-uploaded images/files |
| **Push Notifications** | Notify app owner of events |

> **Note:** Most apps can use local storage (`AsyncStorage`) without needing a backend. Only add backend features when you need cross-device sync or server-side processing.

---

## File Checklist

Before delivering your app:

- [ ] `app/(tabs)/index.tsx` — Home screen customized
- [ ] `constants/theme.ts` — Colors match your brand
- [ ] `app.config.ts` — App name and slug updated
- [ ] `assets/images/icon.png` — Custom app icon generated
- [ ] Icon mappings added for all tabs in `icon-symbol.tsx`
- [ ] Core user flows tested end-to-end (no dead ends, missing screens, or unresponsive buttons)

---

## Core File References

Note: All TODO comments are remarks for the agent (you), not for the user.

## Core File References

`app/(tabs)/_layout.tsx`
```tsx
import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        // Ensure tab bar respects bottom safe area for devices with home indicators
        tabBarStyle: {
          paddingBottom: insets.bottom,
          height: 49 + insets.bottom, // Default tab bar height (49) + safe area
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
```

`app/(tabs)/index.tsx`
```tsx
import { Image } from "expo-image";
import { useRouter, Link } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { getLoginUrl } from "@/constants/oauth";
import { useAuth } from "@/hooks/use-auth";

export default function HomeScreen() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    console.log("[HomeScreen] Auth state:", {
      hasUser: !!user,
      loading,
      isAuthenticated,
      user: user ? { id: user.id, openId: user.openId, name: user.name, email: user.email } : null,
    });
  }, [user, loading, isAuthenticated]);

  const handleLogin = async () => {
    try {
      console.log("[Auth] Login button clicked");
      setIsLoggingIn(true);
      const loginUrl = getLoginUrl();
      console.log("[Auth] Generated login URL:", loginUrl);

      // On web, use direct redirect in same tab
      // On mobile, use WebBrowser to open OAuth in a separate context
      if (Platform.OS === "web") {
        console.log("[Auth] Web platform: redirecting to OAuth in same tab...");
        window.location.href = loginUrl;
        return;
      }

      // Mobile: Open OAuth URL in browser
      // The OAuth server will redirect to our deep link (manusapp://oauth/callback?code=...&state=...)
      console.log("[Auth] Opening OAuth URL in browser...");
      const result = await WebBrowser.openAuthSessionAsync(
        loginUrl,
        undefined, // Deep link is already configured in getLoginUrl, so no need to specify here
        {
          preferEphemeralSession: false,
          showInRecents: true,
        },
      );

      console.log("[Auth] WebBrowser result:", result);
      if (result.type === "cancel") {
        console.log("[Auth] OAuth cancelled by user");
      } else if (result.type === "dismiss") {
        console.log("[Auth] OAuth dismissed");
      } else if (result.type === "success" && result.url) {
        console.log("[Auth] OAuth session successful, navigating to callback:", result.url);
        // Extract code and state from the URL
        try {
          // Parse the URL - it might be exp:// or a regular URL
          let url: URL;
          if (result.url.startsWith("exp://") || result.url.startsWith("exps://")) {
            // For exp:// URLs, we need to parse them differently
            // Format: exp://192.168.31.156:8081/--/oauth/callback?code=...&state=...
            const urlStr = result.url.replace(/^exp(s)?:\/\//, "http://");
            url = new URL(urlStr);
          } else {
            url = new URL(result.url);
          }

          const code = url.searchParams.get("code");
          const state = url.searchParams.get("state");
          const error = url.searchParams.get("error");

          console.log("[Auth] Extracted params from callback URL:", {
            code: code?.substring(0, 20) + "...",
            state: state?.substring(0, 20) + "...",
            error,
          });

          if (error) {
            console.error("[Auth] OAuth error in callback:", error);
            return;
          }

          if (code && state) {
            // Navigate to callback route with params
            console.log("[Auth] Navigating to callback route with params...");
            router.push({
              pathname: "/oauth/callback" as any,
              params: { code, state },
            });
          } else {
            console.error("[Auth] Missing code or state in callback URL");
          }
        } catch (err) {
          console.error("[Auth] Failed to parse callback URL:", err, result.url);
          // Fallback: try parsing with regex
          const codeMatch = result.url.match(/[?&]code=([^&]+)/);
          const stateMatch = result.url.match(/[?&]state=([^&]+)/);

          if (codeMatch && stateMatch) {
            const code = decodeURIComponent(codeMatch[1]);
            const state = decodeURIComponent(stateMatch[1]);
            console.log("[Auth] Fallback: extracted params via regex, navigating...");
            router.push({
              pathname: "/oauth/callback" as any,
              params: { code, state },
            });
          } else {
            console.error("[Auth] Could not extract code/state from URL");
          }
        }
      }
    } catch (error) {
      console.error("[Auth] Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.authContainer}>
        {loading ? (
          <ActivityIndicator />
        ) : isAuthenticated && user ? (
          <ThemedView style={styles.userInfo}>
            <ThemedText type="subtitle">Logged in as</ThemedText>
            <ThemedText type="defaultSemiBold">{user.name || user.email || user.openId}</ThemedText>
            <Pressable onPress={logout} style={styles.logoutButton}>
              <ThemedText style={styles.logoutText}>Logout</ThemedText>
            </Pressable>
          </ThemedView>
        ) : (
          <Pressable
            onPress={handleLogin}
            disabled={isLoggingIn}
            style={[styles.loginButton, isLoggingIn && styles.loginButtonDisabled]}
          >
            {isLoggingIn ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText style={styles.loginText}>Login</ThemedText>
            )}
          </Pressable>
        )}
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{" "}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: "cmd + d",
              android: "cmd + m",
              web: "F12",
            })}
          </ThemedText>{" "}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <Link href="/modal">
          <Link.Trigger>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          <Link.Menu>
            <Link.MenuAction title="Action" icon="cube" onPress={() => alert("Action pressed")} />
            <Link.MenuAction
              title="Share"
              icon="square.and.arrow.up"
              onPress={() => alert("Share pressed")}
            />
            <Link.Menu title="More" icon="ellipsis">
              <Link.MenuAction
                title="Delete"
                icon="trash"
                destructive
                onPress={() => alert("Delete pressed")}
              />
            </Link.Menu>
          </Link.Menu>
        </Link>

        <ThemedText>
          {`Tap the Explore tab to learn more about what's included in this starter app.`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          {`When you're ready, run `}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{" "}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{" "}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  authContainer: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  userInfo: {
    gap: 8,
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 44,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  logoutButton: {
    marginTop: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "rgba(255, 59, 48, 0.1)",
  },
  logoutText: {
    color: "#FF3B30",
    fontSize: 14,
    fontWeight: "500",
  },
});
```

`app/modal.tsx`
```tsx
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function ModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView
      style={[
        styles.container,
        {
          // Handle all safe area edges for device notches, corners, and bottom bars
          paddingTop: Math.max(insets.top, 20),
          paddingBottom: Math.max(insets.bottom, 20),
          paddingLeft: Math.max(insets.left, 20),
          paddingRight: Math.max(insets.right, 20),
        },
      ]}
    >
      <ThemedText type="title">This is a modal</ThemedText>
      <Link href="/" dismissTo style={styles.link}>
        <ThemedText type="link">Go to home screen</ThemedText>
      </Link>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
```

`components/themed-text.tsx`
```tsx
import { StyleSheet, Text, type TextProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    <Text
      style={[
        { color },
        type === "default" ? styles.default : undefined,
        type === "title" ? styles.title : undefined,
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        type === "subtitle" ? styles.subtitle : undefined,
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
```

`components/themed-view.tsx`
```tsx
import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/use-theme-color";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
```

`components/ui/icon-symbol.tsx`
```tsx
// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SymbolWeight, SymbolViewProps } from "expo-symbols";
import { ComponentProps } from "react";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
```

`constants/theme.ts`
```ts
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
```

`app.config.ts`
```ts
// Load environment variables with proper priority (system > .env)
import "./scripts/load-env.js";
import type { ExpoConfig } from "expo/config";

// Bundle ID format: space.manus.<project_name_dots>.<timestamp>
// e.g., "my-app" created at 2024-01-15 10:30:45 -> "space.manus.my.app.t20240115103045"
const bundleId = "space.manus.the.33rd.house.app.t20260113082419";
// Extract timestamp from bundle ID and prefix with "manus" for deep link scheme
// e.g., "space.manus.my.app.t20240115103045" -> "manus20240115103045"
const timestamp = bundleId.split(".").pop()?.replace(/^t/, "") ?? "";
const schemeFromBundleId = `manus${timestamp}`;

const env = {
  // App branding - update these values directly (do not use env vars)
  appName: 'The 33rd House',
  appSlug: 'the-33rd-house-app',
  // S3 URL of the app logo - set this to the URL returned by generate_image when creating custom logo
  // Leave empty to use the default icon from assets/images/icon.png
  logoUrl: '',
  scheme: schemeFromBundleId,
  iosBundleId: bundleId,
  androidPackage: bundleId,
};

const config: ExpoConfig = {
  name: env.appName,
  slug: env.appSlug,
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: env.scheme,
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: env.iosBundleId,
    infoPlist: {
      UIBackgroundModes: ["audio"],
    },
  },
  android: {
    adaptiveIcon: {
      backgroundColor: "#E6F4FE",
      foregroundImage: "./assets/images/android-icon-foreground.png",
      backgroundImage: "./assets/images/android-icon-background.png",
      monochromeImage: "./assets/images/android-icon-monochrome.png",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: env.androidPackage,
    permissions: ["POST_NOTIFICATIONS"],
    intentFilters: [
      {
        action: "VIEW",
        autoVerify: true,
        data: [
          {
            scheme: env.scheme,
            host: "*",
          },
        ],
        category: ["BROWSABLE", "DEFAULT"],
      },
    ],
  },
  web: {
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff",
        dark: {
          backgroundColor: "#000000",
        },
      },
    ],
  ],
  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};

export default config;
```
