import { db } from "../../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const COLLECTION_NAME = "posts";
const postColRef = collection(db, COLLECTION_NAME);

// CREATE
export const addPost = (newPost) => {
  return addDoc(postColRef, newPost);
};

// READ
export const getAllPost = () => {
  return getDocs(postColRef);
};

export const getPost = (id) => {
  const existPostRef = doc(db, COLLECTION_NAME, id);
  return getDoc(existPostRef);
};

// UPDATE
export const updatePost = (id, updatedPost) => {
  const existPostRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(existPostRef, updatedPost);
};

// DELETE
export const deletePost = (id) => {
  const existPostRef = doc(db, COLLECTION_NAME, id);
  return deleteDoc(existPostRef);
};
