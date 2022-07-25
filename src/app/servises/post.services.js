import { db } from "../../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  documentId,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";
const postColRef = collection(db, COLLECTION_NAME);

// CREATE
export const addPost = (newPost) => {
  return addDoc(postColRef, newPost);
};

// get user favorite posts
// FIXME: favArrの中身がない状態で、favoriteページに飛ぶと、エラーが発生している！
export const getFavPosts = async (favArr) => {
  if (favArr.length > 0) {
    const q = query(postColRef, where(documentId(), "in", favArr));
    return await getDocs(q);
  }
  return;
};

// READ
export const getAllPost = () => {
  return getDocs(postColRef);
};

export const getPost = (id) => {
  const postDocRef = doc(db, COLLECTION_NAME, id);
  return getDoc(postDocRef);
};

// UPDATE
export const updatePost = (id, updatedPost) => {
  const postDocRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(postDocRef, updatedPost);
};

// DELETE
export const deletePost = (id) => {
  const postDocRef = doc(db, COLLECTION_NAME, id);
  return deleteDoc(postDocRef);
};
