import { Box, Typography } from "@mui/material";
import React, { useImperativeHandle } from "react";
import { useFormDatePlanString } from "../../contexts/TextProvider.jsx";
import { getDates } from "../../utiles.js";
/* The code defines a React functional component called `DatePlanAE`. It is a form component that
displays information about dates and allows the user to enter a code. */
const FormDatePlan = React.forwardRef((props, ref) => {
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const formdateplanlabels = useFormDatePlanString();

  const getData = () => {
    return {
      startDay: startDay,
      fthMonth: fthMonth,
      sixMonth: sixMonth,
      lastMonth: lastMonth,
    };
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));

  return (
    <Box
      paddingBottom={3}
      textAlign="center"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" color="primary" gutterBottom>
        {formdateplanlabels.title}
      </Typography>

      <Typography variant="h6">
        {formdateplanlabels.body[0]}
        {startDay.toLocaleDateString("en-GB")}
      </Typography>

      {props.first && (
        <Typography variant="h6">
          {formdateplanlabels.body[1]}
          {fthMonth.toLocaleDateString("en-GB")}
          {formdateplanlabels.body[2]}
          {sixMonth.toLocaleDateString("en-GB")}.
        </Typography>
      )}
      <Typography variant="h6">
        {props.first ? formdateplanlabels.body[3] : formdateplanlabels.body[4]}
        {lastMonth.toLocaleDateString("en-GB")}.
      </Typography>
      <Typography paddingBottom={3} variant="h6">
        {formdateplanlabels.body[5]}
      </Typography>
    </Box>
  );
});
export default FormDatePlan;
