import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavPostId, removeFavPostId } from "../user/userSlice";
import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";

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
  onClick,
}) => {
  const dispatch = useDispatch();

  const { favPostIdList } = useSelector((state) => state.user.user);

  // get auth user
  const authUser = auth.currentUser;
  const authUid = authUser.uid;

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
          onClick={onClick}
          postId={postId}
          author={author}
          authUser={authUser}
        />
      </div>
    </div>
  );
};
