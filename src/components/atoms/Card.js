import React from "react";

export const Card = ({ children, styles }) => {
  return (
    <div className={`bg-neutral rounded-xl shadow-xl p-10 ${styles}`}>
      {children}
    </div>
  );
};
