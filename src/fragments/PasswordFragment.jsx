import { Stack, TextField, Box } from "@mui/material";
import React from "react";
import { useResetPasswordString } from "../contexts/TextProvider";
import { testpassword } from "../utiles";

const PasswordFragment = React.forwardRef((props, ref) => {
  const [passwordChange, setPasswordChange] = React.useState({
    password: "",
    newps: "",
    renewps: "",
  });
  const [error, setError] = React.useState(false);
  const labels = useResetPasswordString();

  const handleChange = (field, value) => {
    setPasswordChange((prev) => ({ ...prev, [field]: value }));
  };

  const sendData = () => {
    setError(!testpassword(passwordChange.newps, passwordChange.renewps));
    return [error, error ? passwordChange : null];
  };

  React.useImperativeHandle(ref, () => ({
    sendData,
  }));
  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          id="password"
          label={labels.textFieldLabels[0]}
          required
          value={passwordChange.password}
          onChange={(event) => {
            handleChange("password", event.target.value);
          }}
          type="password"
          variant="standard"
        />
        <TextField
          id="password"
          label={labels.textFieldLabels[1]}
          type="password"
          required
          error={error}
          value={passwordChange.newps}
          onChange={(event) => {
            handleChange("newps", event.target.value);
          }}
          variant="standard"
        />
        <TextField
          id="passwordres"
          label={labels.textFieldLabels[2]}
          type="password"
          required
          error={error}
          value={passwordChange.renewps}
          onChange={(event) => {
            handleChange("renewps", event.target.value);
          }}
          variant="standard"
        />
      </Stack>
    </Box>
  );
});

export default PasswordFragment;
