import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

import { auth, storage } from "../../firebase";

import { FormInputText } from "../../components/atoms/FormInputText";
import { Button } from "../../components/atoms/Button";
import { addPost } from "../../app/servises/post.services";

export const CreatePost = () => {
  const navigate = useNavigate();

  // setup for RHF
  const { register, handleSubmit } = useForm();

  // check authenticated user id
  const authUid = auth.currentUser.uid;

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
    <section className="bg-white FlexColumn">
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit(onCreate)} className="FlexColumn">
        <FormInputText {...register("name")} type="name" label="Beer name" />
        <FormInputText {...register("store")} type="store" label="Store" />
        <FormInputText
          {...register("description")}
          type="description"
          label="Description"
        />
        <input {...register("file")} type="file" />
        <Button content="CREATE" type="submit" />
      </form>
    </section>
  );
};
