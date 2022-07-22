import React from "react";

export const Card = ({ children, styles, ...props }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${styles}`}>
      {children}
    </div>
  );
};
