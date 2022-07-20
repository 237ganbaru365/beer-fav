import React, { useEffect, useState } from "react";
import { getAllPost, deletePost } from "../../app/servises/post.services";

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    const data = await getAllPost();
    setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  let content;

  if (posts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <Post {...post} key={post.id} />
          ))}
        </div>
      </section>
    );
  } else if (posts.length < 0) {
    content = <p>No post yet...</p>;
  }

  return (
    <>
      <Menu />
      {content}
    </>
  );
};
