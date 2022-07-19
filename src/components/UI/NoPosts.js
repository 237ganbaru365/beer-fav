import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./Button";

export const NoPosts = () => {
  const navigate = useNavigate();
  return (
    <div className="FlexColumn text-center mt-10 my-20">
      <h2>
        There're no posts yet...
        <br />
        Do you want to create a new post?
      </h2>
      <Button
        content="CREATE"
        className="mt-5"
        onClick={() => navigate("/new")}
      />
    </div>
  );
};
