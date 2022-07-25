import React from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "../atoms/Button";

export const Header = ({ user }) => {
  // logout function
  const logoutHandler = () => {
    auth.signOut();
  };

  return (
    <header className="bg-primary text-emerald-50 h-16 flex items-center justify-between px-3 py-2">
      <h2 className="font-oleo">
        {user ? <Link to="/posts">Cheers!</Link> : <Link to="/">Cheers!</Link>}
      </h2>
      <div className="FlexCenter">
        {user && (
          <h4 className="mr-4">
            <AccountCircleIcon />
            {user.displayName}
          </h4>
        )}
        {user && (
          <Button color="inherit" onClick={logoutHandler} content="LOG OUT" />
        )}
      </div>
    </header>
  );
};
