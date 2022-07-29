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
    <form onSubmit={handleSubmit(onSubmit)} className="FlexColumn">
      <FormInputText
        {...register("name")}
        type="text"
        label="Name"
        sx={{ marginBottom: "1rem", width: "70%" }}
      />
      <FormInputText
        {...register("store")}
        type="text"
        label="Store"
        sx={{ marginBottom: "1rem", width: "70%" }}
      />
      <FormInputText
        {...register("description")}
        type="textarea"
        label="Description"
        sx={{ marginBottom: "2.5rem", width: "70%" }}
      />
      <FileInput register={register} />
      <Button
        className="w-1/2 py-2 mb-4 md:w-2/5"
        content={isAddMode ? "CREATE" : "UPDATE"}
        type="submit"
      />
    </form>
  );
};
