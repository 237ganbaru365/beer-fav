import React from "react";
import { useNavigate } from "react-router-dom";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "../atoms/Button";

export const HeaderActions = ({ isLogin, logoutHandler, user }) => {
  const navigate = useNavigate();
  return (
    <div className="hidden basis-1/3 md:flex justify-end">
      {isLogin && (
        <div className="FlexCenter">
          <h4 className="mr-4 font-quicksand">
            <AccountCircleIcon />
            {user.username}
          </h4>
          <Button content="LOG OUT" onClick={logoutHandler} />
        </div>
      )}
      {!isLogin && (
        <>
          <Button content="SIGN UP" onClick={() => navigate("/signup")} />
        </>
      )}
    </div>
  );
};
