import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addFav, removeFav } from "./postSlice";

import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Post = ({ name, store, description, onClick, imgUrl, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isFav, setIsFav] = useState(false);

  const addFavHandler = () => {
    dispatch(addFav(id));
    setIsFav(true);
  };

  const removeFavHandler = () => {
    dispatch(removeFav(id));
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
        <EditIcon
          className="text-accent"
          onClick={() => navigate(`/edit/${id}`)}
        />
        <DeleteForeverIcon className="text-danger" onClick={onClick} />
      </div>
    </div>
  );
};
