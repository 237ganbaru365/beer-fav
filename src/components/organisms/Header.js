import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../features/user/userSlice";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "../atoms/Button";

export const Header = () => {
  const dispatch = useDispatch();

  // check if user loggedin
  const auth = useSelector((state) => state.user.auth);
  const isAuth = auth.isLogin;

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
        {isAuth ? (
          <Link to="/posts">Cheers!</Link>
        ) : (
          <Link to="/">Cheers!</Link>
        )}
      </h2>
      <div className="FlexCenter">
        {/* FIXME: should use username insted of uid */}
        {isAuth && (
          <h4 className="mr-4">
            <AccountCircleIcon />
            {auth.uid}
          </h4>
        )}

        {isAuth && (
          <Button color="inherit" onClick={logoutHandler} content="LOG OUT" />
        )}
      </div>
    </header>
  );
};
