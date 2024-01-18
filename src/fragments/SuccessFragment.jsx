import DownloadIcon from "@mui/icons-material/Download";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useSuccessAEString } from "../contexts/TextProvider.jsx";
import { superCenter } from "../theme.jsx";
import { getDates } from "../utiles.js";
const SuccessAE = ({ first }) => {
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const labels = useSuccessAEString();
  return (
    <Box container sx={{ ...superCenter, paddingBottom: 5 }}>
      {/* Your component content */}

      <Typography variant="h4" color="success.main" gutterBottom>
        {first ? labels.title1 : labels.title2}
      </Typography>
      <Typography variant="h6">
        {labels.body[0]}
        {startDay.toLocaleDateString("en-GB")}.
      </Typography>
      {first && (
        <Typography variant="h6">
          {labels.body[1]}
          {fthMonth.toLocaleDateString("en-GB")}
          {labels.body[2]}
          {sixMonth.toLocaleDateString("en-GB")}.
        </Typography>
      )}
      <Typography variant="h6" paddingbottom={5}>
        {first ? labels.body[3] : labels.body[4]}
        {lastMonth.toLocaleDateString("en-GB")}.
      </Typography>
      <Alert paddingbottom={5} severity="info">
        {first && <Typography>{labels.alert.body[0]}</Typography>}
        <Typography>{labels.alert.body[1]}</Typography>

        <IconButton aria-label="delete" size="large">
          <DownloadIcon />
        </IconButton>
      </Alert>
    </Box>
  );
};
export default SuccessAE;
