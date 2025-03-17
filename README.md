# Nikhilesh Suravarjjala Portfolio

![Portfolio Banner](public/hero-image.png)

## Overview

This is my professional portfolio website showcasing my skills, projects, and experience as a software engineer. Built with modern technologies and best practices, this portfolio site features a sleek user interface with interactive elements and a comprehensive admin dashboard for easy content management.

## Features

- **Responsive Design:** Optimal viewing experience across all devices
- **Dynamic Content:** Projects, experience, and skills loaded from hardcoded data
- **Interactive UI:** Smooth animations and transitions using Framer Motion
- **Admin Dashboard:** Secure content management system (commented out)
- **Authentication:** (commented out)
- **Cloud Storage:** (commented out)
- **Performance Optimized:** Fast loading and rendering

## Technologies

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion
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
├── admin/          # Admin dashboard components (commented out)
├── assets/         # Static assets
├── components/     # Reusable UI components
├── constants/      # Default data and constants
├── context/        # React context providers
├── firebase/       # Firebase configuration (commented out)
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

## Recent Changes: Switched to Hardcoded Data

As of the latest update, this portfolio website has been modified to use hardcoded data instead of Firebase for improved reliability and consistency across devices. All admin functionality has been commented out but preserved in the codebase for reference.

### Why We Made This Change:

1. **Consistent Data Display**: Ensures the same content appears on all devices without relying on Firebase or browser caches
2. **Simplified Architecture**: Removes dependencies on external services for basic content display
3. **Improved Performance**: Loads content instantly without network requests
4. **Easier Maintenance**: To update content, simply modify the hardcoded data in the dataService.ts file

### How to Add/Update Content:

To update or add content, modify the relevant data objects in `/src/services/dataService.ts`. This includes:
- Projects
- Technologies
- Experiences
- About information
- Contact details
- Testimonials

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

### Latest Update
- Switched to hardcoded data for improved reliability and consistency

## Deployment

This project is automatically deployed to Vercel whenever changes are pushed to the main branch.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Three.js](https://threejs.org/) for 3D graphics
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations
- [Firebase](https://firebase.google.com/) for backend services (commented out)

---

Designed and developed by Nikhilesh Suravarjjala 2025
