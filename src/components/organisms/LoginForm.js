import React from "react";
import { useNavigate } from "react-router-dom";

import { FormInputText } from "../atoms/FormInputText";
import { Button } from "../atoms/Button";

export const LoginForm = ({ onSubmit, register, errors }) => {
  const navigate = useNavigate();

  return (
    <form onSubmit={onSubmit} className="FlexColumn w-full">
      <FormInputText
        sx={{ marginBottom: "1rem", width: "70%" }}
        {...register("email")}
        id="email"
        type="email"
        label="Email"
        error={!!errors.email}
        helperText={errors?.email?.message}
      />
      <FormInputText
        sx={{ marginBottom: "2.5rem", width: "70%" }}
        {...register("password")}
        id="password"
        type="password"
        label="Password"
        error={!!errors.password}
        helperText={errors?.password?.message}
      />
      <Button className="w-1/2 py-2 mb-4 md:w-2/5" content="LOG IN" />
      <button
        onClick={() => {
          navigate("/signup");
        }}
        className="text-primary font-semibold Hover"
      >
        You don't have an acount yet?
      </button>
    </form>
  );
};
