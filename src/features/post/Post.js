import React, { useState } from "react";

import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DotLine } from "../../components/atoms/DotLine";
import { OnlyAuthActions } from "../../components/organisms/OnlyAuthActions";
import { useDispatch, useSelector } from "react-redux";
import { addFavPostId, removeFavPostId } from "../user/userSlice";

export const Post = ({
  name,
  store,
  description,
  imgUrl,
  author,
  onClick,
  postId,
  userId,
  favId,
}) => {
  // FIXME: あとでけす
  const [isFav, setIsFav] = useState(true);

  const dispatch = useDispatch();

  const { favPostIdList } = useSelector((state) => state.user.user);

  // get auth user
  const authUser = auth.currentUser;
  const authUid = authUser.uid;

  // ログインしているユーザーのステートとって

  // そのfavListを取得して

  // propsで渡されるpostIdが、favListにあったら、favIcon はactive

  // else non active

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
        {isFav ? (
          <FavoriteIcon className="text-primary" onClick={removeFavHandler} />
        ) : (
          <FavoriteBorderIcon
            className="text-primary"
            onClick={addFavHandler}
          />
        )}
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
