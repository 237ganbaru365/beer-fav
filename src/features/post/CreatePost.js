import React from "react";

import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { auth, storage } from "../../firebase";
import { addUserByAuthId } from "../../app/servises/user.services";
import { addPost } from "../../app/servises/post.services";

import { Card } from "../../components/atoms/Card";
import { PostForm } from "../../components/organisms/PostForm";

export const CreatePost = () => {
  const navigate = useNavigate();

  // check authenticated user id
  const userId = auth.currentUser.uid;
  const { displayName, email } = auth.currentUser;

  // processing on submit
  const createHandler = async (data) => {
    const { name, store, description } = data;

    // create file reference
    const uploadFile = data.file[0];
    const imgRef = ref(storage, `images/${uploadFile.name + v4()}`);

    try {
      // upload file to firebase storage
      await uploadBytes(imgRef, uploadFile);
      const imgUrl = await getDownloadURL(imgRef);
      const newPost = { name, store, description, userId, imgUrl };

      // store post data to firestore
      const postData = await addPost(newPost);
      console.log("created post successfully!", postData);

      // store user data to firestore
      const userData = {
        username: displayName,
        email,
      };
      await addUserByAuthId(userData, userId);
      console.log("created user successfully!");

      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <h1 className="text-center mb-4 text-primary">Create a new post</h1>
      <PostForm isAddMode={true} createHandler={createHandler} />
    </Card>
  );
};
