import { db } from "../../firebase";

import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  documentId,
  deleteDoc,
  doc,
} from "firebase/firestore";

const COLLECTION_NAME = "favorites";
const favoriteColRef = collection(db, COLLECTION_NAME);
const postColRef = collection(db, "posts");

export const addFavorite = (postId, userId) => {
  const newFavorite = { postId, userId };
  return addDoc(favoriteColRef, newFavorite);
};

export const getFavoritePostByUserId = async (userId) => {
  const q = query(favoriteColRef, where("userId", "==", userId));

  const snaphsot = await getDocs(q);

  let postIdArr = [];
  snaphsot.forEach((doc) => {
    postIdArr.push(doc.data().postId);
  });

  const q2 = query(postColRef, where(documentId(), "in", postIdArr));

  return getDocs(q2);
};

export const removeFavorute = (id) => {
  const favDocRef = doc(db, COLLECTION_NAME, id);
  return deleteDoc(favDocRef);
};
