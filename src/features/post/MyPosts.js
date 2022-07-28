import React, { useCallback, useEffect, useState } from "react";

import { auth, db } from "../../firebase";
import { getPostByUserId } from "../../app/servises/post.services";

import { Menu } from "../../components/organisms/Menu";
import { Post } from "./Post";
import { useSelector } from "react-redux";
import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";

export const MyPosts = () => {
  const [myPosts, setMyPosts] = useState([]);
  // redux stateからuserデータをとってくる
  const { user } = useSelector((state) => state.user);

  // myPostIdList のデータをとる
  const myPostIdList = user.myPostIdList;

  console.log("myPostIdList", myPostIdList);

  // getMyPosts ファンクションつくる
  const getMyPosts = useCallback(async () => {
    const postColRef = collection(db, "posts");

    // firebaseのクエリをつくる、postのドキュメントの中で、そのdocumentIdがmyPostIdListに含まれているもの
    const q = query(postColRef, where(documentId(), "in", myPostIdList));

    // getPostsにそのクエリを渡して、myposts を取得
    const result = await getDocs(q);
    setMyPosts(
      result.docs.map((doc) => ({
        ...doc.data(),
        myPostId: doc.id,
      }))
    );
  }, [myPostIdList]);

  // getMyPosts を実行
  // getMyPosts();

  // const userId = auth.currentUser.uid;

  // const getMine = async () => {
  //   try {
  //     const data = await getPostByUserId(userId);
  //     setMyPosts(
  //       data.docs.map((doc) => ({
  //         ...doc.data(),
  //         myPostId: doc.id,
  //       }))
  //     );
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
              key={post.myPostId}
              myPostId={post.myPostId}
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
