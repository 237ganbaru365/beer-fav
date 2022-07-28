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

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  const { user } = useSelector((state) => state.user);
  const myPostIdList = user.myPostIdList;

  //TODO: getmyPostsをservicesに切り分けてる
  const getMyPosts = useCallback(async () => {
    const postColRef = collection(db, "posts");

    const q = query(postColRef, where(documentId(), "in", myPostIdList));

    const result = await getDocs(q);
    setMyPosts(
      result.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }))
    );
  }, [myPostIdList]);

  useEffect(() => {
    getMyPosts();
  }, [getMyPosts]);

  let content;

  if (myPosts.length > 0) {
    content = (
      <section className="p-8">
        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {myPosts.map((post) => (
            <Post
              {...post}
              key={post.postId}
              myPostId={post.postId}
              author={post.username}
            />
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
