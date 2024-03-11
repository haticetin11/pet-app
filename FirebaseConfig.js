
import { initializeApp,getApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import { initializeAuth, getAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyD6a2BxHlcioSZcpyCAl0tALcJQlADbPoM",
  authDomain: "pettty-15803.firebaseapp.com",
  projectId: "pettty-15803",
  storageBucket: "pettty-15803.appspot.com",
  messagingSenderId: "137801457895",
  appId: "1:137801457895:web:1c75efd97aaa1b8cc14242"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
// export const FIRESTORE_DB= getFirestore(FIREBASE_APP);
export default { app, auth, getApp, getAuth };

