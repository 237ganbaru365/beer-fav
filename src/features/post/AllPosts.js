import React, { useEffect, useState } from "react";

import { getAllPost } from "../../app/servises/post.services";
import { PostHeaderActions } from "../../components/molecules/PostHeaderActions";

import { Post } from "./Post";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const getAll = async () => {
    const postsResult = await getAllPost();
    setPosts(postsResult);
  };

  useEffect(() => {
    getAll();
  }, []);

  let content;

  if (posts.length > 0) {
    content = (
      <div className="p-8 md:p-12 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {posts.map((post) => (
          <Post
            {...post}
            key={post.postId}
            postId={post.postId}
            author={post.username}
            reloadPosts={getAll}
          />
        ))}
      </div>
    );
  } else if (posts.length <= 0) {
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
