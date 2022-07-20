import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { SignupSchema } from "../../util/validators";
import { auth } from "../../firebase";
import { signup } from "./userSlice";

import { FormInputText } from "../../components/atoms/FormInputText";
import { Button } from "../../components/atoms/Button";

export const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // server error handling
  const [serverErr, setServerErr] = useState(null);

  // setup for RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    // validation will trigger on the first blur event. After that, it will trigger on every change event.
    mode: "onTouched",
    resolver: yupResolver(SignupSchema),
  });

  // processing for signup
  const onSignup = async (data) => {
    const { username, email, password } = data;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registerd successfully!", user);
      // dispatch(
      //   signup({
      //     username,
      //   })
      // );
      navigate("/login");
    } catch (error) {
      setServerErr(error);
    }
  };

  return (
    //FIXME: スタイルの見直し
    //FIXME: コンポーネントの切り出し
    <div className="w-2/3 m-auto my-12 bg-white p-4 rounded-xl shadow-md text-center">
      <h1 className="text-center">Sign Up</h1>
      {serverErr && (
        <span className="text-danger">{`${serverErr} Please try again`}</span>
      )}
      {/* handleSubmit(1st, 2nd) <= 1st arg is for success, 2nd is for error */}
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
