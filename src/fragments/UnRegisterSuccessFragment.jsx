import { Box, Typography } from "@mui/material";
import React from "react";
import { useUnRegisterSuccessString } from "../contexts/TextProvider.jsx";
import { getDates } from "../utiles.js";

const UnRegisterSuccessFragment = ({ first }) => {
  const labels = useUnRegisterSuccessString();
  return (
    <Box
      container="true"
      sx={{ paddingBottom: 5 }}
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      {/* Your component content */}

      <Typography variant="h4" color="success.main" gutterBottom>
        {first ? labels.title1 : labels.title}
      </Typography>

      <Typography variant="h6">{labels.body}</Typography>
    </Box>
  );
};
export default UnRegisterSuccessFragment;
