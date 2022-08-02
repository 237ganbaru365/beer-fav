import React from "react";

import { useForm } from "react-hook-form";

import { FormInputText } from "../../components/atoms/FormInputText";
import { FileInput } from "../molecules/FileInput";
import { Button } from "../../components/atoms/Button";

export const PostForm = ({
  preloadValues,
  isAddMode,
  createHandler,
  editHandler,
  isLoading,
}) => {
  // set for RHF
  const { register, handleSubmit } = useForm({
    defaultValues: preloadValues,
  });

  // check if edit or create
  const onSubmit = (data) => {
    if (isAddMode) {
      createHandler(data);
    } else {
      editHandler(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInputText
        {...register("name")}
        type="text"
        label="Name"
        sx={{ marginBottom: "1rem" }}
      />
      <FormInputText
        {...register("store")}
        type="text"
        label="Store"
        sx={{ marginBottom: "1rem" }}
      />
      <FormInputText
        {...register("description")}
        type="textarea"
        label="Description"
        sx={{ marginBottom: "2.5rem" }}
      />
      <FileInput register={register} />
      <Button
        className="w-4/5"
        content={isAddMode ? "CREATE" : "UPDATE"}
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};
