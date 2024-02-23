import { Stack, TextField } from "@mui/material";
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
    return {
      error,
      data: !error
        ? {
            current_password: passwordChange.password,
            new_password: passwordChange.newps,
            new_password_confirmation: passwordChange.renewps,
          }
        : null,
    };
  };

  React.useImperativeHandle(ref, () => ({
    sendData,
  }));
  return (
    <Stack spacing={1}>
      <TextField
        id="password"
        sx={{ width: "25vw" }}
        label={labels.textFieldLabels[0]}
        size="small"
        required
        autoComplete="off"
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
        size="small"
        type="password"
        sx={{ width: "25vw" }}
        required
        autoComplete="off"
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
        size="small"
        type="password"
        sx={{ width: "25vw" }}
        required
        autoComplete="off"
        error={error}
        value={passwordChange.renewps}
        onChange={(event) => {
          handleChange("renewps", event.target.value);
        }}
        variant="standard"
      />
    </Stack>
  );
});

export default PasswordFragment;
