import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

import {
  addFavPostId,
  removeFavPostId,
  removeMyPostId,
} from "../user/userSlice";
import { auth, db } from "../../firebase";
import { deletePost } from "../../app/servises/post.services";

import { DotLine } from "../../components/atoms/DotLine";
import { OnlyAuthActions } from "../../components/organisms/OnlyAuthActions";
import { FavoriteBtn } from "../../components/organisms/FavoriteBtn";

export const Post = ({
  name,
  store,
  description,
  imgUrl,
  author,
  postId,
  reloadPosts,
}) => {
  const dispatch = useDispatch();

  const { favPostIdList, myPostIdList } = useSelector(
    (state) => state.user.user
  );

  // get auth user
  const authUser = auth.currentUser;
  const authUid = authUser.uid;

  const deleteHandler = async (postId) => {
    // delete the post from post db
    await deletePost(postId);

    // delete the post from user db
    const userDocRef = doc(db, "users", authUid);

    const newMyPostIdList = myPostIdList.filter((id) => id !== postId);

    await updateDoc(userDocRef, {
      myPostIdList: newMyPostIdList,
    });

    // delete the post from user redux state
    dispatch(
      removeMyPostId({
        postId,
      })
    );

    // update page
    reloadPosts();
  };

  const addFavHandler = async () => {
    // store user data to firestore
    const userDocRef = doc(db, "users", authUid);

    updateDoc(userDocRef, {
      favPostIdList: [...favPostIdList, postId],
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    // set postid to user state
    dispatch(
      addFavPostId({
        postId,
      })
    );
  };

  const removeFavHandler = async () => {
    // delete user data to firestore
    const userDocRef = doc(db, "users", authUid);

    const newFavPostIdList = favPostIdList.filter((id) => id !== postId);

    updateDoc(userDocRef, {
      favPostIdList: newFavPostIdList,
    })
      .then((res) => console.log(res))
      .catch((err) => console.error(err));

    // set postid to user state
    dispatch(
      removeFavPostId({
        postId,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div>
        <img
          src={imgUrl}
          alt="img"
          className="rounded-t-lg object-cover h-32 w-full opacity-70"
        />
      </div>
      <p className="text-right p-2 text-sm">
        created by: <span className="font-bold">{author}</span>
      </p>
      <div className="px-4">
        <h2>{name}</h2>
        <h4>{store}</h4>
        <DotLine />
        <p>{description}</p>
        <DotLine />
      </div>
      <div className="p-2 text-right">
        <FavoriteBtn
          postId={postId}
          removeFavHandler={removeFavHandler}
          addFavHandler={addFavHandler}
        />
        <OnlyAuthActions
          deleteHandler={() => deleteHandler(postId)}
          postId={postId}
          author={author}
          authUser={authUser}
        />
      </div>
    </div>
  );
};
