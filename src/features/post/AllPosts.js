import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getAllPost } from "../../app/servises/post.services";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Post } from "./Post";
import { DotLine } from "../../components/atoms/DotLine";

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

  useEffect(() => {
    getAll();
  }, []);

  let content;

  if (posts.length > 0) {
    content = (
      <div className="p-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts.map((post) => (
          <Post
            {...post}
            key={post.postId}
            postId={post.postId}
            author={post.username}
            reloadPosts={getAll}
          />
        ))}
      </div>
    );
  } else if (posts.length <= 0) {
    content = <h2 className="text-center">No posts yet...</h2>;
  }

  return (
    <section className="h-full FlexCenter">
      <div>
        <h1 className="text-center mb-4">All Posts</h1>
        <p className="text-center FlexCenter mb-4">
          CREATE YOUR OWN
          <Link to="/new">
            <AddCircleIcon color="white" />
          </Link>
        </p>
        <DotLine />
        {content}
      </div>
    </section>
  );
};
