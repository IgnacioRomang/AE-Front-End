import { Stack, TextField } from "@mui/material";
import React from "react";
import { useLoginString } from "../contexts/TextProvider.jsx";

//TODO QUITAR TEMAS
const LoginFragment = () => {
  const [labels, assets] = useLoginString();

  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);
  return (
    <>
      {" "}
      <Stack
        textAlign="center"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        spacing={2}
      >
        <TextField
          sx={{ width: "25vw" }}
          id="cuil"
          label={labels.textFieldLabels.user}
          required
          disabled={loginSuccess}
          error={loginFail}
          onChange={null}
          variant="standard"
        />
        <TextField
          sx={{ width: "25vw" }}
          id="password"
          label={labels.textFieldLabels.password}
          type="password"
          required
          onChange={null}
          error={loginFail}
          disabled={loginSuccess}
          variant="standard"
        />
      </Stack>
    </>
  );
};

export default LoginFragment;
