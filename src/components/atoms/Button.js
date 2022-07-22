import React, { memo } from "react";

// use memo to skip frequent rerendering
// check the props is new/old to do re-rendering or reuse exist component
export const Button = memo(
  ({ type, onClick, disabled, className, content }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`bg-secondary text-neutral rounded-2xl px-4 py-1 focus:outline-none font-semibold md:py-2 rounded-3xl ${className}`}
      >
        {content}
      </button>
    );
  }
);
