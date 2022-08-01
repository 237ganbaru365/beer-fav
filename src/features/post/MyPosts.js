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

import { Post } from "./Post";
import { PostHeaderActions } from "../../components/molecules/PostHeaderActions";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);

  const { user } = useSelector((state) => state.user);
  const myPostIdList = user.myPostIdList;

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
      <div className="p-8 md:p-12 grid gap-4 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {myPosts.map((post) => (
          <Post
            {...post}
            key={post.postId}
            myPostId={post.postId}
            author={post.username}
            reloadPosts={getMyPosts}
          />
        ))}
      </div>
    );
  } else if (myPosts.length <= 0) {
    content = <h2 className="text-center">No my posts yet...</h2>;
  }

  return (
    <div className="p-8 my-8">
      <h1>My Posts</h1>
      <PostHeaderActions />
      {content}
    </div>
  );
};
