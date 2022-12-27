import app from "../fbconfig";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  getFirestore,
  runTransaction,
  doc,
} from "firebase/firestore";
import { getOrderPdf } from "../common/forms/helpers";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyD9IcDq5ly9gGMfV5pGUVmIhRgjWnz_Gx8",
  authDomain: "lighting-mirrors.firebaseapp.com",
  projectId: "lighting-mirrors",
  storageBucket: "lighting-mirrors.appspot.com",
  messagingSenderId: "449563735692",
  appId: "1:449563735692:web:53a23e1ed490e921e06da9",
  measurementId: "G-PSCLQ0MC8Q",
};

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);

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
    const docRef = await addDoc(collection(db, "orders"), order);
    return docRef;
  }

  async updateOrderAfterPayment(orderId, requestId, status) {
    const docRef = doc(db, "orders", orderId);
    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(docRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        const paymentStatus = status;
        const paymentRequestId = requestId;

        transaction.update(docRef, { paymentStatus, paymentRequestId });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }

  async uploadOrderPdfs(values) {
    const englishPdf = await getOrderPdf(values, "english");
    const hebrewPdf = await getOrderPdf(values, "hebrew");
    const englishFileName = `order-english.pdf`;
    const englishPdfRef = ref(
      storage,
      `orders/${values.orderId}/${englishFileName}`
    );
    const hebrewFileName = `order-hebrew.pdf`;
    const hebrewPdfRef = ref(
      storage,
      `orders/${values.orderId}/${hebrewFileName}`
    );

    const metadata = {
      customMetadata: {
        email: values.email,
        business_name: values.business_name,
        first_name: values.first_name,
        surename: values.surename,
        phone: values.phone,
      },
    };

    await uploadBytes(englishPdfRef, englishPdf, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });

    await uploadBytes(hebrewPdfRef, hebrewPdf, metadata).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    return;
  }
}

export default new Auth();
