import { db } from "../../firebase";

import {
  collection,
  doc,
  documentId,
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
