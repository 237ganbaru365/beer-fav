import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { logout } from "../../features/user/userSlice";

import { Logo } from "../atoms/Logo";
import { NavBar } from "../molecules/NavBar";
import { HeaderActions } from "../molecules/HeaderActions";

export const Header = () => {
  const dispatch = useDispatch();
  const { user, isLogin } = useSelector((state) => state.user);

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };

  return (
    <header className="h-16 min-w-full px-8 flex items-center font-nova text-darker">
      <Logo isLogin={isLogin} />
      <NavBar />
      <HeaderActions
        isLogin={isLogin}
        logoutHandler={logoutHandler}
        user={user}
      />
    </header>
  );
};
