import React, { useEffect, useState } from "react";

import { auth } from "../../firebase";
import { getPostByUserId } from "../../app/servises/post.services";

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  const userId = auth.currentUser.uid;

  const getMine = async () => {
    try {
      const data = await getPostByUserId(userId);
      setMyPosts(
        data.docs.map((doc) => ({
          ...doc.data(),
          myPostId: doc.id,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMine();
  }, []);

  let content;

  if (myPosts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {myPosts.map((post) => (
            <Post {...post} key={post.myPostId} myPostId={post.myPostId} />
          ))}
        </div>
      </section>
    );
  } else if (myPosts.length <= 0) {
    content = <h2 className="text-center">No my posts yet...</h2>;
  }

  return (
    <>
      <Menu />
      <h1 className="text-center mb-4 text-primary">Your posts</h1>
      {content}
    </>
  );
};
