import { Stack, TextField, Box } from "@mui/material";
import React from "react";
import { useResetPasswordString } from "../contexts/TextProvider";

const PasswordFragment = React.forwardRef((props, ref) => {
  const [passwordChange, setPasswordChange] = React.useState({
    password: "",
    newps: "",
    renewps: "",
  });
  const labels = useResetPasswordString();

  const handleChange = (field, value) => {
    setPasswordChange((prev) => ({ ...prev, [field]: value }));
  };

  const sendData = (consulta = false) => {
    //TODO CONECTAR y cambiar clave
    let connect = true;
    return connect;
  };

  React.useImperativeHandle(ref, () => ({
    sendData,
  }));
  return (
    <Box>
      <Stack spacing={2}>
        <TextField
          sx={{ width: "15vw" }}
          id="password"
          label={labels.textFieldLabels[0]}
          type="password"
          required
          value={passwordChange.password}
          onChange={(event) => {
            handleChange("password", event.target);
          }}
          variant="standard"
        />
        <TextField
          sx={{ width: "15vw" }}
          id="password"
          label={labels.textFieldLabels[1]}
          type="password"
          required
          value={passwordChange.newps}
          onChange={(event) => {
            handleChange("newps", event.target);
          }}
          variant="standard"
        />
        <TextField
          sx={{ width: "15vw" }}
          id="passwordres"
          label={labels.textFieldLabels[2]}
          type="password"
          required
          value={passwordChange.renewps}
          onChange={(event) => {
            handleChange("renewps", event.target);
          }}
          variant="standard"
        />
      </Stack>
    </Box>
  );
});

export default PasswordFragment;
