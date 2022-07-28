import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { logout } from "../../features/user/userSlice";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "../atoms/Button";

// FIXME: signinした直後は、usernameが取得できていない。非同期処理によるもの？
export const Header = ({ user }) => {
  const dispatch = useDispatch();

  // logout function
  const logoutHandler = () => {
    signOut(auth);
    dispatch(logout());
  };

  return (
    <header className="h-16 min-w-full flex items-center px-8 fixed top-0 left-0 z-30 backdrop-blur font-nova text-darker">
      <h2 className="basis-1/6 text-2xl font-bold">
        {user ? <Link to="/posts">Cheers!</Link> : <Link to="/">Cheers!</Link>}
      </h2>
      <ul className="basis-1/2 text-xl font-semibold flex justify-center">
        <NavLink to="/posts" className="mr-8">
          All
        </NavLink>
        <NavLink to="/favorite" className="mr-8">
          Favorites
        </NavLink>
        <NavLink to="/my-posts">MyPosts</NavLink>
      </ul>
      <div className="basis-1/3 flex justify-end">
        {user && (
          <div className="FlexCenter">
            <h4 className="mr-4 font-quicksand">
              <AccountCircleIcon />
              {user.displayName}
            </h4>
            <Button color="inherit" onClick={logoutHandler} content="LOG OUT" />
          </div>
        )}
        {!user && (
          <>
            <Button content="SIGN UP" />
          </>
        )}
      </div>
    </header>
  );
};
