# The 33rd House - Project TODO

## Phase 1: Core Setup & Branding
- [x] Update app branding (name, colors, logo)
- [x] Create custom app icon and splash screen
- [x] Set up theme colors (deep purple, gold, cosmic blue)
- [x] Add all required icon mappings to icon-symbol.tsx
- [x] Create 144 Realms static data file
- [x] Create 12 Gates static data file
- [x] Create DAO tokenomics static data
- [x] Create NFT collection static data

## Phase 2: Home & Navigation
- [x] Build Home/Dashboard screen with welcome and progress
- [x] Add current Gate progress indicator (circular)
- [x] Add quick stats cards (Realms explored, days on journey, completion %)
- [x] Add quick action buttons
- [x] Set up bottom tab navigation (5 tabs)
- [x] Configure tab icons and labels

## Phase 3: Realms Explorer
- [x] Build Realms Explorer screen with grid layout
- [x] Add search functionality
- [x] Add filter chips (All Gates, By Element, By Zodiac)
- [x] Create Realm card component
- [ ] Build Realm Detail screen
- [ ] Add correspondences display (crystal, plant, incense, mantra)
- [ ] Add "Mark as Explored" functionality
- [ ] Implement local storage for explored Realms

## Phase 4: Journey Tracker
- [x] Build Journey Tracker screen with Gate list
- [x] Add overall progress bar
- [x] Create expandable Gate sections
- [ ] Build Gate Detail screen
- [ ] Show 12 Realms within each Gate
- [ ] Add "Start Gate" / "Continue Gate" buttons
- [x] Implement progress tracking in AsyncStorage
- [x] Calculate completion percentages

## Phase 5: DAO Dashboard
- [x] Build DAO Dashboard screen
- [x] Add token supply display (33M $HOUSE)
- [x] Create token distribution visualization
- [x] Add treasury balance display
- [x] Create token allocation table
- [x] Add governance parameters section
- [x] Style with data-rich layout

## Phase 6: NFT Collection
- [x] Build NFT Collection screen with grid
- [x] Add rarity tier breakdown
- [x] Create NFT card component
- [x] Display rarity badges
- [x] Show utility benefits by rarity tier
- [x] Add placeholder NFT artwork
- [ ] Build NFT Detail screen (future)

## Phase 7: Analytics Dashboard (Aladdin-Inspired)
- [x] Build Analytics Dashboard screen
- [x] Create Risk Assessment section
  - [x] Current Gate intensity score
  - [x] Shadow work readiness indicator
  - [x] Burnout risk meter
- [x] Create Portfolio Analysis section
  - [x] Energy distribution (4 Currents)
  - [x] Chakra balance bar chart (7 Seals)
  - [x] Realm completion by element
- [x] Create Predictive Modeling section
  - [x] Estimated completion date
  - [x] Next recommended Gate
  - [x] Optimal practice times
- [x] Add Community Insights section
  - [x] User percentile rank
  - [x] Average journey duration
  - [x] Most popular Realms

## Phase 8: Profile & Settings
- [x] Build Profile screen
- [x] Display user avatar and name
- [x] Show journey stats (start date, days active, Realms explored)
- [x] Add Settings section
  - [x] Dark/Light mode display
  - [x] Notification preferences display
  - [x] Language selection display
- [x] Add links to DAO and NFT screens
- [x] Add "Logout" button

## Phase 9: Onboarding Flow
- [ ] Create Welcome screen
- [ ] Build intro slides (3 slides explaining 33rd House)
- [ ] Add "Begin Journey" button
- [ ] Create Gate 0: Threshold intro screen
- [ ] Implement first-time user flow

## Phase 10: Polish & Testing
- [ ] Test all navigation flows
- [ ] Verify all buttons are functional
- [ ] Test progress tracking and persistence
- [ ] Ensure dark/light mode works everywhere
- [ ] Test on iOS simulator
- [ ] Test on Android simulator
- [ ] Verify safe area handling on all screens
- [ ] Check accessibility (touch targets, contrast)
- [ ] Add loading states where needed
- [ ] Add empty states for lists
- [ ] Polish animations and transitions

