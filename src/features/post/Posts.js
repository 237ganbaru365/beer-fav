import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";

export const Posts = () => {
  const navigate = useNavigate();

  let content;

  content = (
    <div className="FlexCenter my-5">
      <Post />
      <Post />
    </div>
  );

  return (
    <>
      <Menu />
      {content}
      <button onClick={() => navigate("/new")}>Create new post</button>
    </>
  );
};
