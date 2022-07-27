import { db } from "../../firebase";

import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  documentId,
  getDoc,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { getPost } from "./post.services";

const COLLECTION_NAME = "users";
const userColRef = collection(db, COLLECTION_NAME);

// READ
export const getUserByAuthId = (authId) => {
  const userRef = doc(db, COLLECTION_NAME, authId);

  return getDoc(userRef);
};

// CREATE
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
