import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { logout } from "../../features/user/userSlice";

import { Button } from "../UI/Button";

export const Header = () => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <header className="bg-primary text-emerald-50 h-16 flex items-center justify-between px-3 py-2">
      <h2 className="font-oleo">
        {user ? <a href="/posts">Cheers!</a> : <a href="/">Cheers!</a>}
      </h2>
      <div className="FlexCenter">
        <h4 className="text-right mx-1">{user && user.email}</h4>
        {user && (
          <Button
            color="inherit"
            onClick={logoutHandler}
            content="LOG OUT"
            className="text-emerald-50"
          ></Button>
        )}
      </div>
    </header>
  );
};
