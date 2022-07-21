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

const COLLECTION_NAME = "users";
const userColRef = collection(db, COLLECTION_NAME);

// CREATE
export const addUser = (newPost) => {
  return addDoc(userColRef, newPost);
};

// READ
export const getAllUsers = () => {
  return getDocs(userColRef);
};

export const getUser = (id) => {
  const existUserRef = doc(db, COLLECTION_NAME, id);
  return getDoc(existUserRef);
};

// UPDATE
export const updateUser = (id, updateUser) => {
  const existUserRef = doc(db, COLLECTION_NAME, id);
  return updateDoc(existUserRef, updateUser);
};

// DELETE
export const deleteUser = (id) => {
  const existUserRef = doc(db, COLLECTION_NAME, id);
  return deleteDoc(existUserRef);
};
