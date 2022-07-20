import React from "react";

import icon from "../../assets/img/top-beer.png";

export const Hero = () => {
  return (
    <div className="bg-primary px-5 py-24 sm:py-28 md:py-32 rounded-b-lg">
      <div className="FlexCenter flex-col text-center">
        <h1 className="text-neutral">Welcome to Cheers!</h1>
        <img src={icon} alt="beer" className="w-1/6" />
        <h2 className="text-neutral">Remember your best beer experience</h2>
      </div>
    </div>
  );
};
