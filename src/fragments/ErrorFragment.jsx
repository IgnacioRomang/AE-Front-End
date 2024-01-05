import { Alert, Box, Typography } from "@mui/material";
import React from "react";
import { useErrorAEString } from "../contexts/TextProvider.jsx";
import { boxErrorAESyle } from "../theme.jsx";

const ErrorAE = () => {
  const labels = useErrorAEString();
  return (
    <Box sx={boxErrorAESyle}>
      <Typography variant="h4" color="error" gutterBottom>
        {labels.title}
      </Typography>
      <Typography variant="h6" style={{ color: "red" }}>
        {labels.body}
      </Typography>
      <Alert paddingbottom={5} severity="error">
        {labels.alert.body.map((text, index) => (
          <Typography key={index}>{text}</Typography>
        ))}
      </Alert>
    </Box>
  );
};

export default ErrorAE;
