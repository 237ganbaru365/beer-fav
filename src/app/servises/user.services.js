import { db } from "../../firebase";

import {
  collection,
  doc,
  setDoc,
  // arrayUnion,
} from "firebase/firestore";

const COLLECTION_NAME = "users";
const userColRef = collection(db, COLLECTION_NAME);

// CREATE
export const addUserByAuthId = (userData, authId) => {
  return setDoc(doc(db, COLLECTION_NAME, authId), userData);
};

//TODO: 更新するたびに、既存の配列に要素は追加されず、常に一つの要素のみが配列内で更新される。arrayUnionは使えない？
// export const addUserPostAsArr = async (authId, myPostId) => {
//   const userRef = doc(db, COLLECTION_NAME, authId);

//   return setDoc(
//     userRef,
//     {
//       myPosts: arrayUnion(myPostId),
//     },
//     { merge: true }
//   );
// };
