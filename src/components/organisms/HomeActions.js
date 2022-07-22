import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../atoms/Button";

export const HomeActions = () => {
  return (
    <div className="FlexColumn h-64 md:flex-row">
      <Link to="/login">
        <Button className="w-48 mb-4 md:mr-4 md:mb-0" content="LOG IN" />
      </Link>
      <Link to="/signup">
        <Button className="w-48" content="SIGN UP" />
      </Link>
    </div>
  );
};
