import React from "react";

export const Header = () => {
  return (
    <header className="bg-primary text-emerald-50 h-16 flex items-center justify-between px-3 py-2">
      {/* FIXME: add auth validation */}
      <h2 className="font-oleo">Cheers!</h2>
    </header>
  );
};
