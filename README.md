# CV Builder Mobile App 📄

A modern, responsive CV/Resume builder application with real-time preview, multiple templates, and cloud synchronization. Available as **web**, **Android**, and **iOS** app via Capacitor.

## 🌟 Features

- **User Authentication** - Secure sign up/sign in with Supabase
- **Real-time Preview** - See your CV update as you type
- **Multiple Templates** - Choose from 8 professional CV layouts
- **Auto-save** - Your data is automatically saved to the cloud
- **PDF Export** - Download your CV as a professional PDF
- **Dark/Light Theme** - Toggle between themes for comfortable editing
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- **Native Mobile Apps** - Build for Android and iOS using Capacitor

## 🚀 Quick Start

### Web Development

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Copy `.env.example` to `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:5000`

### Android App

**Prerequisites:**
- Android Studio installed
- JDK 11+
- Android SDK (API level 24+)

**Build & Run:**

```bash
# Build web assets for production
npm run build

# Sync assets to Android project
npx cap sync android

# Open Android Studio and build/run
npx cap open android
```

Or via Android Studio:
1. Open `android/` folder in Android Studio
2. Click "Run" or connect a device/emulator
3. App will build and install

### iOS App

**Prerequisites:**
- macOS with Xcode installed
- CocoaPods

**Build & Run:**

```bash
# Build web assets for production
npm run build

# Add iOS platform (if not already added)
npx cap add ios

# Sync assets to iOS project
npx cap sync ios

# Open Xcode and build/run
npx cap open ios
```

Or via Xcode:
1. Open `ios/App/App.xcworkspace` in Xcode
2. Select your target device
3. Click "Run" to build and deploy
   ```bash
   npm start
   ```

4. **Open browser**
   Navigate to `http://localhost:5173`

## 📚 Full Documentation

See the [main README](../README.md) in the root directory for complete setup instructions, Supabase configuration, and project details.

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server (alias)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Tech Stack

- React 19.1.1
- Vite 7.1.7
- Supabase
- html2pdf.js

---

Built with ❤️ using React and Vite
