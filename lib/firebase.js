// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_au0ubE5bCj8i35Ra_UdOB-GDT4WSars",
  authDomain: "framehub-1124a.firebaseapp.com",
  projectId: "framehub-1124a",
  storageBucket: "framehub-1124a.firebasestorage.app",
  messagingSenderId: "776507228067",
  appId: "1:776507228067:web:de0e12c617055602caa416",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
