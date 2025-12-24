# Care - Professional Service Booking Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.7-orange?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Stripe](https://img.shields.io/badge/Stripe-20.1-blueviolet?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

**Care** is a modern, high-performance service booking platform designed to provide trusted care for families. Built with the latest web technologies, it offers a seamless experience for both users looking for services and administrators managing operations.

![Project Overview](./Screenshot%202025-12-25%20at%2012.02.11%20AM.png)

---

## 🚀 Key Features

- **Service Management**: Dynamic service listings with detailed descriptions and pricing.
- **Secure Booking System**: Streamlined booking flow with real-time availability.
- **Integrated Payments**: Secure transactions powered by **Stripe**.
- **Unified Admin Dashboard**: A comprehensive control panel for managing services, users, bookings, and site content.
- **Dynamic Content**: CMS-like capabilities for managing sliders, testimonials, and about sections.
- **Role-Based Access**: Secure authentication with distinct paths for Users and Administrators.
- **Responsive Design**: Polished UI built with Tailwind CSS and Framer Motion for smooth animations.

---

## 🛠️ Technology Stack

- **Frontend**: 
  - **Next.js 16 (App Router)**: Utilizing Server Components and modern routing.
  - **React 19**: Leveraging the newest React features for optimal state management.
  - **Tailwind CSS 4**: For high-performance, utility-first styling.
  - **Framer Motion**: For fluid and engaging micro-interactions.
  - **Swiper.js**: For high-performance touch sliders.
- **Backend & Database**:
  - **Firebase Firestore**: Real-time NoSQL database for flexible data modeling.
  - **Firebase Admin SDK**: Secure server-side data operations within Next.js API routes.
  - **Firebase Auth**: Robust authentication system with support for multiple providers.
- **Payments**:
  - **Stripe**: Enterprise-grade payment processing with webhook integration.

---

## 🏗️ Architecture & Technical Skills

This project demonstrates advanced proficiency in **Next.js** and full-stack development. The architecture is built on three main pillars:

### 1. API-First Data Layer
Instead of direct client-side database calls, the application uses **Next.js API Routes** as a secure bridge. This ensures:
- **Security**: Database credentials and Firebase Admin logic are never exposed to the client.
- **Consistency**: Centralized business logic for processing bookings and managing users.

### 2. State & Auth Management
- **AuthContext**: A unified authentication provider that handles session persistence and role-based redirects.
- **Custom Hooks**: specialized hooks for data fetching and UI state, keeping components clean and reusable.

### 3. Professional Admin Control Panel
The `/control-panel` route is a full-featured administrative system that demonstrates:
- **CRUD Operations**: Securely managing complex data structures in Firestore.
- **Real-time Updates**: Immediate feedback loops for administrative actions.
- **System Monitoring**: Tracking total earnings and system activity.

### 4. Middleware Security
Implementation of `middleware.ts` to handle protected routes, ensuring that sensitive areas like the dashboard and control panel are locked behind robust authentication checks before a single component is rendered.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js 20+
- Firebase Project
- Stripe Account (for development)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/iamOmarFaruk/care.git
   cd care
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file and add your configuration (see `.env.example` if available).

4. **Run development server**:
   ```bash
   npm run dev
   ```

---

## 📈 Future Roadmap

- [ ] Multi-provider authentication (Google, Github).
- [ ] Push notifications for booking updates.
- [ ] Advanced analytics dashboard for admins.
- [ ] Mobile application using the same backend.

---

/*
 * ┌── o m a r ──┐
 * │ gh@iamOmarFaruk
 * │ omarfaruk.dev
 * │ Created: 25-12-24
 * │ Updated: 25-12-25
 * └─ care-app ──────┘
 */