## Phase 11: Advanced Features (Future)
- [ ] User authentication (optional)
- [ ] Cloud sync of progress
- [ ] Real-time DAO data from API
- [ ] NFT ownership verification
- [ ] Community features (forums, chat)
- [ ] Push notifications for practice reminders
- [ ] Moon phase calendar integration
- [ ] Audio meditations for each Realm
- [ ] Video teachings
- [ ] Live events and ceremonies

## Bugs & Issues
(None yet - will track as they arise)

## Notes
- Using AsyncStorage for local data persistence
- No backend required for MVP
- All data is static/hardcoded for now
- Focus on beautiful, functional UI first
- Analytics are calculated locally based on user progress


## Phase 12: AI Assistant Integration
- [x] Add "AI Assistant" tab to navigation
- [x] Build AI chat interface with message history
- [x] Create consciousness assessment feature
- [x] Add personalized practice recommendations
- [x] Build predictive insights (completion dates, readiness scores)
- [x] Integrate with journey data (Gates, Realms progress)
- [x] Create AI response generation system (rule-based)
- [x] Add typing indicator and smooth animations
- [x] Store chat history in AsyncStorage
- [ ] Add voice input support (future enhancement)
- [ ] Connect to real LLM API (future enhancement)

## Phase 13: OpenAI Integration
- [x] Request OpenAI API key from user
- [x] Create tRPC endpoint for OpenAI chat completions
- [x] Build system prompt with 33rd House context
- [x] Update AI Assistant to call backend API
- [x] Include user journey data in context (progress, realms, days)
- [x] Add error handling and fallbacks
- [x] Test API connection with vitest
- [ ] Add streaming responses for real-time typing effect (future)
- [ ] Test with real user conversations


## Phase 14: Astrology Integration
- [x] Add birth data collection screen (date, time, location, coordinates)
- [x] Integrate astrology calculation library (suncalc)
- [x] Calculate natal chart (Sun, Moon, Rising, Mercury, Venus, Mars, Jupiter, Saturn)
- [x] Get current planetary transits in real-time
- [x] Map transits to 12 Gates (Aries=Gate 1, Taurus=Gate 2, etc.)
- [x] Calculate moon phase and lunar cycle (New/Full/Waxing/Waning)
- [x] Update AI system prompt with astrology context
- [x] Generate personalized astrology readings via AI
- [x] Provide timing recommendations based on moon phase and transits
- [x] Store birth data securely in AsyncStorage
- [x] Add birth data link to Profile screen
- [x] Pass birth data to AI API for context-aware readings


## Phase 15: Complete Teaching Framework Integration
- [x] Read and extract all 4 PDFs (Duality Research, Codex Reference, Decoding Cosmos, IP Review)
- [x] Integrate "Beyond Duality" teaching (Christ/Lucifer integration, Purple Flame, Alchemical Marriage)
- [x] Add complete 12 Star Gates system with themes, shadows, gifts, somatic practices
- [x] Include 144 Realms, Archetypes & Shadows framework
- [x] Add Zodiac-to-Gate mapping and Lion's Gate significance
- [x] Integrate Sovereignty Framework (legal, economic, spiritual, bodily)
- [x] Add guidance protocols for stuck users and "demonic" fears
- [x] Update AI system prompt with complete teaching framework
- [x] Include truth-based discernment test (vs fear-based)
- [x] Add Integration Prayer for daily practice


## Phase 16: Realm Detail Screens
- [x] Create Realm Detail screen component
- [x] Add full correspondences display (crystal, plant, incense, mantra, element, planet)
- [x] Display Archetype (light/gift) description and qualities
- [x] Display Shadow (wounded) description and patterns
- [x] Add Integration Practice section with 4-step process
- [x] Add Somatic Practice section with element-specific body techniques
- [x] Add Astrological Timing recommendations
- [x] Implement "Mark as Explored" button with AsyncStorage
- [x] Add visual progress indicator (explored badge)
- [x] Link from Realms Explorer grid to detail screen (already working)
- [x] Add navigation to previous/next Realm
- [x] Style with immersive, mystical design (purple/red color coding)


