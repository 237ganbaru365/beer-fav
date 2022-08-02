import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addFavPostId,
  removeFavPostId,
  removeMyPostId,
} from "../user/userSlice";
import {
  addUserFavPostIdList,
  removeUserFavPostIdList,
  removeUserMyPostIdList,
} from "../../app/servises/user.services";
import { deletePost } from "../../app/servises/post.services";
import { auth } from "../../firebase";

import { DotLine } from "../../components/atoms/DotLine";
import { OnlyAuthActions } from "../../components/molecules/OnlyAuthActions";
import { FavoriteBtn } from "../../components/atoms/FavoriteBtn";
import CircularProgress from "@mui/material/CircularProgress";

export const Post = ({ name, store, description, imgUrl, author, postId }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { favPostIdList, myPostIdList } = useSelector(
    (state) => state.user.user
  );

  // check current authenticated user
  const authUser = auth.currentUser;
  const authUid = authUser.uid;

  const deleteHandler = async () => {
    setIsLoading(true);

    try {
      // delete the post from post db
      await deletePost(postId);

      // delete the post from user db
      await removeUserMyPostIdList(authUid, myPostIdList, postId);

      // TODO: also remove the post from someone's favoriteList

      // delete the post from user redux state
      dispatch(
        removeMyPostId({
          postId,
        })
      );
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

    // TODO: realtime fetch db
  };

  const addFavHandler = async () => {
    setIsLoading(true);
    try {
      // store user data to firestore
      await addUserFavPostIdList(authUid, favPostIdList, postId);

      // set postid to user state
      dispatch(
        addFavPostId({
          postId,
        })
      );
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    // TODO: realtime fetch db
  };

  const removeFavHandler = async () => {
    setIsLoading(true);
    try {
      // delete user data to firestore
      await removeUserFavPostIdList(authUid, favPostIdList, postId);

      // set postid to user state
      dispatch(
        removeFavPostId({
          postId,
        })
      );
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);

    // TODO: realtime fetch db
  };

  return (
    <div className="bg-neutral rounded-xl shadow-md">
      <img
        src={imgUrl}
        alt="img"
        className="rounded-t-lg object-cover h-32 w-full opacity-70"
      />
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
      <div className="p-2 text-right flex">
        {isLoading && <CircularProgress color="inherit" size={20} />}
        <p className="flex basis-full justify-end">
          <FavoriteBtn
            postId={postId}
            removeFavHandler={removeFavHandler}
            addFavHandler={addFavHandler}
          />
          <OnlyAuthActions
            deleteHandler={deleteHandler}
            postId={postId}
            author={author}
            authUser={authUser}
          />
        </p>
      </div>
    </div>
  );
};
