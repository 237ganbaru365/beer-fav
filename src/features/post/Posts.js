import React from "react";
import { useNavigate } from "react-router-dom";

export const Posts = () => {
  const navigate = useNavigate();
  return (
    <>
      <p>This is posts page</p>
      <button onClick={() => navigate("/new")}>Create new post</button>
    </>
  );
};
