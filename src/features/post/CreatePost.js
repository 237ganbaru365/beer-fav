import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PostSchema } from "../../util/validators";
import { addPost, editPost } from "../../app/servises/post-api";

import { FormInputText } from "../../components/Form/FormInputText";
import { Button } from "../../components/UI/Button";

export const CreatePost = () => {
  // setup for RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
    },
    mode: "onTouched",
    resolver: yupResolver(PostSchema),
  });

  // processing for add posts
  // const onAddPost = (data) => {
  //   addPost(data);
  // };

  const onEditPost = (data) => {
    editPost(data);
  };
  return (
    <>
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit(onEditPost)}>
        <FormInputText
          {...register("title")}
          type="title"
          label="Title"
          error={!!errors.title}
          helperText={errors?.title?.message}
        />
        <Button content="CREATE" />
      </form>
    </>
  );
};
