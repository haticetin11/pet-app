
import { initializeApp,getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

 const firebaseConfig = {
  apiKey: "AIzaSyDtuKt71rUcUYPzd9JNj_GjlpbWaXY8YJ0",
  authDomain: "pet-app-a8358.firebaseapp.com",
  projectId: "pet-app-a8358",
  storageBucket: "pet-app-a8358.appspot.com",
  messagingSenderId: "844609664375",
  appId: "1:844609664375:web:1c02f0fb8b5e2348131d72"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// export const FIRESTORE_DB= getFirestore(FIREBASE_APP);
export default { app, auth, getApp, getAuth };

