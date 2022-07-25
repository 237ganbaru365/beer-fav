import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import {
  deletePost,
  getAllPost,
  getFavPosts,
} from "../../app/servises/post.services";

import { Menu } from "../../components/organisms/Menu";
import { auth } from "../../firebase";
import { Post } from "./Post";

export const Posts = () => {
  const [posts, setPosts] = useState([]);

  const userId = auth.currentUser.uid;

  const getAll = async () => {
    try {
      const data = await getAllPost();
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = async (id) => {
    await deletePost(id);
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
              key={post.id}
              postId={post.id}
              userId={userId}
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
      <h1 className="text-center mb-4 text-primary">All posts</h1>
      {content}
    </>
  );
};
