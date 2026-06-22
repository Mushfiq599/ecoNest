<div align="center">

<img src="https://img.shields.io/badge/EcoNest-Sustainable%20Living-2D6A4F?style=for-the-badge&logo=leaf&logoColor=white" alt="EcoNest" />

# 🌿 EcoNest — Sustainable Living, Simplified

**An AI-powered full-stack platform for discovering eco-friendly products, tracking environmental impact, and living greener.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.3.1-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-7.5.6-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

[Live Demo](https://econest.vercel.app) · [Report Bug](https://github.com/yourusername/econest/issues) · [Request Feature](https://github.com/yourusername/econest/issues)

![EcoNest Banner](https://placehold.co/1200x400/2D6A4F/D8F3DC?text=EcoNest+%E2%80%94+Sustainable+Living%2C+Simplified&font=inter)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Pages & Routes](#-pages--routes)
- [Authentication](#-authentication)
- [Color Theme](#-color-theme)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌱 Overview

EcoNest is a production-ready, AI-powered sustainable living platform built with the latest web technologies. It helps users:

- 🛒 **Discover** verified eco-friendly products across 4 categories
- 🤖 **Get AI recommendations** powered by Google Gemini
- 📊 **Track** their personal carbon footprint and environmental impact
- 👤 **Manage** their sustainability journey through role-based dashboards

---

## ✨ Features

### 🏠 Public Pages
| Page | Description |
|------|-------------|
| **Homepage** | Hero with AI search, features, categories, stats, testimonials, blog, newsletter, FAQ, CTA |
| **Explore** | Product listing with search, filters, sorting, and pagination |
| **Product Detail** | Full product page with images, specs, reviews, and related items |
| **About** | Company mission and team |
| **Blog** | Sustainability articles and guides |
| **FAQ** | Accordion-style frequently asked questions |
| **Contact** | Contact form with EmailJS integration |

### 🔐 Authentication
| Feature | Details |
|---------|---------|
| Email/Password | Full sign-up with email verification code |
| Google OAuth | One-click Google sign-in/sign-up |
| Password Strength Meter | Real-time 4-level strength indicator |
| Demo Account | Quick access button for testing |
| Protected Routes | Middleware-based route protection |

### 👤 User Dashboard
| Page | Description |
|------|-------------|
| **Overview** | Stats cards, AI usage chart, impact line chart, recent activity |
| **Profile** | Editable user information form |
| **Impact Tracker** | Carbon footprint charts and CO₂ savings |
| **AI History** | Full log of AI interactions |

### 🛡️ Admin Dashboard
| Page | Description |
|------|-------------|
| **Overview** | Platform analytics, revenue charts, user stats |
| **Users** | User management with CRUD operations |
| **Products** | Product CRUD with eco-score management |
| **Analytics** | Advanced analytics with bar, line, and pie charts |
| **AI Logs** | AI query logs with filtering |

### 🤖 AI Features
| Feature | Description |
|---------|-------------|
| **AI Search** | Natural language product search powered by Gemini |
| **Eco Analyzer** | Personalized carbon impact analysis |
| **Smart Recommendations** | Context-aware eco product suggestions |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Next.js](https://nextjs.org/) | 16.2.9 | React framework with App Router |
| [React](https://react.dev/) | 19.2.4 | UI library |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [HeroUI](https://heroui.com/) | 3.2.1 | Primary UI component library |
| [Tailwind CSS](https://tailwindcss.com/) | 4.3.1 | Utility-first CSS framework |
| [Framer Motion](https://www.framer.com/motion/) | 12.x | Animations |
| [Clerk](https://clerk.com/) | 7.5.6 | Authentication & user management |
| [TanStack Query](https://tanstack.com/query) | 5.x | Server state management |
| [Zustand](https://zustand-demo.pmnd.rs/) | 5.x | Client state management |
| [React Hook Form](https://react-hook-form.com/) | 7.x | Form handling |
| [Zod](https://zod.dev/) | 4.x | Schema validation |
| [Recharts](https://recharts.org/) | 3.x | Data visualization |
| [Lucide React](https://lucide.dev/) | 1.x | Icon library |
| [Axios](https://axios-http.com/) | 1.x | HTTP client |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4.x | Dark mode |

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| [Node.js](https://nodejs.org/) | 20.x | Runtime |
| [Express.js](https://expressjs.com/) | 4.x | Web framework |
| [TypeScript](https://www.typescriptlang.org/) | 5.x | Type safety |
| [MongoDB](https://www.mongodb.com/) | — | Database |
| [Mongoose](https://mongoosejs.com/) | 8.x | ODM |
| [Google Gemini AI](https://ai.google.dev/) | — | AI recommendations |
| [JWT](https://jwt.io/) | — | Token authentication |
| [Svix](https://www.svix.com/) | 1.x | Webhook verification |

### Infrastructure
| Service | Purpose |
|---------|---------|
| [Vercel](https://vercel.com/) | Frontend hosting |
| [Render](https://render.com/) | Backend hosting |
| [MongoDB Atlas](https://www.mongodb.com/atlas) | Database hosting |
| [Clerk](https://clerk.com/) | Auth provider |
| [Google AI Studio](https://aistudio.google.com/) | Gemini API |

---

## 📁 Project Structure

```
econest/                          # Frontend (Next.js)
├── src/
│   ├── app/
│   │   ├── (auth)/               # Auth route group
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (public)/             # Public route group
│   │   │   ├── page.tsx          # Homepage
│   │   │   ├── explore/
│   │   │   ├── products/[id]/
│   │   │   ├── about/
│   │   │   ├── blog/
│   │   │   ├── contact/
│   │   │   └── faq/
│   │   ├── (dashboard)/
│   │   │   ├── user/             # User dashboard
│   │   │   │   ├── page.tsx
│   │   │   │   ├── profile/
│   │   │   │   ├── impact/
│   │   │   │   └── ai-history/
│   │   │   └── admin/            # Admin dashboard
│   │   │       ├── page.tsx
│   │   │       ├── users/
│   │   │       ├── products/
│   │   │       ├── analytics/
│   │   │       └── ai-logs/
│   │   ├── api/auth/webhook/     # Clerk webhook
│   │   ├── sso-callback/         # OAuth callback
│   │   ├── layout.tsx            # Root layout
│   │   ├── providers.tsx         # App providers
│   │   └── globals.css           # Global styles
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── sections/             # Homepage sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── CategoriesSection.tsx
│   │   │   ├── StatisticsSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── BlogSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── cards/
│   │   │   └── ProductCard.tsx
│   │   ├── forms/
│   │   │   ├── SearchForm.tsx
│   │   │   └── ProductForm.tsx
│   │   ├── ai/
│   │   │   ├── AISearch.tsx
│   │   │   └── EcoAnalyzer.tsx
│   │   └── ui/
│   │       ├── ThemeToggle.tsx
│   │       ├── Skeleton.tsx
│   │       └── Button.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useProducts.ts
│   │   ├── useAI.ts
│   │   └── useDebounce.ts
│   ├── lib/
│   │   ├── api/client.ts
│   │   ├── utils/helpers.ts
│   │   └── validations/schemas.ts
│   ├── store/
│   │   ├── productStore.ts
│   │   └── uiStore.ts
│   ├── types/index.ts
│   └── proxy.ts                  # Next.js 16 middleware
├── public/
├── .env.local
├── .env.example
├── next.config.mjs
├── postcss.config.mjs
├── tailwind.config.js
└── tsconfig.json

econest-backend/                  # Backend (Express.js)
├── src/
│   ├── controllers/
│   │   ├── productController.ts
│   │   ├── userController.ts
│   │   ├── aiController.ts
│   │   └── authController.ts
│   ├── models/
│   │   ├── Product.ts
│   │   ├── User.ts
│   │   ├── AIHistory.ts
│   │   └── ImpactLog.ts
│   ├── routes/
│   │   ├── productRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── aiRoutes.ts
│   │   └── authRoutes.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── rateLimiter.ts
│   ├── services/
│   │   ├── geminiService.ts
│   │   ├── productService.ts
│   │   └── impactService.ts
│   ├── config/
│   │   ├── database.ts
│   │   └── constants.ts
│   └── app.ts
├── .env
├── .env.example
├── package.json
├── tsconfig.json
└── nodemon.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.x or higher
- **npm** 10.x or higher
- **MongoDB Atlas** account
- **Clerk** account
- **Google AI Studio** account (for Gemini API)

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/econest.git
cd econest
```

### 2. Install frontend dependencies

```bash
cd econest
npm install
```

### 3. Install backend dependencies

```bash
cd econest-backend
npm install
```

### 4. Configure environment variables

```bash
# Frontend
cp .env.example .env.local
# Fill in your values (see Environment Variables section)

# Backend
cp .env.example .env
# Fill in your values
```

### 5. Run development servers

```bash
# Terminal 1 — Frontend
cd econest && npm run dev

# Terminal 2 — Backend
cd econest-backend && npm run dev
```

Visit `http://localhost:3000` for the frontend and `http://localhost:5000` for the backend.

---

## 🔑 Environment Variables

### Frontend — `.env.local`

```env
# Clerk Auth — https://dashboard.clerk.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/register
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/user
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/user

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=EcoNest
```

### Backend — `.env`

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB Atlas — https://cloud.mongodb.com
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/econest

# JWT — generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Google Gemini — https://aistudio.google.com/app/apikey
GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxx

# Clerk
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
CLERK_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# CORS
CLIENT_URL=http://localhost:3000
```

---

## 🗺️ Pages & Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Homepage with all sections |
| `/explore` | Public | Product catalogue with filters |
| `/products/[id]` | Public | Product detail page |
| `/about` | Public | About EcoNest |
| `/blog` | Public | Sustainability blog |
| `/faq` | Public | Frequently asked questions |
| `/contact` | Public | Contact form |
| `/login` | Guest only | Sign in page |
| `/register` | Guest only | Sign up page |
| `/user` | Auth | User dashboard overview |
| `/user/profile` | Auth | Edit profile |
| `/user/impact` | Auth | Carbon impact tracker |
| `/user/ai-history` | Auth | AI interaction history |
| `/admin` | Admin | Admin dashboard |
| `/admin/users` | Admin | User management |
| `/admin/products` | Admin | Product management |
| `/admin/analytics` | Admin | Platform analytics |
| `/admin/ai-logs` | Admin | AI query logs |

---

## 🔐 Authentication

EcoNest uses **Clerk v7** for authentication with the following flow:

```
User visits protected route
        ↓
proxy.ts middleware checks session
        ↓
No session → redirect to /login
        ↓
User signs in (email/password or Google OAuth)
        ↓
Clerk creates session → redirect to /user
        ↓
Clerk webhook fires → syncs user to MongoDB
        ↓
Role checked (user | admin) → correct dashboard shown
```

**Demo Credentials** (for testing):
| Role | Email | Password |
|------|-------|---------|
| User | demo@econest.com | Demo@12345 |
| Admin | admin@econest.com | Admin@12345 |

---

## 🎨 Color Theme

EcoNest uses the **Forest Calm** palette:

| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#2D6A4F` | Buttons, links, accents |
| Primary Light | `#74C69D` | Hover states, icons |
| Primary Dark | `#1B4332` | Footer, dark elements |
| Accent | `#D8F3DC` | Backgrounds, badges |
| Surface | `#FFFFFF` | Cards, modals |
| Background | `#F9FAFB` | Page background |

Dark mode variants are defined via CSS custom properties on `.dark` class.

---

## 🚢 Deployment

### Frontend → Vercel

```bash
# 1. Push to GitHub
git add . && git commit -m "feat: initial deployment" && git push

# 2. Go to vercel.com → New Project → Import your repo
# 3. Framework preset: Next.js (auto-detected)
# 4. Add all environment variables from .env.local
# 5. Deploy
```

### Backend → Render

```bash
# 1. Push econest-backend to a separate GitHub repo
# 2. Go to render.com → New → Web Service
# 3. Connect your backend repo
# 4. Settings:
#    Build Command: npm install && npm run build
#    Start Command: npm start
#    Environment: Node
# 5. Add all environment variables from .env
# 6. Deploy
```

### Database → MongoDB Atlas

```bash
# 1. Create cluster at cloud.mongodb.com
# 2. Database Access → Add user with readWrite role
# 3. Network Access → Add 0.0.0.0/0 (allow all) or Render's IP
# 4. Connect → Drivers → Copy connection string
# 5. Add to MONGODB_URI in your .env files
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

```bash
# 1. Fork the repository
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit your changes
git commit -m 'feat: add amazing feature'

# 4. Push to the branch
git push origin feature/amazing-feature

# 5. Open a Pull Request
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

Made with 🌱 by **Mushfiq** — BSc CSE, UITS

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat-square&logo=github&logoColor=white)](https://github.com/yourusername)

*Every sustainable choice counts. EcoNest makes it easier to make them.*

</div>
