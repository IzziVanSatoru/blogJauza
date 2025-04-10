import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

// Ambil konfigurasi Firebase dari environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Menyiapkan Auth dan Google Auth Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Fungsi untuk login dengan Google menggunakan pop-up
const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Fungsi untuk logout
const logout = () => {
  return firebaseSignOut(auth);
};

// Export semua fungsi yang diperlukan
export { auth, provider, loginWithGoogle, logout };
