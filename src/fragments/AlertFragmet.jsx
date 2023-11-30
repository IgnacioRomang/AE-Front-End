import { Alert, AlertTitle, Typography } from "@mui/material";
import React from "react";
import { textJustifyStyle } from "../theme";

const AlertFragment = ({ type, title, body }) => {
  return (
    <>
      {" "}
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        <Typography sx={textJustifyStyle}>{body[0]}</Typography>
        <Typography sx={textJustifyStyle}>{body[1]}</Typography>
        <Typography sx={textJustifyStyle}>{body[2]}</Typography>
      </Alert>
    </>
  );
};

export default AlertFragment;
