import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { auth } from "../../firebase";
import { logout } from "../../features/user/userSlice";

import { Button } from "../atoms/Button";

export const Header = () => {
  const dispatch = useDispatch();

  // check if user loggedin
  const user = useSelector((state) => state.user);
  const isAuth = user.auth.isLogin;

  // logout function
  const logoutHandler = () => {
    dispatch(
      logout({
        isLogin: false,
      })
    );
    auth.signOut();
  };

  return (
    <header className="bg-primary text-emerald-50 h-16 flex items-center justify-between px-3 py-2">
      <h2 className="font-oleo">
        {isAuth ? <a href="/posts">Cheers!</a> : <a href="/">Cheers!</a>}
      </h2>
      <div className="FlexCenter">
        {/* FIXME: should use username insted of uid */}
        <h4 className="text-right mx-1">{isAuth && user.auth.uid}</h4>
        {isAuth && (
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
