# CV Builder Mobile App 📄

A modern, responsive CV/Resume builder application with real-time preview, multiple templates, and cloud synchronization.

## 🌟 Features

- **User Authentication** - Secure sign up/sign in with Supabase
- **Real-time Preview** - See your CV update as you type
- **Multiple Templates** - Choose from 8 professional CV layouts
- **Auto-save** - Your data is automatically saved to the cloud
- **PDF Export** - Download your CV as a professional PDF
- **Dark/Light Theme** - Toggle between themes for comfortable editing
- **Responsive Design** - Works seamlessly on mobile, tablet, and desktop

## 🚀 Quick Start

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
