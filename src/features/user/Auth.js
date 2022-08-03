import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginSchema, SignupSchema } from "../../util/validators";
import { addUserByUserId } from "../../app/servises/user.services";
import { auth } from "../../firebase";
import {
  fireAuthSignIn,
  fireAuthSignUp,
  fireAuthUpdate,
} from "../../app/servises/auth.services";

import { Card } from "../../components/atoms/Card";
import { AuthForm } from "../../components/organisms/AuthForm";

export const Auth = ({ isLoginMode }) => {
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
      await fireAuthSignIn(email, password);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  // signup handler
  const signUpHandler = async (username, email, password) => {
    setIsLoading(true);
    try {
      await fireAuthSignUp(email, password);

      // check authenticated user info
      const user = auth.currentUser;
      const { uid } = user;

      // update displayName to user input name
      await fireAuthUpdate(user, username);

      // store user data to firestore
      const userData = {
        username,
        userId: uid,
        email,
      };
      await addUserByUserId(userData, uid);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  // processing for submit
  const onSubmit = (data) => {
    const { username, email, password } = data;
    if (isLoginMode) {
      loginHandler(email, password);
    } else {
      signUpHandler(username, email, password);
    }
  };

  return (
    <section>
      <Card>
        <h1>{isLoginMode ? "Log In" : "Sign Up"}</h1>
        <AuthForm
          onSubmit={handleSubmit(onSubmit)}
          register={register}
          isLoginMode={isLoginMode}
          errors={errors}
          isLoading={isLoading}
        />
      </Card>
    </section>
  );
};
