import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { LoginSchema, SignupSchema } from "../../util/validators";
import { auth } from "../../firebase";
import { login } from "./userSlice";

import { Card } from "../../components/atoms/Card";
import { AuthForm } from "../../components/organisms/AuthForm";

export const Auth = ({ isLoginMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setup for RHF
  const initialHookForm = {
    mode: "onTouched",
    resolver: yupResolver(isLoginMode ? LoginSchema : SignupSchema),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(initialHookForm);

  // login handler
  const loginHandler = async (email, password) => {
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successfully!", data);
      dispatch(login());
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  // signup handler
  const signUpHandler = async (username, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName: username });
      console.log("Create user successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  // processing for signup
  const onSubmit = (data) => {
    const { username, email, password } = data;
    if (isLoginMode) {
      loginHandler(email, password);
    } else {
      signUpHandler(username, email, password);
    }
  };

  return (
    <Card>
      <h1 className="text-center mb-4 text-primary">
        {isLoginMode ? "Log In" : "Sign Up"}
      </h1>
      <AuthForm
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        isLoginMode={isLoginMode}
        errors={errors}
      />
    </Card>
  );
};
