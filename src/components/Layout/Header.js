import React from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-primary text-emerald-50 h-16 flex items-center justify-between px-3 py-2">
      {/* FIXME: add auth validation */}
      <Link to="/">
        <h2 className="font-oleo">Cheers!</h2>
      </Link>
    </header>
  );
};
