import React from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { auth, storage } from "../../firebase";
import { addPost } from "../../app/servises/post.services";

import { Card } from "../../components/atoms/Card";
import { PostForm } from "../../components/organisms/PostForm";

export const CreatePost = () => {
  const navigate = useNavigate();

  // check authenticated user id
  const authUid = auth.currentUser.uid;

  // setup for RHF
  const { register, handleSubmit } = useForm();

  // processing on submit
  const onCreate = async (data) => {
    const { name, store, description } = data;

    // create file reference
    const uploadFile = data.file[0];
    const imgRef = ref(storage, `images/${uploadFile.name + v4()}`);

    try {
      // upload file to firebase storage
      await uploadBytes(imgRef, uploadFile);
      const imgUrl = await getDownloadURL(imgRef);
      const newPost = { name, store, description, authUid, imgUrl };

      // store data to firestore
      await addPost(newPost);
      console.log("created successfully!");
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card>
      <h1 className="text-center mb-4 text-primary">Create a new post</h1>
      <PostForm onSubmit={handleSubmit(onCreate)} register={register} />
    </Card>
  );
};
