import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PostSchema } from "../../util/validators";

import { FormInputText } from "../../components/atoms/FormInputText";
import { Button } from "../../components/atoms/Button";
import { addPost } from "../../app/servises/post.services";

export const CreatePost = () => {
  const navigate = useNavigate();

  // setup for RHF
  const initialCreatePost = {
    defaultValues: {
      name: "",
      store: "",
      description: "",
    },
    mode: "onTouched",
    resolver: yupResolver(PostSchema),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(initialCreatePost);

  const onCreate = async (newPost) => {
    try {
      await addPost(newPost);
      console.log("Created successfuly!");
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="bg-white FlexColumn">
      <h1>Create a new post</h1>
      <form onSubmit={handleSubmit(onCreate)} className="FlexColumn">
        <FormInputText
          {...register("name")}
          type="name"
          label="Beer name"
          error={!!errors.name}
          helperText={errors?.name?.message}
        />
        <FormInputText
          {...register("store")}
          type="store"
          label="Store"
          error={!!errors.store}
          helperText={errors?.store?.message}
        />
        <FormInputText
          {...register("description")}
          type="description"
          label="Description"
          error={!!errors.description}
          helperText={errors?.description?.message}
        />
        <Button content="CREATE" />
      </form>
    </section>
  );
};
