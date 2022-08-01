import React from "react";

export const Card = ({ children, styles }) => {
  return (
    <div
      className={`bg-neutral rounded-xl shadow-xl p-10 transform ease-in-out duration-300 hover:-translate-y-1 ${styles}`}
    >
      {children}
    </div>
  );
};
