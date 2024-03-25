import { Stack, TextField } from "@mui/material";
import React, { forwardRef, useState, useImperativeHandle } from "react";
import { useCommonsFieldString } from "../contexts/TextProvider";
import { testpassword } from "../utiles";

const PasswordFragment = forwardRef((props, ref) => {
  const [passwordChange, setPasswordChange] = useState({
    password: "",
    newps: "",
    renewps: "",
  });
  const [error, setError] = useState(false);
  const commonfields = useCommonsFieldString();

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

  useImperativeHandle(ref, () => ({
    sendData,
  }));
  return (
    <Stack spacing={1}>
      <TextField
        id="password"
        sx={{ width: "25vw" }}
        label={commonfields.oldpassword}
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
        label={commonfields.password}
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
        label={commonfields.password}
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
