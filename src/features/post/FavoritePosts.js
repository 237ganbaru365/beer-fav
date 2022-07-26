import React, { useEffect, useState } from "react";

import { auth } from "../../firebase";
import { getFavoritePostByUserId } from "../../app/servises/favorite.services";

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";

export const FavoritePosts = () => {
  const [favPosts, setFavPosts] = useState([]);

  const userId = auth.currentUser.uid;

  const getFavorite = async () => {
    try {
      const data = await getFavoritePostByUserId(userId);

      setFavPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          favId: doc.id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFavorite();
  }, []);

  let content;

  if (favPosts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favPosts.map((post) => (
            <Post {...post} key={post.favId} favId={post.favId} />
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
