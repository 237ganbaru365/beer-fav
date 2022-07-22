import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

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

  // processing for signup
  const onSignup = async (data) => {
    const { email, password } = data;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registerd successfully!", user);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card styles="w-4/5 mx-auto my-32 md:w-2/5">
      <h1 className="text-center mb-4 text-primary">Sign Up</h1>
      <SignUpForm
        onSubmit={handleSubmit(onSignup)}
        register={register}
        errors={errors}
      />
    </Card>
  );
};
