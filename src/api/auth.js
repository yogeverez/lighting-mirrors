import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";
import { collection, addDoc, getFirestore } from "firebase/firestore";

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
const db = getFirestore(app);

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

  async addOrder(order) {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "orders"), order);
    console.log("Document written with ID: ", docRef.id);
    return docRef;
  }
}

export default new Auth();