## Phase 17: Onboarding Flow
- [x] Create onboarding screen with 3 slides
- [x] Slide 1: Welcome to The 33rd House (system overview)
- [x] Slide 2: The 12 Gates Journey (progression path)
- [x] Slide 3: Integrating Light & Shadow (core teaching)
- [x] Add beautiful visuals and animations (emoji icons, smooth transitions)
- [x] Add "Begin Journey" button on final slide
- [x] Store onboarding completion in AsyncStorage
- [x] Show onboarding only on first app launch (check in Home screen)
- [x] Add Skip button for flexibility

## Phase 18: Daily Check-In Feature
- [x] Create Daily Check-In screen
- [x] Build morning check-in flow (5 questions)
- [x] Build evening check-in flow (5 reflection questions)
- [x] Track mood/energy levels over time (stored in history)
- [x] Store check-in history in AsyncStorage
- [x] Display check-in streak with fire emoji
- [x] Add "Maybe Later" option for flexibility
- [x] Add progress bar during question flow
- [x] Add link to check-in from Home screen
- [ ] Integrate with AI for personalized follow-up questions (future)
- [ ] Add check-in reminder notifications (future)

## Phase 19: Voice Input for AI
- [x] Install expo-speech library
- [x] Add microphone button to AI chat interface
- [x] Add visual feedback (red when listening, mic icon)
- [x] Add placeholder alert for voice input setup
- [ ] Implement real speech recognition (requires cloud API - future)
- [ ] Handle microphone permissions (future)
- [ ] Convert speech to text and send to AI (future)


## Phase 20: Achievement Badges System
- [x] Design badge system with categories (Realms, Gates, Streaks, Practices, Special)
- [x] Create badge data structure with 28 unique badges and unlock conditions
- [x] Build Badges screen to display all badges (locked/unlocked)
- [x] Implement badge unlock logic based on user progress (realms, gates, streaks, days, AI chats)
- [x] Add filter chips (All, Unlocked, Locked, by category)
- [x] Add badge link to Profile screen
- [x] Create visual badge components (emoji icons, rarity colors, rarity badges)
- [x] Calculate badge progress from AsyncStorage data
- [x] Add rarity tiers (Common, Rare, Epic, Legendary)
- [ ] Add badge notifications when unlocked (future)
- [ ] Add badge showcase on Profile (future)

## Phase 21: Video Generation Feature
- [x] Design 4 video templates (Daily Wisdom, Journey Progress, Realm Insight, Gate Teaching)
- [x] Build video generation screen with template selection
- [x] Add template cards with icons, descriptions, and durations
- [x] Add custom text input for quote-style videos
- [x] Add auto-load progress data for progress videos
- [x] Add style preview (cosmic backgrounds, animations, branding)
- [x] Add generate button with loading state
- [x] Add link to Create Video from Profile screen
- [ ] Integrate real video creation library (Remotion, FFmpeg, or cloud API) - future
- [ ] Export videos to device gallery - future
- [ ] Add share functionality (social media, messaging) - future


## Phase 22: Genesis Social Platform
- [x] Add "Genesis" tab to main navigation
- [x] Create database schema for posts, comments, likes, follows, messages, notifications
- [x] Build Community Feed screen with pull-to-refresh
- [x] Create Post Composer with text input and privacy controls
- [x] Build Post Card component with like/comment/share actions
- [x] Add Gate Tag filter chips (All, Gate 0-12)
- [x] Add Privacy Controls (Public, Private, Friends-only posts)
- [x] Build Gate-Based filtering (find posts by Gate)
- [x] Create tRPC API endpoints for all social features
- [x] Implement createPost, getFeed, getPost, deletePost
- [x] Implement createComment, getComments
- [x] Implement toggleLike for posts and comments
- [x] Implement toggleFollow, getFollowers, getFollowing
- [x] Implement sendMessage, getConversation
- [x] Implement getNotifications, markNotificationRead
- [x] Add authentication checks (require login)
- [x] Add globe icon mapping for Genesis tab
- [ ] Build Post Detail screen with full comments (future)
- [ ] Implement nested comment replies (future)
- [ ] Add Media Upload (images, videos to cloud storage) (future)
- [ ] Build User Profile screen (public view) (future)
- [ ] Create Direct Messaging UI (future)
- [ ] Build Notifications screen UI (future)
- [ ] Add real-time updates with WebSocket (future)
- [ ] Implement Content Moderation UI (report, block, mute) (future)
- [ ] Add Search functionality (users, posts, hashtags) (future)
- [ ] Create Trending section (popular posts, active users) (future)


