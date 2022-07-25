import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { getFavPosts, deletePost } from "../../app/servises/post.services";

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";

export const FavoritePosts = () => {
  const favArr = useSelector((state) => state.post.favorite);
  const [posts, setPosts] = useState([]);

  const getPost = async () => {
    const data = await getFavPosts(favArr);
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const deleteHandler = async (id) => {
    await deletePost(id);
    getPost();
  };

  useEffect(() => {
    getPost();
  }, [favArr]);

  let content;

  if (posts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Post
              {...post}
              key={post.id}
              id={post.id}
              onClick={() => deleteHandler(post.id)}
            />
          ))}
        </div>
      </section>
    );
  } else if (posts.length <= 0) {
    content = <h2 className="text-center">No post yet...</h2>;
  }

  return (
    <>
      <Menu />
      <h1 className="text-center mb-4 text-primary">Your favorite posts</h1>
      {content}
    </>
  );
};
