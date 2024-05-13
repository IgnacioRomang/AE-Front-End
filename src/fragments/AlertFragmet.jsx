import React, { lazy } from "react";
import { Typography } from "@mui/material";
import { centeringStyles, textJustifyStyle } from "../theme.jsx";
const Alert = lazy(() => import("@mui/material/Alert"));
const AlertTitle = lazy(() => import("@mui/material/AlertTitle"));

const AlertFragment = ({ type, title, body, strong }) => {
  return (
    <>
      {" "}
      <Alert severity={type} sx={centeringStyles}>
        <AlertTitle>
          <Typography variant={"h6"}>{title}</Typography>
        </AlertTitle>
        {body.map((label, index) => (
          <Typography
            variant={"body1"}
            key={index + "-alert-body"}
            sx={textJustifyStyle}
          >
            {label}
          </Typography>
        ))}
        {strong ? <strong>{strong}</strong> : null}
      </Alert>
    </>
  );
};

export default AlertFragment;
