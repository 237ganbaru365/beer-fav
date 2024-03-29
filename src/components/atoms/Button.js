import React, { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";

// use memo to skip frequent rerendering
// check the props is new/old to do re-rendering or reuse exist component
export const Button = memo(
  ({ type, onClick, disabled, className, content }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`bg-dark text-neutral font-quicksand font-semibold px-4 py-2 focus:outline-none rounded-3xl transform ease-in-out duration-300 hover:-translate-y-1 disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
      >
        {disabled && (
          <CircularProgress
            color="inherit"
            size={12}
            sx={{ marginRight: "10px" }}
          />
        )}
        {content}
      </button>
    );
  }
);
