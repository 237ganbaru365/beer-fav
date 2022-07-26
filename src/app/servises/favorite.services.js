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

// FIXME: 自分が作成したポストにしかfav追加できない
export const getFavoritePostByUserId = async (userId) => {
  const q = query(favoriteColRef, where("userId", "==", userId));

  const snaphshot = await getDocs(q);

  let postIdArr = [];
  snaphshot.forEach((doc) => {
    postIdArr.push(doc.data().postId);
  });

  const q2 = query(postColRef, where(documentId(), "in", postIdArr));

  return getDocs(q2);
};

export const removeFavorite = (favId) => {
  const favDocRef = doc(db, COLLECTION_NAME, favId);
  return deleteDoc(favDocRef);
};
