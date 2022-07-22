import React, { useEffect, useState } from "react";
import { deletePost, getAllPost } from "../../app/servises/post.services";

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const data = await getAllPost();
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    await deletePost(id);
    getPosts();
  };

  useEffect(() => {
    getPosts();
  }, []);

  let content;

  if (posts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Post
              {...post}
              key={post.id}
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
      {content}
    </>
  );
};
