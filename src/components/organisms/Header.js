import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "../atoms/Button";
import { logout } from "../../features/user/userSlice";

export const Header = ({ user }) => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  // logout function
  const logoutHandler = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <header className="bg-primary text-emerald-50 h-16 flex items-center justify-between px-3 py-2">
      <h2 className="font-oleo">
        {isLogin ? (
          <Link to="/posts">Cheers!</Link>
        ) : (
          <Link to="/">Cheers!</Link>
        )}
      </h2>
      <div className="FlexCenter">
        {isLogin && (
          <h4 className="mr-4">
            <AccountCircleIcon />
            {user.displayName}
          </h4>
        )}
        {isLogin && (
          <Button color="inherit" onClick={logoutHandler} content="LOG OUT" />
        )}
      </div>
    </header>
  );
};
