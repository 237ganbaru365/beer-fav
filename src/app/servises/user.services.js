import { db } from "../../firebase";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";

const COLLECTION_NAME = "users";
const userColRef = collection(db, COLLECTION_NAME);

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

export const updateFavListByDeletePostId = async (deletePostId) => {
  // user コレクションのfavPostIdListフィールド配列の中に、削除したpostIdが含まれているuserコレクションをすべて返す
  const q = query(
    userColRef,
    where("favPostIdList", "array-contains", deletePostId)
  );
  const usersData = await getDocs(q);

  let userList = [];
  usersData.forEach((doc) => userList.push(doc.data()));

  //　それぞれのuserのfavPostIdListを削除されたpostId以外に書き換える
  userList.map(async (user) => {
    const userId = user.userId;
    const favPostIdList = user.favPostIdList;

    return await removeUserFavPostIdList(userId, favPostIdList, deletePostId);
  });
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
