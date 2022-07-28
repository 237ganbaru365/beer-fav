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

export const FavoritePosts = () => {
  const [favPosts, setFavPosts] = useState([]);

  const { user } = useSelector((state) => state.user);
  const favPostIdList = user.favPostIdList;

  const getFavoritePosts = useCallback(async () => {
    const postColRef = collection(db, "posts");

    const q = query(postColRef, where(documentId(), "in", favPostIdList));

    const result = await getDocs(q);

    setFavPosts(
      result.docs.map((doc) => ({
        ...doc.data(),
        postId: doc.id,
      }))
    );
  }, [favPostIdList]);

  useEffect(() => {
    getFavoritePosts();
  }, [getFavoritePosts]);

  let content;

  if (favPosts.length > 0) {
    content = (
      <div className="p-8 grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favPosts.map((post) => (
          <Post
            {...post}
            key={post.postId}
            favId={post.postId}
            author={post.username}
            reloadPosts={getFavoritePosts}
          />
        ))}
      </div>
    );
  } else if (favPosts.length <= 0) {
    content = <h2 className="text-center">No favorite yet...</h2>;
  }
  return (
    <section className="h-full FlexCenter">
      <div>
        <h1 className="text-center mb-4">My Favorite Posts</h1>
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