## Phase 23: Membership Tiers & Monetization (Hustlers University Model)
- [x] Create membership tier system (Free, Seeker $33/mo, Sovereign $333/mo, Ascended $3,333/mo)
- [x] Add membership data to user schema (membershipTier, subscriptionStatus, etc.)
- [x] Build Pricing/Plans screen with 4 tiers and feature comparison
- [x] Add "Upgrade" link to Profile screen
- [ ] Integrate Stripe for payment processing (requires API keys - future)
- [ ] Create Checkout flow with Stripe (future)
- [ ] Add subscription management (upgrade, downgrade, cancel) (future)
- [ ] Implement content gating based on membership tier (future)
- [ ] Add "Upgrade to Unlock" prompts throughout app (future)
- [ ] Create payment success/failure screens (future)
- [ ] Add billing history and receipts (future)

## Phase 24: Daily Missions System
- [x] Create Daily Missions system with 10 unique missions
- [x] Build Daily Missions screen with progress tracking
- [x] Add mission rewards (XP, coins)
- [x] Implement streak tracking for daily completion
- [x] Create mission categories (practice, study, community, shadow work)
- [x] Add mission difficulty levels (Easy, Medium, Hard, Expert)
- [x] Add stats display (streak, total XP, total coins)
- [x] Add progress bar showing missions completed
- [x] Add "Complete" button functionality with AsyncStorage
- [x] Add link to Missions from Home screen
- [ ] Add push notifications for daily mission reminders (future)
- [ ] Create Professor/Mentor system (future)
- [ ] Build Professor Directory screen (future)
- [ ] Add exclusive Professor content (videos, guides, Q&A) (future)

## Phase 25: Leaderboards & Competition
- [x] Create global leaderboard with top 10 users
- [x] Build Leaderboard screen with filters (weekly, monthly, all-time)
- [x] Add category filters (XP, Realms, Gates)
- [x] Add user rankings and percentile display ("Your Rank" card)
- [x] Add membership tier badges (👑 Ascended, 💎 Sovereign, 🔮 Seeker)
- [x] Add rank medals (🥇🥈🥉)
- [x] Add motivational messages
- [x] Add link to Leaderboard from Profile
- [ ] Connect to real backend data (future)
- [ ] Add real-time updates (future)
- [ ] Create Affiliate Program with unique referral codes (future)
- [ ] Build Affiliate Dashboard (earnings, referrals, conversion rate) (future)
- [ ] Add commission structure (10% recurring for Seeker, 15% for Sovereign, 20% for Ascended) (future)
- [ ] Implement referral tracking and attribution (future)
- [ ] Create affiliate payout system (future)
- [ ] Add "War Room" exclusive community for paying members (future)
- [ ] Build War Room screen (premium Genesis feed) (future)

## Phase 26: Success Stories & High-Ticket Upsells
- [ ] Create Success Stories database and schema
- [ ] Build Success Stories showcase screen
- [ ] Add testimonial submission form
- [ ] Create before/after transformation displays
- [ ] Add video testimonials support
- [ ] Build 1-on-1 Coaching booking system
- [ ] Create Mastermind Group offerings ($10k-$50k)
- [ ] Add VIP Retreat information and booking
- [ ] Implement scarcity messaging (limited spots, enrollment windows)
- [ ] Add urgency timers for special offers
- [ ] Create upsell prompts at key moments (Gate completion, milestones)


## Phase 27: Stripe Payment Integration
- [ ] Request Stripe API keys (test mode)
- [ ] Install Stripe SDK
- [ ] Create Stripe tRPC router with checkout endpoints
- [ ] Build checkout flow from Pricing screen
- [ ] Implement subscription creation
- [ ] Add webhook handler for payment events
- [ ] Update user membership tier on successful payment
- [ ] Build subscription management screen (upgrade, downgrade, cancel)
- [ ] Add payment success/failure screens
- [ ] Test with Stripe test cards

