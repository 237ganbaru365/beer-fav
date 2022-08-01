import React, { useCallback, useEffect, useState } from "react";

import { db } from "../../firebase";
import { useSelector } from "react-redux";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Post } from "./Post";
import { PostHeaderActions } from "../../components/molecules/PostHeaderActions";

export const FavoritePosts = () => {
  const [favPosts, setFavPosts] = useState([]);

  const { user } = useSelector((state) => state.user);
  const favPostIdList = user.favPostIdList;

  const getFavoritePosts = useCallback(async () => {
    const postColRef = collection(db, "posts");

    const q = query(postColRef, where(documentId(), "in", favPostIdList));

    const result = await getDocs(q);

    setFavPosts(
      result.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }))
    );
  }, [favPostIdList]);

  useEffect(() => {
    getFavoritePosts();
  }, [getFavoritePosts]);

  let content;

  if (favPosts.length > 0) {
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
