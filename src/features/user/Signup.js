import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { SignupSchema } from "../../util/validators";
import { auth } from "../../firebase";

import { FormInputText } from "../../components/atoms/FormInputText";
import { Button } from "../../components/atoms/Button";

export const Signup = () => {
  const navigate = useNavigate();

  // setup for RHF
  const initialHookForm = {
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched", // validation will trigger on the first blur event. After that, it will trigger on every change event.
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
    <div className="w-2/3 m-auto my-12 bg-white p-4 rounded-xl shadow-md text-center">
      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={handleSubmit(onSignup)} className="FlexColumn">
        <FormInputText
          {...register("username")}
          id="username"
          type="text"
          label="User name"
          error={!!errors.username}
          helperText={errors?.username?.message}
        />
        <FormInputText
          {...register("email")}
          id="email"
          type="email"
          label="Email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormInputText
          {...register("password")}
          id="password"
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        <Button className="h-12 my-2 px-20 mr-2" content="SIGN UP" />
        {/* FIXME: pタグって、ボタンのように使ってもsemantic的に問題なかったけ？ */}
        <p
          onClick={() => {
            navigate("/login");
          }}
          className="text-primary font-semibold hover:cursor-pointer"
        >
          You already have an acount?
        </p>
      </form>
    </div>
  );
};
