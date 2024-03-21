import {
  Backdrop,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import AlertFragment from "./AlertFragmet";
import { useLoadingAlertString } from "../contexts/TextProvider";

const ProcessAlert = ({ open, loading, success }) => {
  const loadingalert = useLoadingAlertString();
  return (
    <Backdrop open={open}>
      {loading ? (
        <Paper>
          <Stack
            padding={4}
            spacing={5}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <CircularProgress />
            <Typography variant="body1">{loadingalert.process}</Typography>
          </Stack>
        </Paper>
      ) : success && !loading ? (
        <AlertFragment
          type={"success"}
          title={loadingalert.alert.success.title}
          body={loadingalert.alert.success.body}
          strong={loadingalert.alert.success.strong}
        />
      ) : (
        <AlertFragment
          type={"error"}
          title={loadingalert.alert.error.title}
          body={loadingalert.alert.error.body}
          strong={loadingalert.alert.error.strong}
        />
      )}
    </Backdrop>
  );
};

export default ProcessAlert;
