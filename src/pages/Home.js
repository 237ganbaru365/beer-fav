import React from "react";
import { Link } from "react-router-dom";

import { Button } from "../components/UI/Button";
import icon from "../assets/img/top-beer.png";

export const Home = () => {
  return (
    <>
      <div className="bg-primary px-5 py-24 sm:py-28 md:py-32 rounded-b-lg">
        <div className="FlexCenter flex-col text-center">
          <h1 className="text-neutral">Welcome to Cheers!</h1>
          <img src={icon} alt="beer" className="w-1/6" />
          <h2 className="text-neutral">Remember your best beer experience</h2>
        </div>
      </div>
      <div className="text-center my-8 md:my-12">
        <Link to="/login">
          <Button className="h-12 my-2 px-20 mr-2 Hover" content="LOG IN" />
        </Link>
        <Link to="/signup">
          <Button className="h-12 my-2 px-20 Hover" content="SIGN UP" />
        </Link>
      </div>
    </>
  );
};
