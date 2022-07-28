import React from "react";
import { useSelector } from "react-redux";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

export const FavoriteBtn = ({ postId, addFavHandler, removeFavHandler }) => {
  const { favPostIdList } = useSelector((state) => state.user.user);

  let content;

  if (favPostIdList.includes(postId)) {
    content = (
      <FavoriteIcon className="text-primary" onClick={removeFavHandler} />
    );
  } else {
    content = (
      <FavoriteBorderIcon className="text-primary" onClick={addFavHandler} />
    );
  }

  return <>{content}</>;
};
