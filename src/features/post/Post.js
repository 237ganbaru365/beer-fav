import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const Post = ({ name, store, description, onClick, imgUrl, id }) => {
  const navigate = useNavigate();

  //FIXME: should use redux for storing as global state
  const [isFav, setIsFav] = useState(false);

  const favoriteHandler = () => {
    setIsFav((prev) => !prev);
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
          <FavoriteIcon className="text-primary" onClick={favoriteHandler} />
        ) : (
          <FavoriteBorderIcon
            className="text-primary"
            onClick={favoriteHandler}
          />
        )}
        <EditIcon className="text-accent" onClick={() => navigate("/edit")} />
        <DeleteForeverIcon className="text-danger" onClick={onClick} />
      </div>
    </div>
  );
};
