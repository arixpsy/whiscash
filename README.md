# Whiscash

A modern web application built with React, TypeScript, and Vite.

## 📝 Product Description

Whiscash is a powerful personal finance management application that helps you take control of your financial life. With its intuitive interface and robust features, you can:

- **Multi-Wallet Management**: Create and manage multiple wallets in different currencies
- **Financial Dashboard**: Get a comprehensive overview of your finances with interactive charts and analytics
- **Transaction Tracking**: Keep track of your income and expenses across all your wallets
- **Secure Authentication**: Your financial data is protected with enterprise-grade security powered by Clerk
- **Responsive Design**: Access your finances on any device with our mobile-first design
- **Real-time Updates**: Stay up-to-date with your financial status through real-time data synchronization

Whether you're managing personal finances, tracking business expenses, or planning for the future, Whiscash provides the tools you need to make informed financial decisions.

## 🚀 Features

- Built with React 19 and TypeScript
- Fast development and build with Vite
- Authentication powered by Clerk
- Styling with Tailwind CSS
- Form handling with React Hook Form and Zod validation
- API data fetching with React Query
- Smooth animations with Motion
- Responsive design
- PWA support

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
VITE_WHISCASH_BE_URL=your_be_url
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

- [React](https://react.dev/) - UI Library
- [TypeScript](https://www.typescriptlang.org/) - Programming Language
- [Vite](https://vitejs.dev/) - Build Tool
- [Clerk](https://clerk.com/) - Authentication
- [React Query](https://tanstack.com/query/latest) - Data Fetching
- [React Hook Form](https://react-hook-form.com/) - Form Management
- [Zod](https://zod.dev/) - Schema Validation
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Motion](https://motion.dev/) - Animations

## 📱 PWA Support

This application includes PWA (Progressive Web App) support through `vite-plugin-pwa`, allowing users to install it as a standalone application on supported devices.

## 🔒 Environment Variables

The following environment variables are required:

- `VITE_CLERK_PUBLISHABLE_KEY` - Your Clerk authentication publishable key
- `VITE_WHISCASH_BE_URL` - Backend API URL (e.g., http://localhost:9000)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
