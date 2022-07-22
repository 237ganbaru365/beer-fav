import React from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";

import { LoginSchema } from "../../util/validators";
import { auth } from "../../firebase";
import { login } from "./userSlice";

import { Card } from "../../components/atoms/Card";
import { LoginForm } from "../../components/organisms/LoginForm";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setup for RHF
  const initialHookForm = {
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(LoginSchema),
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(initialHookForm);

  // firebase login
  const onLogin = async (data) => {
    const { email, password } = data;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successfully!", user);
      dispatch(
        login({
          uid: user.user.uid,
          isLogin: true,
        })
      );
      navigate("/posts");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Card styles="w-4/5 mx-auto my-32 md:w-2/5">
      <h1 className="text-center mb-4 text-primary">Log In</h1>
      <LoginForm
        onSubmit={handleSubmit(onLogin)}
        register={register}
        errors={errors}
      />
    </Card>
  );
};
