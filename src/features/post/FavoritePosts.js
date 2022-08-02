import React, { useCallback, useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getFavoritePostsByFavList } from "../../app/servises/post.services";

import { Post } from "./Post";
import { PostHeaderActions } from "../../components/molecules/PostHeaderActions";
import CircularProgress from "@mui/material/CircularProgress";

export const FavoritePosts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [favPosts, setFavPosts] = useState([]);

  const { favPostIdList } = useSelector((state) => state.user.user);

  const getFavoritePosts = useCallback(async () => {
    setIsLoading(true);
    try {
      const favPostsData = await getFavoritePostsByFavList(favPostIdList);
      setFavPosts(favPostsData);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }, [favPostIdList]);

  useEffect(() => {
    getFavoritePosts();
  }, [getFavoritePosts]);

  let content;

  if (isLoading) {
    content = <CircularProgress color="inherit" />;
  } else if (favPosts.length > 0) {
    content = (
      <div className="p-8 md:p-12 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {favPosts.map((post) => (
          <Post
            {...post}
            key={post.postId}
            favId={post.postId}
            author={post.username}
            reloadPosts={getFavoritePosts}
          />
        ))}
      </div>
    );
  } else if (favPosts.length <= 0) {
    content = <h2 className="text-center">No favorite posts yet...</h2>;
  }
  return (
    <div className="p-8 my-8">
      <h1>My Favorite Posts</h1>
      <PostHeaderActions />
      {content}
    </div>
  );
};
