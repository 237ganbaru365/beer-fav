import React, { forwardRef } from "react";
import TextField from "@mui/material/TextField";

// should use forwordref to skip components to pass props from parent to children, because can't use ref so that functional component don't have instance
export const FormInputText = forwardRef((props, ref) => {
  return <TextField variant="standard" inputRef={ref} {...props} />;
});
