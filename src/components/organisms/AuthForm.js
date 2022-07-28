import React from "react";
import { useNavigate } from "react-router-dom";

import { FormInputText } from "../atoms/FormInputText";
import { Button } from "../atoms/Button";

export const AuthForm = ({ onSubmit, register, errors, isLoginMode }) => {
  const navigate = useNavigate();

  const changeModeHandler = () => {
    if (isLoginMode) {
      navigate("/signup");
    } else {
      navigate("/login");
    }
  };

  return (
    <form onSubmit={onSubmit} className="FlexColumn w-full">
      {!isLoginMode && (
        <FormInputText
          sx={{ marginBottom: "1rem", width: "70%" }}
          {...register("username")}
          id="username"
          type="text"
          label="User name"
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
      )}
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
      <Button
        className="w-full py-2 mb-4 md:w-2/5"
        content={isLoginMode ? "LOG IN" : "SIGN UP"}
      />
      <p onClick={changeModeHandler} className="font-semibold Hover">
        {isLoginMode
          ? " You don't have an acount yet?"
          : "You already have an acount?"}
      </p>
    </form>
  );
};
