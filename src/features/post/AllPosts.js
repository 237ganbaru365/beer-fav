import React from "react";
import { useQuery } from "@tanstack/react-query";

import { REACT_QUERY_KEY_POSTS } from "../../constants/constants";
import { getAllPost } from "../../app/servises/post.services";
import { PostHeaderActions } from "../../components/molecules/PostHeaderActions";

import { Post } from "./Post";
import LinearProgress from "@mui/material/LinearProgress";

export const AllPosts = () => {
  const getAllPostQuery = useQuery([REACT_QUERY_KEY_POSTS], getAllPost);

  let content;

  if (getAllPostQuery.isLoading) {
    return <LinearProgress color="inherit" />;
  }

  if (getAllPostQuery.data.length > 0) {
    content = (
      <div className="p-8 md:p-12 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {getAllPostQuery.data.map((post) => (
          <Post
            {...post}
            key={post.postId}
            postId={post.postId}
            author={post.username}
          />
        ))}
      </div>
    );
  } else if (getAllPostQuery.data.length <= 0) {
    content = <h2 className="text-center">No posts yet...</h2>;
  }

  return (
    <div className="p-8 my-8">
      <h1>All Posts</h1>
      <PostHeaderActions />
      {content}
    </div>
  );
};
