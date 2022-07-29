import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <ul className="basis-1/2 text-xl font-semibold flex justify-center">
      <NavLink
        to="/posts"
        className={({ isActive }) =>
          isActive ? "mr-8 border-b-2 border-dark" : "mr-8"
        }
      >
        All
      </NavLink>
      <NavLink
        to="/favorite"
        className={({ isActive }) =>
          isActive ? "mr-8 border-b-2 border-dark" : "mr-8"
        }
      >
        Favorites
      </NavLink>
      <NavLink
        to="/my-posts"
        className={({ isActive }) => (isActive ? "border-b-2 border-dark" : "")}
      >
        MyPosts
      </NavLink>
    </ul>
  );
};
