import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { FormInputText } from "../components/Form/FormInputText";
import { Button } from "../components/UI/Button";

// validation rules
const schema = yup
  .object({
    username: yup
      .string()
      .matches(/^([^0-9]*)$/, "User name should not contain numbers")
      .required("First name is a required field"),
    email: yup.string().required(),
    password: yup.string().min(6).required(),
  })
  .required();

export const Auth = ({ isLogin }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // processing on submit
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Register succeeed!", user);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    //FIXME: this is just a test for react-hook-form
    <div className="w-2/3 m-auto my-12 bg-white p-4 rounded-xl shadow-md">
      {!isLogin ? (
        <h1 className="text-center">Sign In</h1>
      ) : (
        <h1 className="text-center">Log In</h1>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="FlexColumn">
        <FormInputText type="text" label="User name" name="username" />
        <FormInputText type="email" label="Email" name="email" />
        <FormInputText type="password" label="Password" name="password" />
        {!isLogin ? (
          <Button className="h-12 my-2 px-20 mr-2" content="SIGN UP" />
        ) : (
          <Button className="h-12 my-2 px-20 mr-2" content="LOG IN" />
        )}
      </form>
    </div>
  );
};
