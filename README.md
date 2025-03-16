# Nikhilesh Suravarjjala Portfolio

![Portfolio Banner](public/hero-image.png)

## Overview

This is my professional portfolio website showcasing my skills, projects, and experience as a software engineer. Built with modern technologies and best practices, this portfolio site features a sleek user interface with interactive elements and a comprehensive admin dashboard for easy content management.

## Features

- **Responsive Design:** Optimal viewing experience across all devices
- **Dynamic Content:** Projects, experience, and skills loaded from Firebase
- **Interactive UI:** Smooth animations and transitions using Framer Motion
- **Admin Dashboard:** Secure content management system
- **Authentication:** Firebase authentication for secure admin access
- **Cloud Storage:** Firebase Firestore for persistent data storage
- **Performance Optimized:** Fast loading and rendering

## Technologies

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Firebase (Authentication, Firestore)
- **Deployment:** Vercel
- **Build Tool:** Vite
- **Other:** React Router, React Tilt, Three.js (for 3D elements)

## Motivation

This portfolio serves as a digital representation of my professional journey and skills. It's designed to:

1. Showcase my technical abilities and projects
2. Provide potential employers and clients with a comprehensive view of my work
3. Demonstrate my understanding of modern web development best practices
4. Serve as a platform for continuous professional growth

## Project Structure

```
src/
├── admin/          # Admin dashboard components
├── assets/         # Static assets
├── components/     # Reusable UI components
├── constants/      # Default data and constants
├── context/        # React context providers
├── firebase/       # Firebase configuration
├── pages/          # Page components
├── services/       # Service layer for data fetching
├── styles/         # Global styles
├── types/          # TypeScript type definitions
└── utils/          # Utility functions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/nikhilesh-s/NikhileshSuravarjjalaPortfolioWebsite.git
cd NikhileshSuravarjjalaPortfolioWebsite
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser

## Environment Variables

To run this project with Firebase functionality, you need to set up the following environment variables:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Firebase Integration

This portfolio website uses Firebase for authentication and data storage. All editor components in the admin dashboard have been updated to use Firebase for real-time data persistence:

- **Authentication:** Secure admin login using Firebase Authentication
- **Data Storage:** All portfolio data stored in Firestore collections
- **Fallback Mechanism:** localStorage used as fallback when Firebase is unavailable
- **Error Handling:** Comprehensive error handling for API operations
- **Loading States:** Visual indicators during data loading and saving operations

### Firebase Configuration

Firebase is configured to work on both local development and production environments. The application uses environment variables with fallbacks to ensure proper configuration across environments.

For security reasons, Firebase Authentication is configured to only accept requests from authorized domains. If you encounter authentication errors, ensure your domain is added to the Firebase Console's authorized domains list.

### Editor Components

The following editor components have been updated to use Firebase:

- **AboutEditor:** Manages about section content
- **ProjectEditor:** Handles project portfolio entries
- **ExperienceEditor:** Manages professional experience entries
- **ContactEditor:** Updates contact information
- **HeroEditor:** Manages hero section content
- **FeedbacksEditor:** Handles testimonials and feedback entries
- **ResumeEditor:** Updates resume information and skills
- **CertificationsEditor:** Manages certification entries
- **JourneyEditor:** Controls the personal journey timeline

Each editor implements:
- Data fetching from Firebase with loading indicators
- Error handling with user feedback
- Fallback to localStorage when Firebase operations fail
- Automatic data persistence on save

## Change History

### March 2023
- Initialized portfolio website with React, TypeScript and Tailwind CSS
- Created responsive layout and core components
- Implemented localStorage for data persistence

### April 2023
- Added admin dashboard with authentication
- Implemented first version of editor components
- Added 3D elements using Three.js

### February-March 2025
- Migrated data storage from localStorage to Firebase
- Fixed authentication issues in production environment
- Improved error handling and loading states
- Added comprehensive README documentation

## Deployment

This project is automatically deployed to Vercel whenever changes are pushed to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Three.js](https://threejs.org/) for 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Firebase](https://firebase.google.com/) for backend services

---

Designed and developed by Nikhilesh Suravarjjala 2025
