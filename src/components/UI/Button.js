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
        className={className}
      >
        {content}
      </button>
    );
  }
);
