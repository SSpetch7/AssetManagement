import {
  getStorage,
  ref,
  getDownloadURL,
  //   getImageFromStorage,
  uploadBytesResumable,
} from 'firebase/storage';

var Image2 = (image) => {};

import firebaseApp from '../config/firebase.js';

const storage = getStorage(firebaseApp);

const Image = {
  upload: async (file) => {
    const fileName = `${Date.now()}_${file.originalname}`;
    const storageRef = ref(storage, `images/${fileName}`);

    await uploadBytes(storageRef, file.buffer);

    const downloadUrl = await Image.getDownloadUrl(fileName);
    return { fileName, downloadUrl };
  },

  getDownloadUrl: async (fileName) => {
    const storageRef = ref(storage, `${fileName}`);

    const downloadUrl = await getDownloadURL(storageRef);
    return downloadUrl;
  },
};

export default Image;
