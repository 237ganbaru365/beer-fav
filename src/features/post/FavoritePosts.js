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

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";
import { deletePost } from "../../app/servises/post.services";

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

  const deleteHandler = async (postId) => {
    await deletePost(postId);
    getFavoritePosts();
  };

  useEffect(() => {
    getFavoritePosts();
  }, [getFavoritePosts]);

  let content;

  if (favPosts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favPosts.map((post) => (
            <Post
              {...post}
              key={post.postId}
              favId={post.postId}
              author={post.username}
              deleteHandler={() => deleteHandler(post.postId)}
            />
          ))}
        </div>
      </section>
    );
  } else if (favPosts.length <= 0) {
    content = <h2 className="text-center">No favorite yet...</h2>;
  }
  return (
    <>
      <Menu />
      <h1 className="text-center mb-4 text-primary">Your favorite posts</h1>
      {content}
    </>
  );
};
