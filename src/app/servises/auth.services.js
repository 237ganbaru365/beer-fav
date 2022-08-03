import { auth } from "../../firebase";

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";

// signup
export const fireAuthSignUp = async (email, password) => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// login
export const fireAuthSignIn = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

// logout
export const fireAuthSignOut = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;
  }
};

// update
export const fireAuthUpdate = async (user, username) => {
  try {
    return await updateProfile(user, {
      displayName: username,
    });
  } catch (error) {
    throw error;
  }
};
