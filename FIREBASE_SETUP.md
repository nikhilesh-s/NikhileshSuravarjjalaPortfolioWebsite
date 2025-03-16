# Firebase Setup for Portfolio

This guide explains how to set up Firebase for your portfolio website and integrate it with Vercel deployment.

## 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/) and click "Add project"
2. Name your project (e.g., "portfolio-website")
3. Follow the setup steps (you can disable Google Analytics if you prefer)
4. Once created, click on the web icon (</>) to add a web app
5. Register your app with a nickname (e.g., "portfolio-web")
6. Copy the Firebase configuration values for the next step

## 2. Set Up Firebase Authentication

1. In the Firebase Console, navigate to "Authentication" in the left sidebar
2. Click "Get started"
3. Enable "Email/Password" as a sign-in method
4. Add your email as a user with a secure password (you'll use this to log into your admin dashboard)

## 3. Configure Firestore Database

1. In the Firebase Console, navigate to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Start in production mode
4. Choose a location close to your target audience
5. Set up security rules (from the "Rules" tab) to only allow write access to authenticated users:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read data
    match /{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 4. Add Environment Variables to Vercel

During deployment, add these environment variables in your Vercel project settings:

- `VITE_FIREBASE_API_KEY`: Your Firebase API key
- `VITE_FIREBASE_AUTH_DOMAIN`: Your Firebase Auth domain
- `VITE_FIREBASE_PROJECT_ID`: Your Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET`: Your Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID`: Your Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID`: Your Firebase app ID

These values can be found in your Firebase project settings under "General" > "Your apps" > "SDK setup and configuration".

## 5. Testing Your Admin Dashboard

1. Once deployed, navigate to `/admin/login` on your website
2. Log in with the email and password you set up in Firebase Authentication
3. You should be able to access the admin dashboard and make changes to your portfolio content
4. Any changes made will be saved to Firebase and reflected in your live website automatically
