import { Alert, AlertTitle, Typography } from "@mui/material";
import React from "react";

const AlertFragment = ({ type, title, body }) => {
  return (
    <>
      {" "}
      <Alert severity={type}>
        <AlertTitle>{title}</AlertTitle>
        <Typography sx={{ textAlign: "justify" }}>{body[0]}</Typography>
        <Typography sx={{ textAlign: "justify" }}>{body[1]}</Typography>
        <Typography sx={{ textAlign: "justify" }}>{body[2]}</Typography>
      </Alert>
    </>
  );
};

export default AlertFragment;
