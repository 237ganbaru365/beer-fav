import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../firebase";
import { UserSchema } from "../util/validators";
import { FormInputText } from "../components/Form/FormInputText";
import { Button } from "../components/UI/Button";

export const Auth = ({ isLogin }) => {
  const navigate = useNavigate();

  //FIXME: ここでのエラーハンドリングをサーバーとクライアントでわけたのは、クライアント側のエラーハンドリングは、react-hook-formがやってくれているので、firbaseから吐き出されたerrを引っ張るためですが、これあってますか？
  const [serverErr, setServerErr] = useState(null);

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UserSchema),
  });

  // processing on submit
  // FIXME: これはContextAPIでグローバルに値を保持した方がよさそう。app.js内で、auth情報によってrouteわけたいから。
  // FIXME: そもそも、onSubmitはreact-hook-formの引数として処理されるけど、handleSubmitがそもそもasyncつかってることはないかい？
  const onSubmit = async (data) => {
    const { email, password } = data;
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Register succeeed!", user);
    } catch (error) {
      setServerErr(error.message);
    }
  };

  // change login/signin
  // FIXME: isLoginはstateとして管理しなくても大丈夫？それともreact-hook-formがそのstate既にもってる？
  const modeChangeHandler = () => {
    if (isLogin) {
      isLogin = false;
      navigate("/signup");
    } else {
      isLogin = true;
      navigate("/login");
    }
  };

  return (
    //FIXME: スタイルの見直し
    //FIXME: コンポーネントの切り出し
    <div className="w-2/3 m-auto my-12 bg-white p-4 rounded-xl shadow-md">
      {!isLogin ? (
        <h1 className="text-center">Sign In</h1>
      ) : (
        <h1 className="text-center">Log In</h1>
      )}
      {serverErr && (
        <span className="text-danger">{`${serverErr} : Please try again`}</span>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="FlexColumn">
        {!isLogin && (
          <FormInputText
            {...register("username")}
            type="text"
            label="User name"
            error={!!errors.username}
            helperText={errors?.username?.message}
          />
        )}
        <FormInputText
          {...register("email")}
          type="email"
          label="Email"
          error={!!errors.email}
          helperText={errors?.email?.message}
        />
        <FormInputText
          {...register("password")}
          type="password"
          label="Password"
          error={!!errors.password}
          helperText={errors?.password?.message}
        />
        {!isLogin ? (
          <div className="FlexColumn">
            {/* FIXME: エラーハンドリングに合わせてdisableのスタイルあてたい */}
            <Button className="h-12 my-2 px-20 mr-2" content="SIGN UP" />
            {/* FIXME: pタグって、ボタンのように使ってもsemantic的に問題なかったけ？ */}
            <p
              onClick={modeChangeHandler}
              className="text-primary font-semibold hover:cursor-pointer"
            >
              You already have an acount?
            </p>
          </div>
        ) : (
          <div className="FlexColumn">
            <Button className="h-12 my-2 px-20 mr-2" content="LOG IN" />
            {/* FIXME: pタグって、ボタンのように使ってもsemantic的に問題なかったけ？ */}
            <p
              onClick={modeChangeHandler}
              className="text-primary font-semibold hover:cursor-pointer"
            >
              You don't have an acount yet?
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
