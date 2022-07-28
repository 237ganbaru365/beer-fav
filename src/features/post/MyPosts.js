import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { db } from "../../firebase";
import { useSelector } from "react-redux";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DotLine } from "../../components/atoms/DotLine";
import { Post } from "./Post";

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
      <div className="p-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
    <section className="h-full FlexCenter">
      <div>
        <h1 className="text-center mb-4">My Posts</h1>
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
