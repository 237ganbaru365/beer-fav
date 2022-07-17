import React from "react";
import { Menu } from "../../components/UI/Menu";
import { NoPosts } from "../../components/UI/NoPosts";
import { Post } from "./Post";

export const Posts = () => {
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
    </>
  );
};
