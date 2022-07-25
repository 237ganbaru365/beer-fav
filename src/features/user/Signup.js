import React from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { SignupSchema } from "../../util/validators";
import { auth } from "../../firebase";

import { Card } from "../../components/atoms/Card";
import { SignUpForm } from "../../components/organisms/SignUpForm";

export const Signup = () => {
  const navigate = useNavigate();

  // setup for RHF
  const initialHookForm = {
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(SignupSchema),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(initialHookForm);

  // register for firebase authentication
  const signUpHandler = async (username, email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).catch((err) =>
        console.log(err)
      );
      await updateProfile(auth.currentUser, { displayName: username }).catch(
        (err) => console.log(err)
      );
      console.log("Create user successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // processing for signup
  const onSignup = (data) => {
    const { username, email, password } = data;
    signUpHandler(username, email, password);
  };

  return (
    <Card>
      <h1 className="text-center mb-4 text-primary">Sign Up</h1>
      <SignUpForm
        onSubmit={handleSubmit(onSignup)}
        register={register}
        errors={errors}
      />
    </Card>
  );
};
