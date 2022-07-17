import React, { memo } from "react";
import { Link } from "react-router-dom";

export const MenuOption = memo(({ className, icon, content, to, onClick }) => {
  const menuOption = (
    <div className={className}>
      <h1>{icon}</h1>
      <h4>{content}</h4>
    </div>
  );
  return to ? (
    <Link to={to}>{menuOption}</Link>
  ) : (
    <div onClick={onClick}>{menuOption}</div>
  );
});
