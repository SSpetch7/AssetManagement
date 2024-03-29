import React, { useState, useEffect, useRef } from 'react';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '../../firebaseconfig';
import blankImage from '../../assets/blank_images.png';

async function downloadImages(assetID) {
  try {
    const folderRef = ref(storage, `${assetID}`);
    const folderSnapshot = await listAll(folderRef);

    const imageURLs = [];
    for (const itemRef of folderSnapshot.items) {
      const downloadURL = await getDownloadURL(itemRef);
      imageURLs.push(downloadURL);
    }
    if (imageURLs.length < 4) {
      let loop = 3 - imageURLs.length;
      for (let i = 0; i < loop; i++) {
        imageURLs.push(blankImage);
      }
    }

    return imageURLs;
  } catch (error) {
    console.error('Error getting images from Firebase Storage:', error);
    throw error;
  }
}
export default downloadImages;
