import React from "react";
import { Link } from "react-router-dom";

export const Logo = ({ isLogin }) => {
  return (
    <h2 className="basis-1/6 text-2xl font-bold transform ease-in-out duration-300 hover:-translate-y-1">
      {isLogin ? <Link to="/posts">Cheers!</Link> : <Link to="/">Cheers!</Link>}
    </h2>
  );
};
