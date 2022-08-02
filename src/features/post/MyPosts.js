import React, { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getMyPostsByMyPostList } from "../../app/servises/post.services";

import { Post } from "./Post";
import { PostHeaderActions } from "../../components/molecules/PostHeaderActions";
import CircularProgress from "@mui/material/CircularProgress";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { myPostIdList } = useSelector((state) => state.user.user);

  const getMyPosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const myPostsData = await getMyPostsByMyPostList(myPostIdList);

      setMyPosts(myPostsData);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [myPostIdList]);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  let content;

  if (isLoading) {
    content = <CircularProgress color="inherit" />;
  } else if (myPosts.length > 0) {
    content = (
      <div className="p-8 md:p-12 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {myPosts.map((post) => (
          <Post
            {...post}
            key={post.postId}
            myPostId={post.postId}
            author={post.username}
            reloadPosts={getMyPosts}
          />
        ))}
      </div>
    );
  } else if (myPosts.length <= 0) {
    content = <h2 className="text-center">No my posts yet...</h2>;
  }

  return (
    <div className="p-8 my-8">
      <h1>My Posts</h1>
      <PostHeaderActions />
      {content}
    </div>
  );
};
