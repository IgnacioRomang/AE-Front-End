import { Typography } from "@mui/material";
const Alert = lazy(() => import("@mui/material/Alert"));
const AlertTitle = lazy(() => import("@mui/material/AlertTitle"));
import React from "react";
import { textJustifyStyle } from "../theme";

const AlertFragment = ({ type, title, body }) => {
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
      </Alert>
    </>
  );
};

export default AlertFragment;
