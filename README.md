# Whiscash

A modern web application built with React, TypeScript, and Vite.

## 📝 Product Description

Whiscash is a modern personal finance management app with multi-wallet support, analytics dashboards, transaction tracking, and secure authentication. It features real-time analytics, responsive design, and PWA support.

## 🚀 Features

- Multi-wallet management with different currencies
- Financial dashboard with interactive charts (Pie, Bar, etc.)
- Transaction tracking, filtering, and categorization
- Secure authentication (Clerk)
- Real-time analytics and event tracking (PostHog)
- Responsive, mobile-first UI
- PWA support (installable app)
- Data fetching and caching (React Query)
- Form validation (React Hook Form + Zod)
- Smooth animations (Motion)
- Modular, reusable components (modals, selectors, carousels, loaders, etc.)
- Country/currency selection, date/time pickers, image input
- Archive, filter, and search features for transactions and wallets

## 📦 Prerequisites

- Node.js (Latest LTS version recommended)
- Yarn package manager

## 🛠️ Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/whiscash.git
cd whiscash
```

2. Install dependencies:

```bash
yarn install
```

3. Create a `.env` file in the root directory and add your environment variables:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_WHISCASH_BE_URL=your_backend_url
VITE_PUBLIC_POSTHOG_KEY=your_posthog_key
VITE_PUBLIC_POSTHOG_HOST=your_posthog_host
```

## 🔧 Development

To start the development server:

```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier

## 📚 Tech Stack

- [React 19](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Vite](https://vitejs.dev/) - Build Tool
- [Clerk](https://clerk.com/) - Authentication
- [React Query](https://tanstack.com/query/latest) - Data Fetching
- [React Hook Form](https://react-hook-form.com/) - Form Management
- [Zod](https://zod.dev/) - Schema Validation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Motion](https://motion.dev/) - Animations
- [PostHog](https://posthog.com/) - Analytics
- [MUI](https://mui.com/) - Material UI components (Pie Chart mainly)
- [D3](https://d3js.org/) - Charts (Custom scrollable bar chart)
- [Swiper](https://swiperjs.com/) - Carousels
- [Virtua](https://virtuajs.dev/) - Virtualized lists
- [Country Flag Icons](https://www.npmjs.com/package/country-flag-icons), [ISO Country Currency](https://www.npmjs.com/package/iso-country-currency)
- [Axios](https://axios-http.com/) - API requests

## 📱 PWA Support

This application includes PWA (Progressive Web App) support through `vite-plugin-pwa`, allowing users to install it as a standalone application on supported devices.

## 🔒 Environment Variables

The following environment variables are required:

- `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk authentication publishable key
- `VITE_WHISCASH_BE_URL` - Backend API URL (e.g., http://localhost:9000)
- `VITE_PUBLIC_POSTHOG_KEY` - Your PostHog public key
- `VITE_PUBLIC_POSTHOG_HOST` - Your PostHog API host

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
