import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
 apiKey: "AIzaSyBPn4A23TXQjsc7gE2lTy9vq56rQCr6Q6g",
  authDomain: "stockanalytics-f310e.firebaseapp.com",
  projectId: "stockanalytics-f310e",
  storageBucket: "stockanalytics-f310e.firebasestorage.app",
  messagingSenderId: "491172063523",
  appId: "1:491172063523:web:58836dfa0900b494fbc496",
  measurementId: "G-5SBCG822NP"
};

// Initialize Firebase (zabezpieczenie przed wielokrotną inicjalizacją w Next.js)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Analytics tylko po stronie klienta (Next.js App Router)
let analytics: ReturnType<typeof getAnalytics> | null = null;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
