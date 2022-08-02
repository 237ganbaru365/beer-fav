import { db } from "../../firebase";

import { doc, getDoc, setDoc } from "firebase/firestore";

const COLLECTION_NAME = "users";

// CREATE
export const addUserByUserId = async (userData, userId) => {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);

    return await setDoc(userDocRef, userData);
  } catch (error) {
    throw error;
  }
};

// READ
export const getUserByUserId = async (userId) => {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);

    return await getDoc(userDocRef);
  } catch (error) {
    throw error;
  }
};
