import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// import dotenv from 'dotenv';
// dotenv.config();

const firebaseConfig = {
  apiKey: 'AIzaSyBXaTLk_ps2ZhXsK3riFe1v5UBqkcWpQ9s',
  authDomain: 'asset-image-76457.firebaseapp.com',
  projectId: 'asset-image-76457',
  storageBucket: 'asset-image-76457.appspot.com',
  messagingSenderId: '834365093510',
  appId: '1:834365093510:web:893af0805ea927ee8ec307',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);
export { storage, firebaseApp };
