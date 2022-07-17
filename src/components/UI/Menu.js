import React from "react";

import { MenuOption } from "./MenuOption";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SportsBarIcon from "@mui/icons-material/SportsBar";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export const Menu = () => {
  const commonClassName =
    "FlexColumn text-white rounded-md w-24 sm:w-36 p-2 sm:p-5 mx-1 sm:mx-3 my-10 bg-opacity-80 hover:shadow transform hover:-translate-y-1 duration-300 cursor-pointer";

  return (
    <div className="FlexCenter my-5">
      <MenuOption
        className={`${commonClassName} bg-danger`}
        icon={<FavoriteIcon color="white" />}
        content="Favorite"
        to="/favorite"
      />
      <MenuOption
        className={`${commonClassName} bg-secondary`}
        icon={<SportsBarIcon color="white" />}
        content="my beers"
        to="/my-beers"
      />
      <MenuOption
        className={`${commonClassName} bg-accent`}
        icon={<AddCircleIcon color="white" />}
        content="create"
        to="/new"
      />
    </div>
  );
};
