import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addFavorite,
  removeFavorite,
} from "../../app/servises/favorite.services";
import { auth } from "../../firebase";

import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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
  const navigate = useNavigate();

  //TODO
  const [isFav, setIsFav] = useState(false);

  // get auth user
  const authUser = auth.currentUser;

  let onlyAuthActions;

  if (authUser.displayName === author) {
    onlyAuthActions = (
      <>
        <EditIcon
          className="text-accent"
          onClick={() => navigate(`/edit/${postId}`)}
        />
        <DeleteForeverIcon className="text-danger" onClick={onClick} />
      </>
    );
  } else {
    onlyAuthActions = <></>;
  }

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
      <div className="p-4">
        <h2>{name}</h2>
        <h3>{store}</h3>
        <p>{description}</p>
      </div>
      <div className="p-4 text-right">
        {isFav ? (
          <FavoriteIcon className="text-primary" onClick={removeFavHandler} />
        ) : (
          <FavoriteBorderIcon
            className="text-primary"
            onClick={addFavHandler}
          />
        )}
        {onlyAuthActions}
      </div>
    </div>
  );
};
