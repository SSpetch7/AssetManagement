import {
  getStorage,
  ref,
  getDownloadURL,
  //   getImageFromStorage,
  uploadBytesResumable,
} from 'firebase/storage';

import { initializeApp } from 'firebase-admin/app';

import firebaseApp from '../config/firebase.js';
const storage = getStorage(firebaseApp);

initializeApp();

const Image = {
  upload: async (file) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    const storageRef = ref(storage, `${fileName}`);

    await uploadBytes(storageRef, file.buffer);

    const downloadUrl = await Image.getDownloadUrl(fileName);
    return { fileName, downloadUrl };
  },

  getDownloadUrl: async (fileName) => {
    const storageRef = ref(storage, `${fileName}`);
    console.log(fileName);

    console.log(storageRef.bucket);
    console.log(storageRef.fullPath);
    console.log(storageRef.name);
    console.log(storageRef.parent);
    console.log(storageRef.root);
    console.log(storageRef.storage);

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  },
};

export default Image;
