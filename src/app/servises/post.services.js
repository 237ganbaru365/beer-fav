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

// READ
export const getAllPost = async () => {
  const data = await getDocs(postColRef);
  return data.docs.map((doc) => ({ ...doc.data(), postId: doc.id }));
};

export const getPost = async (postId) => {
  const postDocRef = doc(db, COLLECTION_NAME, postId);
  return await getDoc(postDocRef);
};

export const getFavoritePostsByFavList = async (favPostIdList) => {
  try {
    //FIXME: favPostListが空のarrayの時、エラーでる
    const q = query(postColRef, where(documentId(), "in", favPostIdList));

    const result = await getDocs(q);

    return result.docs.map((doc) => ({
      ...doc.data(),
      postId: doc.id,
    }));
  } catch (error) {
    throw error;
  }
};

export const getMyPostsByMyPostList = async (myPostIdList) => {
  try {
    //FIXME: myPostListが空のarrayの時、エラーでる
    const q = query(postColRef, where(documentId(), "in", myPostIdList));

    const result = await getDocs(q);

    return result.docs.map((doc) => ({
      ...doc.data(),
      postId: doc.id,
    }));
  } catch (error) {
    throw error;
  }
};

// UPDATE
export const updatePost = async (postId, updatedPost) => {
  const postDocRef = doc(db, COLLECTION_NAME, postId);
  return await updateDoc(postDocRef, updatedPost);
};

// DELETE
export const deletePost = async (postId) => {
  const postDocRef = doc(db, COLLECTION_NAME, postId);
  return await deleteDoc(postDocRef);
};
