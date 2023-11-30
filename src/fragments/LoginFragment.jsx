import { Stack, TextField } from "@mui/material";
import React from "react";
import { useLoginString } from "../contexts/TextProvider.jsx";
import { boxLoginSyle } from "../theme.jsx";
import { useState } from "react";

//TODO QUITAR TEMAS
const LoginFragment = () => {
  const [labels, assets] = useLoginString();

  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);

  const [formattedCUIL, setFormattedCUIL] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    const sanitizedValue = inputValue.replace(/\D/g, "");
    const truncatedValue = sanitizedValue.slice(0, 11);

    // Formatear según tu criterio: XX-XXXXXXXX-X
    let formatted = truncatedValue;

    if (truncatedValue.length > 2) {
      formatted = truncatedValue
        .replace(/^(\d{2})/, "$1-")
        .replace(/(\d{8})(\d{1,2})/, "$1-$2");
    }

    setFormattedCUIL(formatted);
  };
  return (
    <>
      {" "}
      <Stack spacing={2}>
        <TextField
          sx={{ width: "25vw" }}
          id="cuil"
          label={labels.textFieldLabels.user}
          required
          disabled={loginSuccess}
          error={loginFail}
          value={formattedCUIL}
          onChange={handleInputChange}
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
