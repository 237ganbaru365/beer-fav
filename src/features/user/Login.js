import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";

import { LoginSchema } from "../../util/validators";
import { auth } from "../../firebase";
import { login } from "./userSlice";

import { FormInputText } from "../../components/Form/FormInputText";
import { Button } from "../../components/UI/Button";

export const Login = () => {
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
      email: "",
      password: "",
    },
    mode: "onTouched",
    resolver: yupResolver(LoginSchema),
  });

  // processing for signup
  const onLogin = async (data) => {
    const { email, password } = data;
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successfully!", user);
      dispatch(
        login({
          uid: user.user.uid,
          email: user.user.email,
        })
      );
      navigate("/posts");
    } catch (error) {
      setServerErr(error);
    }
  };

  return (
    //FIXME: スタイルの見直し
    //FIXME: コンポーネントの切り出し
    <div className="w-2/3 m-auto my-12 bg-white p-4 rounded-xl shadow-md text-center">
      <h1 className="text-center">Log In</h1>
      {serverErr && (
        <span className="text-danger">{`${serverErr} Please try again`}</span>
      )}
      <form onSubmit={handleSubmit(onLogin)} className="FlexColumn">
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
        <Button className="h-12 my-2 px-20 mr-2" content="Login" />
        {/* FIXME: pタグって、ボタンのように使ってもsemantic的に問題なかったけ？ */}
        <p
          onClick={() => {
            navigate("/signup");
          }}
          className="text-primary font-semibold hover:cursor-pointer"
        >
          You don't have an acount yet?
        </p>
      </form>
    </div>
  );
};
