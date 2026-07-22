/* ========================================
   FIREBASE CONFIGURATION
   Divya Varma Chikitsai Maiyam
   ========================================
   
   This file initializes Firebase services.
   Config values are loaded from .env file reference.
   
   Services used:
   - Firestore: Contact form submissions & appointment bookings
   - Analytics: Website traffic tracking (optional)
   ======================================== */

// Firebase Configuration
// These values are from your .env file
const firebaseConfig = {
    apiKey: "AIzaSyApoIJcxQnhZbZkkj0uPbH1cC3kMFFZF5Y",
    authDomain: "divya-aea3a.firebaseapp.com",
    projectId: "divya-aea3a",
    storageBucket: "divya-aea3a.firebasestorage.app",
    messagingSenderId: "342460493732",
    appId: "1:342460493732:web:47233bfb8eb80da2c71b31"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Analytics (optional)
if (typeof firebase.analytics === 'function') {
    firebase.analytics();
}

console.log('✅ Firebase connected successfully!');
