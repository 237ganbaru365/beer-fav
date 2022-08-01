import React from "react";
import { Link } from "react-router-dom";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DotLine } from "../atoms/DotLine";

export const PostHeaderActions = () => {
  return (
    <>
      <p className="text-center FlexCenter mb-4 transform ease-in-out duration-300 hover:-translate-y-1">
        CREATE YOUR OWN
        <Link to="/new">
          <AddCircleIcon />
        </Link>
      </p>
      <DotLine />
    </>
  );
};
