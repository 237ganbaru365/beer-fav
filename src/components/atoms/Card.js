import React from "react";

export const Card = ({ children, styles, ...props }) => {
  return <div className={`WhiteContainer ${styles}`}>{children}</div>;
};
