import { db } from "../../firebase";

import {
  collection,
  doc,
  documentId,
  getDoc,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { getPost } from "./post.services";

const COLLECTION_NAME = "users";
const userColRef = collection(db, COLLECTION_NAME);

// CREATE
export const addUserByAuthId = (userData, authId) => {
  return setDoc(doc(db, COLLECTION_NAME, authId), userData);
};

// READ
export const getUserByPostId = (postId) => {
  const userPost = getPost(postId);
  return userPost;
};

export const getUserByUserId = async (userId) => {
  try {
    const userDocRef = doc(db, "users", userId);
    return await getDoc(userDocRef);
  } catch (error) {
    // もしここでエラーが発生したら、呼び出し元にエラーを返す
    throw error;
  }
};
