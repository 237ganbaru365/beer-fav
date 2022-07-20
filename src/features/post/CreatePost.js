import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PostSchema } from "../../util/validators";

import { FormInputText } from "../../components/atoms/FormInputText";
import { Button } from "../../components/atoms/Button";

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

  return (
    <>
      <h1>Create a new post</h1>
      <form>
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
