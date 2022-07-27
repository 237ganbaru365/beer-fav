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

import { getUserByAuthId } from "./user.services";

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

export const getPost = (postId) => {
  const postDocRef = doc(db, COLLECTION_NAME, postId);
  return getDoc(postDocRef);
};

export const getPostByUserId = (userId) => {
  const q = query(postColRef, where("userId", "==", userId));

  return getDocs(q);
};

export const getFavoritePostByAuthId = async (authId) => {
  const userData = await getUserByAuthId(authId);

  const userFavoriteList = await userData.data().favorites;

  const q = query(postColRef, where(documentId(), "in", userFavoriteList));

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
