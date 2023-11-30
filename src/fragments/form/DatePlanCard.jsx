import { Box, Typography } from "@mui/material";
import React from "react";
import { useDatePlanAEString } from "../../contexts/TextProvider.jsx";
import { getDates } from "../../utiles.js";

const DatePlanAE = ({ first }) => {
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const labels = useDatePlanAEString();
  return (
    <Box
      paddingBottom={5}
      textAlign="center"
      s
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" color="primary" gutterBottom>
        {labels.title}
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
      <Typography variant="h6">
        {first ? labels.body[3] : labels.body[4]}
        {lastMonth.toLocaleDateString("en-GB")}.
      </Typography>
      <Typography variant="h6">{labels.body[5]}</Typography>
    </Box>
  );
};
export default DatePlanAE;
