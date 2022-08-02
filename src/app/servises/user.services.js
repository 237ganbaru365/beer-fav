import { db } from "../../firebase";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const COLLECTION_NAME = "users";

// CREATE
export const addUserByUserId = async (userData, userId) => {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);

    return await setDoc(userDocRef, userData);
  } catch (error) {
    throw error;
  }
};

// READ
export const getUserByUserId = async (userId) => {
  try {
    const userDocRef = doc(db, COLLECTION_NAME, userId);

    return await getDoc(userDocRef);
  } catch (error) {
    throw error;
  }
};

// UPDATE
export const addUserMyPostIdList = async (userId, myPostIdList, myPostId) => {
  const userDocRef = doc(db, COLLECTION_NAME, userId);

  return await updateDoc(userDocRef, {
    myPostIdList: [...myPostIdList, myPostId],
  });
};

export const addUserFavPostIdList = async (userId, favPostIdList, myPostId) => {
  const userDocRef = doc(db, COLLECTION_NAME, userId);

  return await updateDoc(userDocRef, {
    favPostIdList: [...favPostIdList, myPostId],
  });
};

export const removeUserMyPostIdList = async (
  userId,
  myPostIdList,
  myPostId
) => {
  const userDocRef = doc(db, COLLECTION_NAME, userId);

  const newMyPostIdList = myPostIdList.filter((id) => id !== myPostId);

  return await updateDoc(userDocRef, {
    myPostIdList: newMyPostIdList,
  });
};

export const removeUserFavPostIdList = async (
  userId,
  favPostIdList,
  myPostId
) => {
  const userDocRef = doc(db, COLLECTION_NAME, userId);

  const newFavPostIdList = favPostIdList.filter((id) => id !== myPostId);

  return await updateDoc(userDocRef, {
    favPostIdList: newFavPostIdList,
  });
};
