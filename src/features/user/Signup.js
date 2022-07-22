import React from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { SignupSchema } from "../../util/validators";
import { auth } from "../../firebase";
import { signup } from "./userSlice";

import { Card } from "../../components/atoms/Card";
import { SignUpForm } from "../../components/organisms/SignUpForm";

export const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const { username, email, password } = data;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      // FIXME: でもここでこの情報をもっていても、signupしてすぐにloginするとは限らないので意味ないから、firebaseから取ってくる必要がある
      dispatch(
        signup({
          username,
          email,
          password,
        })
      );
      console.log("Registerd successfully!", user);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
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
