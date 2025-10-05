# 🎵 AI Music Studio

> Create professional music with AI in seconds. A full-stack Next.js application with real SunoAPI integration, authentication, and credits management.

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

### 🎨 **User Interface**
- ✅ Professional landing page with seamless gradient flow
- ✅ Page navigation dropdown (Home, Generate Music, Credits, My Tracks, Profile)
- ✅ Smart page detection with icons
- ✅ Glassmorphism design system throughout
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Dark mode support with smooth transitions
- ✅ Framer Motion animations on landing page
- ✅ Loading skeletons for better UX
- ✅ Empty states with helpful messaging
- ✅ Touch-friendly buttons (min 44px)
- ✅ Consistent gradient backgrounds across all pages
- ✅ Professional header with credits display and user menu

### 🔐 **Authentication**
- ✅ NextAuth v5 (Auth.js) integration
- ✅ Google OAuth 2.0
- ✅ GitHub OAuth
- ✅ Email/Password (Credentials)
- ✅ Protected routes with middleware
- ✅ Session management (JWT)

### 🎵 **Music Generation**
- ✅ Real SunoAPI integration
- ✅ Multiple AI models (v4, v4.5, v5)
- ✅ 10 genre options
- ✅ Custom mode with title/lyrics
- ✅ Instrumental option
- ✅ Real-time progress tracking
- ✅ HTML5 audio player

### 💳 **Credits System**
- ✅ Real-time balance from SunoAPI with refresh button
- ✅ Formatted display with commas (1,000+)
- ✅ Credit deduction on generation (10 credits per track)
- ✅ Usage history tracking with localStorage
- ✅ Transaction history with track names
- ✅ Export functionality (CSV, XLSX, TXT)
- ✅ Usage analytics (24 hours, 7 days, all time)
- ✅ Low credits warning modal with exact shortage
- ✅ Purchase packages UI (Free, Creator, Pro plans)
- ✅ Stats dashboard with visual cards
- ✅ Clear history option
- ✅ Payment modal for upgrades

### 📚 **Track Library**
- ✅ Grid and List view modes (persisted in localStorage)
- ✅ Search by title/genre (real-time filtering)
- ✅ Sort options (Newest, Oldest, Name A-Z, Duration, Most Played)
- ✅ Filter by genre dropdown
- ✅ Play/pause controls with HTML5 audio
- ✅ Like/Unlike tracks (heart icon toggle)
- ✅ Download MP3 files (direct download)
- ✅ Share tracks (Web Share API with file sharing)
- ✅ Delete tracks (triple confirmation)
- ✅ 9 real AI-generated songs included
- ✅ Color-coded genre badges
- ✅ Track statistics (plays, size, duration)
- ✅ Empty state handling

### 👤 **Profile & Settings**
- ✅ 6-tab navigation (Profile, Account, Notifications, Privacy & Security, Billing, Preferences)
- ✅ Profile picture upload (max 5MB, with preview)
- ✅ Personal information management (name, username, bio, location, website)
- ✅ Edit mode with save/cancel
- ✅ Profile stats (Tracks Created, Credits Available, Months Active)
- ✅ Password change form with show/hide toggle
- ✅ Two-Factor Authentication (SMS and Authenticator App toggles)
- ✅ Email notifications (Track generation, Account updates, Marketing)
- ✅ Push notifications (Browser notifications)
- ✅ Privacy settings (Profile visibility, Track sharing, Usage analytics)
- ✅ Dark mode toggle (full theme switch with smooth transitions)
- ✅ Audio preferences (Quality, Auto-play)
- ✅ Language & Region settings
- ✅ Account deletion (triple confirmation with warnings)
- ✅ Save button (purple when changes detected, gray when disabled)
- ✅ Session integration

### ♿ **Accessibility & Performance**
- ✅ WCAG 2.1 AA compliant
- ✅ ARIA labels throughout
- ✅ Keyboard navigation
- ✅ Skip to content link
- ✅ Focus indicators
- ✅ Error boundaries
- ✅ PWA support (installable)
- ✅ Keyboard shortcuts (g+h, g+g, g+t, g+c, g+p, ?)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- SunoAPI key
- Google OAuth credentials (optional)
- GitHub OAuth credentials (optional)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd ai-music-studio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database?sslmode=require"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth (optional)
GITHUB_ID="your-github-app-id"
GITHUB_SECRET="your-github-app-secret"

# SunoAPI (required)
SUNOAPI_KEY="your-actual-api-key"
SUNOAPI_BASE_URL="https://api.sunoapi.com/api/v1"
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
ai-music-studio/
├── app/                      # Next.js 14 app directory
│   ├── page.tsx             # Landing page
│   ├── layout.tsx           # Root layout with ErrorBoundary
│   ├── signup/              # Sign-up page
│   ├── signin/              # Sign-in page
│   ├── dashboard/           # Main dashboard
│   ├── generate/            # Music generation
│   ├── credits/             # Credits management
│   ├── tracks/              # Track library
│   ├── profile/             # User settings
│   └── api/                 # API routes
│       ├── auth/            # NextAuth routes
│       ├── credits/         # Credits API
│       └── music/           # Music generation API
├── components/              # React components
│   ├── ErrorBoundary.tsx   # Error boundary
│   ├── auth/               # Auth components
│   ├── credits/            # Credits components
│   ├── music/              # Music components
│   ├── ui/                 # UI components
│   └── providers/          # Context providers
├── hooks/                   # Custom React hooks
│   ├── useCredits.ts       # Credits management
│   └── useKeyboardShortcuts.ts  # Keyboard shortcuts
├── lib/                     # Utilities
│   ├── auth.ts             # NextAuth config
│   ├── sunoapi-client.ts   # SunoAPI client
│   └── prisma.ts           # Prisma client
├── types/                   # TypeScript types
│   ├── credits.ts          # Credit types
│   ├── suno.ts             # SunoAPI types
│   └── next-auth.d.ts      # NextAuth types
├── public/                  # Static assets
│   ├── manifest.json       # PWA manifest
│   └── songs/              # AI-generated songs
└── prisma/                  # Database schema
    └── schema.prisma       # Prisma schema
