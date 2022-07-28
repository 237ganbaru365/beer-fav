import React, { useState } from "react";

import {
  addFavorite,
  removeFavorite,
} from "../../app/servises/favorite.services";
import { auth } from "../../firebase";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { DotLine } from "../../components/atoms/DotLine";
import { OnlyAuthActions } from "../../components/organisms/OnlyAuthActions";

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
  //TODO
  const [isFav, setIsFav] = useState(false);

  // ログインしているユーザーのステートとって

  // そのfavListを取得して

  // propsで渡されるpostIdが、favListにあったら、favIcon はactive

  // else non active

  // get auth user
  const authUser = auth.currentUser;

  const addFavHandler = async () => {
    await addFavorite(postId, userId);
    setIsFav(true);
  };

  const removeFavHandler = async () => {
    await removeFavorite(favId);
    setIsFav(false);
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
