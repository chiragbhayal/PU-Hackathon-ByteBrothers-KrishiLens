import { initializeApp, getApps, getApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAIxZp5o2zyA77yYPRqJHvneUDyJxnBmxc",
  authDomain: "krishilens-2c868.firebaseapp.com",
  projectId: "krishilens-2c868",
  storageBucket: "krishilens-2c868.firebasestorage.app",
  messagingSenderId: "802235732793",
  appId: "1:802235732793:android:2b7637444b3564d9c2cee8"
};

// Initialize Firebase  
let app;
let auth;
let db;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
  db = getFirestore(app);
} catch (error) {
  console.error('Firebase initialization error:', error);
}

export { auth, db };

export default app;