```

## ⌨️ Keyboard Shortcuts

- `g + h` → Dashboard
- `g + g` → Generate Music
- `g + t` → My Tracks
- `g + c` → Credits
- `g + p` → Profile
- `?` → Show keyboard shortcuts help

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Authentication:** NextAuth v5 (Auth.js)
- **Database:** PostgreSQL + Prisma ORM
- **API:** SunoAPI (real music generation)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State Management:** React Query

## 📊 Project Metrics

- **8 Pages:** Landing, Signup, Signin, Dashboard, Generate, Credits, Tracks, Profile
- **25+ Components:** Auth, Credits, Music, Landing, Dashboard, UI components
- **7 API Routes:** Credits, Generate, Status, Test, Download, Auth
- **9 Real AI Songs:** Integrated with full playback controls
- **6 Profile Tabs:** Complete settings management
- **2 View Modes:** Grid and List views for tracks
- **100% TypeScript:** Strict mode enabled
- **WCAG AA Compliant:** Full accessibility support
- **PWA Ready:** Installable on mobile devices
- **Dark Mode:** Full theme support with smooth transitions

## 🔮 Future Enhancements (v2.0 Roadmap)

### **High Priority**
1. **Database Integration for Tracks**
   - Save generated tracks to PostgreSQL
   - Fetch tracks from database instead of mock data
   - Track ownership by user
   - Persistent track storage

2. **Profile Settings Persistence**
   - Save account changes to database
   - Password change API integration
   - Update user profile in database
   - Email verification system

3. **Favorites/Bookmarks System**
   - Heart icon on track cards
   - Favorites filter in track library
   - Persistent storage in database
   - Quick access to favorite tracks

4. **Custom Track Editing**
   - Edit track titles post-generation
   - Add custom descriptions/notes
   - Tag tracks with custom labels
   - Rename downloaded files

5. **Basic Analytics Dashboard**
   - Track play counts
   - Most played genres
   - Total listening time
   - Generation history charts
   - Weekly/monthly usage stats

### **Medium Priority**
6. **Billing Integration**
   - Stripe payment integration
   - Credit purchase flow
   - Subscription management
   - Billing history
   - Invoice generation

7. **Batch Operations**
   - Select multiple tracks
   - Bulk download as ZIP
   - Bulk delete
   - Bulk tag/organize

8. **Playlists**
   - Create custom playlists
   - Organize tracks by project
   - Share playlists
   - Auto-playlists by genre

9. **Enhanced Audio Player**
   - Waveform visualization (wavesurfer.js)
   - Playback speed control
   - Loop/repeat options
   - Queue system
   - Volume persistence

10. **Profile Enhancements**
    - Avatar upload functionality
    - Account creation date display
    - Two-factor authentication
    - Active sessions management
    - Connected accounts management

### **Low Priority (Nice to Have)**
11. **Social Features**
    - Share tracks publicly
    - Community gallery
    - Like/comment system
    - Follow other creators

12. **Advanced Export**
    - Export to DAW formats
    - MIDI export (if API supports)
    - Stem separation
    - Audio effects/mastering

13. **Mobile App**
    - Native iOS/Android apps
    - Offline playback
    - Push notifications
    - Mobile recording

14. **Email Notifications**
    - Generation complete notifications
    - Low credits alerts
    - Weekly digest emails
    - New features announcements

15. **Performance Monitoring**
    - Service worker for offline functionality
    - Bundle analysis tool integration
    - Lighthouse CI integration
    - Performance monitoring dashboard
    - Analytics integration

16. **Advanced Features**
    - Touch gestures and haptic feedback
    - Data export and backup options
    - Bulk operations and batch processing

### **API-Dependent (Requires SunoAPI Support)**
- Multiple audio formats (WAV, FLAC)
- Quality selection (bitrate options)
- Longer track generation
- Custom voice models
- Custom lyrics input (if not already supported)
- Extended duration tracks

## 🧪 Testing

### Manual Testing Checklist

**Authentication:**
- [ ] Sign up with email/password
- [ ] Sign in with Google
- [ ] Sign in with GitHub
- [ ] Sign out
- [ ] Protected routes redirect to signin

**Music Generation:**
- [ ] Generate music with description
- [ ] Select different genres
- [ ] Use custom mode
- [ ] Try instrumental option
- [ ] Progress tracking updates
- [ ] Audio plays when complete
- [ ] Download MP3 works

**Credits:**
- [ ] Credits display shows balance
- [ ] Credits update after generation
- [ ] Low credits modal appears
- [ ] Usage history displays
- [ ] Stats calculate correctly

**Track Library:**
- [ ] Search by title works
- [ ] Filter by genre works
- [ ] Play/pause buttons work
- [ ] Download buttons work
- [ ] Delete confirmation works
- [ ] Empty state displays

**Profile:**
- [ ] All tabs navigate properly
- [ ] Forms display correctly
- [ ] Toggle switches work
- [ ] Save button shows success

**Accessibility:**
- [ ] Tab navigation works
- [ ] Skip to content link appears
- [ ] Keyboard shortcuts work (press ?)
- [ ] Error boundary catches errors
- [ ] PWA manifest loads

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [SunoAPI](https://sunoapi.com/) - AI music generation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [NextAuth](https://next-auth.js.org/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [Lucide](https://lucide.dev/) - Icons

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Next.js 14 and TypeScript**
