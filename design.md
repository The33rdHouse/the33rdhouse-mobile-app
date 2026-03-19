# The 33rd House - Mobile App Design

## Design Philosophy

**The 33rd House is a consciousness transformation platform**—not a social media app, not a productivity tool, but a sacred space for spiritual growth, sovereignty, and community. The design must feel:

- **Sacred & Mystical**: Deep purples, golds, cosmic imagery
- **Powerful & Sovereign**: Bold typography, clear hierarchy, confident UI
- **Intuitive & Accessible**: Easy navigation, clear information architecture
- **Data-Rich**: Analytics dashboards inspired by Aladdin (BlackRock's system)
- **Mobile-First**: Optimized for one-handed use, portrait orientation (9:16)

---

## Color Palette

### Primary Colors
- **Deep Purple** (#4A148C): Primary brand color, sovereignty, mysticism
- **Gold** (#FFD700): Accents, highlights, dragon energy
- **Cosmic Blue** (#1A237E): Secondary, depth, night sky

### Text Colors
- **Primary Text** (Light): #FFFFFF
- **Primary Text** (Dark): #1A1A1A
- **Secondary Text** (Light): rgba(255,255,255,0.7)
- **Secondary Text** (Dark): rgba(0,0,0,0.6)
- **Disabled Text**: rgba(255,255,255,0.4)

### Backgrounds
- **Light Mode BG**: #F5F5F7
- **Dark Mode BG**: #0A0A0F
- **Card BG (Light)**: #FFFFFF
- **Card BG (Dark)**: #1A1A24
- **Elevated (Dark)**: #252530

---

## Typography

- **Title**: 32pt, Bold, Line Height 40pt
- **Subtitle**: 20pt, Bold, Line Height 28pt
- **Body**: 16pt, Regular, Line Height 24pt
- **Caption**: 14pt, Regular, Line Height 20pt
- **Small**: 12pt, Regular, Line Height 16pt

**Font**: System (SF Pro on iOS, Roboto on Android)

---

## Screen List & Content

### 1. Home / Dashboard
**Purpose**: Overview of user's journey and quick access to key features

**Content**:
- Welcome message with user name
- Current Gate progress (large circular progress indicator)
- Current Realm name and description
- Quick stats: Total Realms explored, Days on journey, Completion %
- Quick action buttons: Continue Journey, Explore Realms, View Analytics
- Recent activity feed

**Layout**: Scrollable with hero section at top

---

### 2. Realms Explorer
**Purpose**: Browse and explore all 144 Realms

**Content**:
- Search bar at top
- Filter chips: All Gates, By Element (Fire/Water/Air/Earth), By Zodiac
- Grid/List toggle
- Realm cards showing:
  - Realm number (1-144)
  - Realm name
  - Gate name
  - Zodiac sign icon
  - Element icon
  - Completion status (if visited)
- Tap card → Realm Detail screen

**Layout**: Scrollable grid (2 columns) or list view

---

### 3. Realm Detail
**Purpose**: Deep dive into a specific Realm

**Content**:
- Large hero image/glyph (future: NFT artwork)
- Realm number and name
- Gate, Zodiac, Element, Planet
- Archetype and Shadow
- Full description
- Correspondences:
  - Crystal
  - Plant
  - Incense
  - Mantra
  - Color
- Practices for this Realm
- "Mark as Explored" button
- "Add to Journey" button

**Layout**: Scrollable detail view with sections

---

### 4. Journey Tracker
**Purpose**: Track personal progress through the 12 Gates

**Content**:
- Overall progress bar (0-100%)
- List of 13 Gates (Gate 0-12)
- Each Gate shows:
  - Gate number and name
  - Zodiac sign
  - Duration estimate
  - Status: Not Started / In Progress / Complete
  - Completion percentage
  - Tap to expand → shows 12 Realms within Gate
- "Start Next Gate" button
- "View Journey Map" (visual spiral representation)

**Layout**: Scrollable list with expandable sections

---

### 5. Gate Detail
**Purpose**: Focus on a specific Gate

**Content**:
- Gate name and number
- Zodiac sign, element, planet
- Duration and difficulty
- Description and purpose
- 12 Realms within this Gate (list)
- Key practices for this Gate
- Recommended duration
- "Start Gate" / "Continue Gate" button
- Progress indicator

**Layout**: Scrollable detail view

---

### 6. DAO Dashboard
**Purpose**: View DAO tokenomics and governance

**Content**:
- Total token supply: 33M $HOUSE
- Token distribution pie chart
- Your tokens (if connected wallet)
- Treasury balance
- Active proposals (count)
- Recent governance activity
- "View Proposals" button
- "Connect Wallet" button (if not connected)
- Token allocation table

**Layout**: Dashboard with cards and charts

---

### 7. NFT Collection
**Purpose**: View the 144 Realm Glyphs NFT collection

**Content**:
- Collection overview: 144 total NFTs
- Rarity breakdown:
  - Legendary: 12 (8.3%)
  - Epic: 24 (16.7%)
  - Rare: 36 (25%)
  - Common: 72 (50%)
- Grid of NFT previews (placeholder images)
- Each shows: Realm name, rarity tier, price
- Tap → NFT Detail screen
- "View on OpenSea" link (future)

**Layout**: Grid view (2 columns)

---

### 8. NFT Detail
**Purpose**: View individual NFT details

**Content**:
- Large NFT artwork (placeholder)
- Realm name and number
- Rarity tier (with badge)
- Price in ETH
- Utility benefits (based on rarity)
- Traits/attributes
- "View on OpenSea" button
- "Buy NFT" button (future)

**Layout**: Scrollable detail view

---

### 9. Analytics Dashboard (Aladdin-Inspired)
**Purpose**: Personal insights and predictive analytics

**Content**:
- **Risk Assessment**:
  - Current Gate intensity score (1-10)
  - Shadow work readiness
  - Burnout risk indicator
- **Portfolio Analysis**:
  - Energy distribution across 4 Currents (pie chart)
  - Chakra balance (7 Seals bar chart)
  - Realm completion by element
- **Predictive Modeling**:
  - Estimated completion date
  - Next recommended Gate
  - Optimal practice times (based on moon phase)
- **Community Insights**:
  - Your rank in community (percentile)
  - Average journey duration
  - Most popular Realms

**Layout**: Dashboard with multiple chart cards

---

### 10. Profile / Settings
**Purpose**: User profile and app settings

**Content**:
- User avatar and name
- Journey stats:
  - Start date
  - Days active
  - Realms explored
  - Current Gate
- Settings:
  - Dark/Light mode toggle
  - Notifications
  - Language
  - Connected wallet address
- "Edit Profile" button
- "Logout" button

**Layout**: Scrollable settings list

---

## Key User Flows

### Flow 1: New User Onboarding
1. Open app → Welcome screen
2. "Get Started" → Brief intro to 33rd House (3 slides)
3. "Begin Journey" → Gate 0: Threshold screen
4. "Start Gate 0" → Marks Gate 0 as In Progress
5. Navigate to Home → Shows Gate 0 progress

### Flow 2: Exploring Realms
1. Home → Tap "Explore Realms"
2. Realms Explorer → Browse grid
3. Tap Realm card → Realm Detail
4. Read content, view correspondences
5. "Mark as Explored" → Updates progress
6. Back to Realms Explorer

### Flow 3: Tracking Journey
1. Home → Tap "My Journey" tab
2. Journey Tracker → See all Gates
3. Tap Gate 5 → Gate Detail
4. View 12 Realms within Gate 5
5. "Start Gate" → Marks Gate 5 as In Progress
6. Back to Journey Tracker → Progress updated

### Flow 4: Viewing Analytics
1. Home → Tap "Analytics" tab
2. Analytics Dashboard → View charts
3. Scroll through risk assessment, portfolio, predictions
4. Tap chart → Expanded view (optional)

### Flow 5: Exploring DAO
1. Home → Tap "DAO" tab
2. DAO Dashboard → View tokenomics
3. Scroll through charts and data
4. "Connect Wallet" → Wallet connection flow (future)

---

## Navigation Structure

### Bottom Tab Bar (5 tabs):
1. **Home** (house.fill icon)
2. **Realms** (sparkles icon)
3. **Journey** (map icon)
4. **Analytics** (chart.bar.fill icon)
5. **Profile** (person.fill icon)

### Additional Screens (accessed via navigation):
- Realm Detail (from Realms tab)
- Gate Detail (from Journey tab)
- DAO Dashboard (from Home or Profile)
- NFT Collection (from Home or Profile)
- NFT Detail (from NFT Collection)
- Settings (from Profile)

---

## Component Style

### Cards
- Border radius: 16pt
- Padding: 16pt
- Shadow: subtle (elevation 2)
- Background: themed (light/dark)

### Buttons
- Primary: Gold background, white text, 12pt radius
- Secondary: Transparent with border, themed text
- Tertiary: Text only, no background
- Height: 48pt minimum (touch target)

### Progress Indicators
- Circular: Large (200pt) for main progress, small (80pt) for Gate progress
- Linear: 4pt height, rounded ends, gold fill
- Percentage text: Bold, large, centered

### Icons
- Tab bar: 28pt
- Buttons: 24pt
- List items: 20pt
- Style: Filled (not outline)

---

## Spacing & Layout

- **Grid**: 8pt base unit
- **Screen padding**: 16pt horizontal, 20pt vertical
- **Card spacing**: 12pt between cards
- **Section spacing**: 24pt between sections
- **Touch targets**: Minimum 44pt
- **Safe areas**: Always respect (use useSafeAreaInsets)

---

## Animations

- **Screen transitions**: Slide from right (iOS style)
- **Card taps**: Scale down to 0.95 on press
- **Progress updates**: Smooth animation (500ms)
- **Tab switches**: Fade transition
- **Modals**: Slide up from bottom

---

## Data Requirements

### Local Storage (AsyncStorage):
- User profile (name, start date)
- Journey progress (Gates and Realms completed)
- Settings (theme, notifications)
- Explored Realms list

### Static Data (hardcoded or JSON):
- 144 Realms data (name, gate, zodiac, element, etc.)
- 12 Gates data (name, zodiac, description)
- DAO tokenomics (distribution, treasury targets)
- NFT collection data (rarity tiers, prices)

### Future (API/Database):
- User authentication
- Cloud sync of progress
- Real-time DAO data
- NFT ownership verification
- Community analytics

---

## Accessibility

- **Text size**: Minimum 14pt for body text
- **Contrast**: WCAG AA compliant (4.5:1 for text)
- **Touch targets**: Minimum 44pt
- **Screen reader**: All interactive elements labeled
- **Dark mode**: Full support

---

## Technical Notes

- **Platform**: React Native (Expo)
- **Navigation**: Expo Router (file-based)
- **State**: React hooks + AsyncStorage
- **Charts**: react-native-svg + custom components
- **Icons**: SF Symbols (iOS) / Material Icons (Android)
- **Fonts**: System fonts (SF Pro / Roboto)

---

## Design Principles Summary

1. **Sacred Space**: This is a temple, not a social feed
2. **Clarity First**: Information is dense, presentation must be clear
3. **Progress Visible**: Always show where user is on the journey
4. **Data-Driven**: Analytics and insights are core, not optional
5. **Sovereign**: User owns their data, journey, and experience
6. **Beautiful**: Mystical, powerful, inspiring visual design
7. **Functional**: Every screen serves the journey
8. **Accessible**: Everyone can access the wisdom

---

**This design creates a powerful, data-rich, mystical mobile experience that honors the depth of The 33rd House system while remaining intuitive and beautiful.**
