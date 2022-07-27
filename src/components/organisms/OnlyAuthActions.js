import React from "react";
import { useNavigate } from "react-router-dom";

import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const OnlyAuthActions = ({
  authUser,
  author,
  postId,
  deleteHandler,
}) => {
  const navigate = useNavigate();
  let content;

  if (authUser.displayName === author) {
    content = (
      <>
        <EditIcon
          className="text-accent"
          onClick={() => navigate(`/edit/${postId}`)}
        />
        <DeleteForeverIcon className="text-danger" onClick={deleteHandler} />
      </>
    );
  } else {
    content = <></>;
  }

  return <>{content}</>;
};
