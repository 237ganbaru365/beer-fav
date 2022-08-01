import React from "react";
import { NavLink } from "react-router-dom";

export const NavBar = () => {
  return (
    <ul className="hidden basis-1/2 text-xl font-semibold md:flex justify-center">
      <NavLink
        to="/posts"
        className={({ isActive }) =>
          isActive
            ? "mr-8 border-b-2 border-dark transform ease-in-out duration-300 hover:-translate-y-1"
            : "mr-8 transform ease-in-out duration-300 hover:-translate-y-1"
        }
      >
        All
      </NavLink>
      <NavLink
        to="/favorite"
        className={({ isActive }) =>
          isActive
            ? "mr-8 border-b-2 border-dark transform ease-in-out duration-300 hover:-translate-y-1"
            : "mr-8 transform ease-in-out duration-300 hover:-translate-y-1"
        }
      >
        Favorites
      </NavLink>
      <NavLink
        to="/my-posts"
        className={({ isActive }) =>
          isActive
            ? "border-b-2 border-dark transform ease-in-out duration-300 hover:-translate-y-1"
            : "transform ease-in-out duration-300 hover:-translate-y-1"
        }
      >
        MyPosts
      </NavLink>
    </ul>
  );
};
