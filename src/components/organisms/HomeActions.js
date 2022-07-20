import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../atoms/Button";

export const HomeActions = () => {
  return (
    <div className="text-center my-8 md:my-12">
      <Link to="/login">
        <Button className="h-12 my-2 px-20 mr-2 Hover" content="LOG IN" />
      </Link>
      <Link to="/signup">
        <Button className="h-12 my-2 px-20 Hover" content="SIGN UP" />
      </Link>
    </div>
  );
};
