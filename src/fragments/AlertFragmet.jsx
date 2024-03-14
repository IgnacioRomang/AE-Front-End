import React, { lazy } from "react";
import { Typography } from "@mui/material";
import { textJustifyStyle } from "../theme";
const Alert = lazy(() => import("@mui/material/Alert"));
const AlertTitle = lazy(() => import("@mui/material/AlertTitle"));

const AlertFragment = ({ type, title, body, strong }) => {
  return (
    <>
      {" "}
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        {body.map((label, index) => (
          <Typography key={index} sx={textJustifyStyle}>
            {label}
          </Typography>
        ))}
        {strong ? <strong>{strong}</strong> : null}
      </Alert>
    </>
  );
};

export default AlertFragment;
