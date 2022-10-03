import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";

export const firebaseConfig = {
  apiKey: "AIzaSyD9IcDq5ly9gGMfV5pGUVmIhRgjWnz_Gx8",
  authDomain: "lighting-mirrors.firebaseapp.com",
  projectId: "lighting-mirrors",
  storageBucket: "lighting-mirrors.appspot.com",
  messagingSenderId: "449563735692",
  appId: "1:449563735692:web:53a23e1ed490e921e06da9",
  measurementId: "G-PSCLQ0MC8Q",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = initializeAuth(app, {
  // persistence: browserSessionPersistence,
  popupRedirectResolver: undefined,
});

class Auth {
  constructor() {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
    });
  }

  async signInWithProvider(provider, providerTenant) {}
}

export default new Auth();
