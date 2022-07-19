import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "../../components/UI/Menu";
//FIXME: will use after add logic for fetching db
// import { NoPosts } from "../../components/UI/NoPosts";
import { Post } from "./Post";

export const Posts = () => {
  const navigate = useNavigate();

  let content;

  //FIXME: ステータスごとの条件分岐
  // content = <NoPosts />;
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
