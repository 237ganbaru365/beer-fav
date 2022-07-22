import React from "react";

import { FormInputText } from "../../components/atoms/FormInputText";
import { Button } from "../../components/atoms/Button";
import { FileInput } from "../atoms/FileInput";

export const PostForm = ({ onSubmit, register }) => {
  return (
    <form onSubmit={onSubmit} className="FlexColumn">
      <FormInputText
        {...register("name")}
        type="text"
        label="Beer name"
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
        content="CREATE"
        type="submit"
      />
    </form>
  );
};
