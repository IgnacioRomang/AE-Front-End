import DownloadIcon from "@mui/icons-material/Download";
import { Alert, Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useComponentMessageSuccessString } from "../../contexts/TextProvider.jsx";
import { superCenter } from "../../theme.jsx";
import { getDates } from "../../utiles.js";
const FormMessageSuccess = ({ first }) => {
  const { startDay, fthMonth, sixMonth, lastMonth } = getDates();
  const menssagesuccesslabels = useComponentMessageSuccessString();
  return (
    <Box container sx={{ ...superCenter, paddingBottom: 5 }}>
      {/* Your component content */}

      <Typography variant="h4" color="success.main" gutterBottom>
        {first
          ? menssagesuccesslabels.create.title.first_ae
          : menssagesuccesslabels.create.title.n_ae}
      </Typography>
      <Typography variant="h6">
        {menssagesuccesslabels.create.body[0]}
        {startDay.toLocaleDateString("en-GB")}.
      </Typography>
      {first && (
        <Typography variant="h6">
          {menssagesuccesslabels.create.body[1]}
          {fthMonth.toLocaleDateString("en-GB")}
          {menssagesuccesslabels.create.body[2]}
          {sixMonth.toLocaleDateString("en-GB")}.
        </Typography>
      )}
      <Typography variant="h6" paddingbottom={5}>
        {first
          ? menssagesuccesslabels.create.body[3]
          : menssagesuccesslabels.create.body[4]}
        {lastMonth.toLocaleDateString("en-GB")}.
      </Typography>
      <Alert paddingbottom={5} severity="info">
        {first && (
          <Typography>{menssagesuccesslabels.create.alert.body[0]}</Typography>
        )}
      </Alert>
    </Box>
  );
};
export default FormMessageSuccess;