## Phase 26: Professor/Mentor System
- [x] Add Professor and ProfessorContent tables to database schema
- [x] Create Professor Directory screen with 13 professors (one per Gate)
- [x] Add Gate filter chips (All Gates, Gate 0-12)
- [x] Display professor cards with avatar, bio, expertise tags
- [x] Add membership tier badges (Free, Seeker, Sovereign, Ascended)
- [x] Show content count for each professor
- [x] Add link to Professors from Profile screen
- [ ] Build Professor Detail screen with exclusive content (future)
- [ ] Add video player for professor teachings (future)
- [ ] Implement content gating by membership tier (future)
- [ ] Add Q&A/live session scheduling (future)

## Phase 27: Affiliate Program
- [x] Add Referrals and AffiliatePayouts tables to database schema
- [x] Create Affiliate Dashboard screen
- [x] Display earnings overview (pending, paid, lifetime)
- [x] Add referral link with share functionality
- [x] Show performance stats (clicks, signups, conversion rate)
- [x] Display commission rates (10% Seeker, 15% Sovereign, 20% Ascended)
- [x] Add referrals list with filter (all, converted, pending)
- [x] Implement "Request Payout" button with $50 minimum
- [x] Add link to Affiliate Program from Profile screen
- [ ] Connect to real backend data (future)
- [ ] Implement real referral tracking (future)
- [ ] Add payout processing with Stripe (future)
- [ ] Send notifications for new referrals and payouts (future)

## Phase 28: Stripe Payment Integration (Future)
- [ ] Request Stripe API keys (test mode)
- [ ] Install Stripe SDK
- [ ] Create Stripe tRPC router with checkout endpoints
- [ ] Build checkout flow from Pricing screen
- [ ] Implement subscription creation
- [ ] Add webhook handler for payment events
- [ ] Update user membership tier on successful payment
- [ ] Build subscription management screen (upgrade, downgrade, cancel)
- [ ] Add payment success/failure screens
- [ ] Test with Stripe test cards
- [ ] Create Professor Directory screen
- [ ] Build Professor Detail screen
- [ ] Add exclusive content types (videos, guides, Q&A)
- [ ] Implement content gating by membership tier
- [ ] Add "Unlock with [Tier]" prompts
- [ ] Create Professor content upload/management
- [ ] Add Professor bio, expertise, credentials
- [ ] Link Professors to their respective Gates

## Phase 29: Affiliate Program
- [ ] Create Affiliate database schema (referrals, earnings, payouts)
- [ ] Generate unique referral codes for each user
- [ ] Build Affiliate Dashboard screen
- [ ] Add referral tracking (clicks, signups, conversions)
- [ ] Implement commission calculation (10% Seeker, 15% Sovereign, 20% Ascended)
- [ ] Create earnings display (pending, paid, lifetime)
- [ ] Build payout request system
- [ ] Add referral link sharing functionality
- [ ] Create conversion funnel analytics
- [ ] Add affiliate leaderboard (top earners)


## Phase 29: Stripe Payment Integration (Current)
- [ ] Check Stripe MCP authorization status
- [ ] Create Stripe products for each membership tier
- [ ] Create Stripe prices ($33, $333, $3333 monthly recurring)
- [ ] Build Stripe tRPC router with createCheckoutSession endpoint
- [ ] Update Pricing screen to trigger Stripe checkout
- [ ] Add webhook handler for checkout.session.completed
- [ ] Update user membership tier on successful payment
- [ ] Add subscription management (view, cancel)
- [ ] Test with Stripe test mode

## Phase 30: Content Gating by Membership Tier
- [ ] Add tier check utility function
- [ ] Gate Realms by tier (Free: 0-36, Seeker: 0-72, Sovereign: 0-108, Ascended: all 144)
- [ ] Gate Gates by tier (Free: 0-3, Seeker: 0-6, Sovereign: 0-9, Ascended: all 12)
- [ ] Add "Upgrade to Unlock" prompts on locked content
- [ ] Gate AI Assistant features by tier
- [ ] Gate Professor content by tier
- [ ] Gate Genesis War Room by tier (Seeker+)
- [ ] Add tier badges throughout app

