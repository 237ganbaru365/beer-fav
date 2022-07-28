import React from "react";

export const Card = ({ children, styles }) => {
  return (
    <div
      className={`bg-neutral rounded-xl shadow-xl p-10 mx-10 sm:mx-20 md:mx-28 lg:mx-40 xl:mx-80 my-20 ${styles}`}
    >
      {children}
    </div>
  );
};
