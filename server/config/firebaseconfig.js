import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import dotenv from 'dotenv';
dotenv.config();

const firebaseConfig = {
  apiKey: 'AIzaSyDWYIPcyMs6BFSD86ZqKtEbIJ2rGW7FPig',
  authDomain: 'assetmanangement-kmutt.firebaseapp.com',
  projectId: 'assetmanangement-kmutt',
  storageBucket: 'assetmanangement-kmutt.appspot.com',
  messagingSenderId: '975454098090',
  appId: '1:975454098090:web:86aa5a6ec77d7d4938f6d3',
  measurementId: 'G-NK0D40MTL1',
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseConfig);
