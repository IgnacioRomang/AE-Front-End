import { Box, Typography } from "@mui/material";
import React from "react";
import { useUnRegisterSuccessString } from "../contexts/TextProvider.jsx";
import { getDates } from "../utiles.js";
import { superCenter } from "../theme.jsx";
const UnRegisterSuccessFragment = ({ first }) => {
  const labels = useUnRegisterSuccessString();
  return (
    <Box container="true" sx={{ ...superCenter, paddingBottom: 5 }}>
      {/* Your component content */}

      <Typography variant="h4" color="success.main" gutterBottom>
        {first ? labels.title1 : labels.title}
      </Typography>

      <Typography variant="h6">{labels.body}</Typography>
    </Box>
  );
};
export default UnRegisterSuccessFragment;
