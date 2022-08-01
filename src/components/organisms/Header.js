import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { logout } from "../../features/user/userSlice";

import { Logo } from "../atoms/Logo";
import { NavBar } from "../molecules/NavBar";
import { HeaderActions } from "../molecules/HeaderActions";
import { HamburgerMenu } from "../molecules/HamburgerMenu";

export const Header = () => {
  const dispatch = useDispatch();
  const { user, isLogin } = useSelector((state) => state.user);

  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };

  return (
    <header className="h-16 min-w-full px-8 font-nova flex items-center justify-between">
      <Logo isLogin={isLogin} />
      <NavBar />
      <HeaderActions
        isLogin={isLogin}
        logoutHandler={logoutHandler}
        user={user}
      />
      <HamburgerMenu
        isLogin={isLogin}
        logoutHandler={logoutHandler}
        user={user}
      />
    </header>
  );
};
