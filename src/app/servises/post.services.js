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
} from "firebase/firestore";

const COLLECTION_NAME = "posts";
const postColRef = collection(db, COLLECTION_NAME);

// CREATE
export const addPost = (newPost) => {
  return addDoc(postColRef, newPost);
};

// READ
export const getAllPost = async () => {
  const data = await getDocs(postColRef);
  return data.docs.map((doc) => ({ ...doc.data(), postId: doc.id }));
};

export const getPost = (postId) => {
  const postDocRef = doc(db, COLLECTION_NAME, postId);
  return getDoc(postDocRef);
};

export const getPostByUserId = (userId) => {
  const q = query(postColRef, where("userId", "==", userId));

  return getDocs(q);
};

// UPDATE
export const updatePost = (id, updatedPost) => {
  const postDocRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(postDocRef, updatedPost);
};

// DELETE
export const deletePost = (postId) => {
  const postDocRef = doc(db, COLLECTION_NAME, postId);
  return deleteDoc(postDocRef);
};
