import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Button } from "../atoms/Button";
import { Squash as Hamburger } from "hamburger-react";
import { Divider, Drawer } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const HamburgerMenu = ({ isLogin, logoutHandler, user }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="md:hidden">
      <Hamburger toggled={isOpen} toggle={setIsOpen} size={25} />
      <Drawer
        anchor="right"
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
      >
        <div className="p-8 font-nova text-xl">
          <Hamburger toggled={isOpen} toggle={setIsOpen} size={25} />
          <ul className="p-8">
            <li className="mb-4">
              <NavLink
                to="/posts"
                className={({ isActive }) =>
                  isActive ? "mr-8 border-b-2 border-dark" : "mr-8"
                }
              >
                All
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="/favorite"
                className={({ isActive }) =>
                  isActive ? "mr-8 border-b-2 border-dark" : "mr-8"
                }
              >
                Favorites
              </NavLink>
            </li>

            <li className="mb-4">
              <NavLink
                to="/my-posts"
                className={({ isActive }) =>
                  isActive ? "border-b-2 border-dark" : ""
                }
              >
                MyPosts
              </NavLink>
            </li>
          </ul>
          <Divider />
          <div className="text-center m-4">
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
        </div>
      </Drawer>
    </div>
  );
};
