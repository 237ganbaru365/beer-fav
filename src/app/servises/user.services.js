import { db } from "../../firebase";

import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

const COLLECTION_NAME = "users";

// READ
export const getUserByAuthId = (authId) => {
  const userRef = doc(db, COLLECTION_NAME, authId);

  return getDoc(userRef);
};

// CREATE
// since users colection is stored by authId(userId), not random documentId
export const addUserByAuthId = (userData, authId) => {
  return setDoc(doc(db, COLLECTION_NAME, authId), userData);
};

export const addUserFavorite = (authId, newFavArr) => {
  const userRef = doc(db, COLLECTION_NAME, authId);

  return updateDoc(userRef, {
    favorites: arrayUnion(newFavArr),
  });
};

// DELETE
export const removeUserFavorite = (authId, newFavArr) => {
  const userRef = doc(db, COLLECTION_NAME, authId);

  return updateDoc(userRef, {
    favorites: arrayRemove(newFavArr),
  });
};
