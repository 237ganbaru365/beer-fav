import React, { useEffect, useState } from "react";

import { deletePost, getAllPost } from "../../app/servises/post.services";

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";

export const AllPosts = () => {
  const [posts, setPosts] = useState([]);

  const getAll = async () => {
    try {
      const data = await getAllPost();
      setPosts(data.docs.map((doc) => ({ ...doc.data(), postId: doc.id })));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (postId) => {
    await deletePost(postId);
    getAll();
  };

  useEffect(() => {
    getAll();
  }, []);

  let content;

  if (posts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <Post
              {...post}
              key={post.postId}
              postId={post.postId}
              author={post.username}
              deleteHandler={() => deleteHandler(post.postId)}
            />
          ))}
        </div>
      </section>
    );
  } else if (posts.length <= 0) {
    content = <h2 className="text-center">No posts yet...</h2>;
  }

  return (
    <>
      <Menu />
      <h1 className="text-center mb-4 text-primary">All posts</h1>
      {content}
    </>
  );
};