## Phase 31: Professor Detail Pages
- [ ] Create Professor Detail screen
- [ ] Display professor bio, expertise, and stats
- [ ] Add exclusive content tabs (Videos, Guides, Q&A)
- [ ] Build video player for teachings
- [ ] Add downloadable guides section
- [ ] Create Q&A/live session booking
- [ ] Implement content gating (show previews, lock full content)
- [ ] Add "Unlock with [Tier]" buttons
- [ ] Link from Professor Directory cards


## Phase 24: Content Gating & Monetization
- [x] Create tier-gating utility library with access rules
- [x] Add content gating to Realms Explorer (lock premium Realms)
- [x] Add content gating to Journey Tracker (lock premium Gates)
- [x] Add upgrade prompts with pricing navigation
- [x] Build Professor Detail pages with exclusive content
- [x] Add tabs for Overview, Videos, Guides, Live Q&A
- [x] Add professor data for all 13 Gates
- [x] Link professors list to detail pages
- [x] Add lock banners for non-subscribers
- [ ] Complete Stripe integration (pending OAuth authorization)
- [ ] Implement checkout flow for subscriptions
- [ ] Handle subscription webhooks
- [ ] Add content gating to AI Assistant (future)
- [ ] Add media upload for posts (future)
- [ ] Implement push notifications (future)


## Phase 25: Animation & Branding Enhancement
- [x] Add breathing animation to app logo/dragon icon
- [x] Add particle effects or cosmic background animations
- [x] Animate progress circles and bars with smooth transitions
- [x] Add fade-in/scale animations for cards and content
- [x] Add shimmer/glow effects to premium content badges
- [ ] Animate tab transitions with smooth fades
- [x] Add pulsing effects to call-to-action buttons
- [x] Add floating/parallax effects to headers
- [x] Animate Realm cards with hover/press effects
- [ ] Add mystical transitions between screens
- [x] Add animated gradient backgrounds
- [x] Add subtle rotation/floating to Gate icons


## Phase 26: Push Notifications System
- [x] Request notification permissions on app launch
- [x] Schedule daily check-in reminders (morning 8am, evening 8pm)
- [x] Add badge unlock notifications with celebration message
- [x] Add Gate completion notifications
- [x] Add optimal practice time notifications based on moon phase
- [x] Add notification for when user's zodiac sign is in current transit
- [x] Create notification settings screen
- [x] Allow users to customize notification times
- [x] Add notification toggle switches (check-ins, badges, astrology)
- [ ] Test notifications on iOS and Android (requires physical device)
- [ ] Add notification icons and custom sounds (future enhancement)


## Phase 27: Social Features for Genesis
- [x] Add like/unlike functionality to posts
- [x] Display like count and user's like status
- [x] Add comment system with nested replies
- [x] Create comment input UI with character limit
- [x] Add user following/followers system
- [x] Create user profile pages with stats
- [x] Add follow/unfollow buttons
- [x] Display follower/following counts
- [ ] Add activity feed showing posts from followed users (backend already supports)
- [ ] Add post sharing functionality (future)
- [ ] Create notification system for likes, comments, follows (future)
- [ ] Add user avatar upload and display (future)
- [ ] Implement post reporting/moderation (future)
- [ ] Add search for users (future)


## Phase 28: Replace Emojis with Real Images
- [ ] Generate custom badge icons for all badge types (Common, Rare, Epic, Legendary)
- [ ] Replace emoji avatars with proper user avatar system
- [ ] Create icon set for social actions (like, comment, share)
- [ ] Generate Gate icons/symbols for all 13 Gates
- [ ] Replace emoji in Realm cards with mystical imagery
- [ ] Create custom icons for navigation tabs
- [ ] Generate imagery for notification types
- [ ] Replace emoji in professor cards with portraits
- [ ] Create custom icons for stats and achievements
- [ ] Add proper image assets for onboarding screens
- [ ] Generate mystical symbols for astrology features
- [ ] Replace placeholder media with proper image components
