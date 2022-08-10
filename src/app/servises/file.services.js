import { storage } from "../../firebase";

import {
  getDownloadURL,
  getMetadata,
  ref,
  uploadBytes,
} from "firebase/storage";

export const addFileToStorage = async (fileData, fileName) => {
  const imgRef = ref(storage, `images/${fileName}`);
  return await uploadBytes(imgRef, fileData);
};

export const getFileUrlFromStorage = async (fileName) => {
  const imgRef = ref(storage, `images/${fileName}`);
  return await getDownloadURL(imgRef);
};

export const getFileDataFromStorage = async (fileName) => {
  const imgRef = ref(storage, `images/${fileName}`);
  return await getMetadata(imgRef);
};
