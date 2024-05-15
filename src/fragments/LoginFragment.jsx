import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useService } from "../contexts/ServiceContext.js";
import { useLoginString } from "../contexts/TextProvider.jsx";
import { doformatCUIL } from "../utiles.js";

//TODO QUITAR TEMAS
const LoginFragment = React.forwardRef((props, ref) => {
  const [labels] = useLoginString();

  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);

  const [formattedCUIL, setFormattedCUIL] = useState("");
  const { authenticate } = useService();
  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    let formatted = doformatCUIL(inputValue);

    setFormattedCUIL(formatted);
  };

  const [passwordsd, setPassword] = React.useState("");

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const getData = () => {
    authenticate(formattedCUIL, passwordsd);
    if (null == null) {
      setLoginFail(true);
    } else {
      setLoginFail(false);
      setLoginSuccess(true);
    }
  };

  React.useImperativeHandle(ref, () => ({
    getData,
  }));

  return (
    <>
      {" "}
      <Stack spacing={2}>
        <TextField
          sx={{
            width: "100%", // Ancho completo en pantallas móviles
            "@media (min-width: 600px)": {
              // Ajusta según sea necesario para tamaños mayores
              width: "25vw",
            },
          }}
          size="small"
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
          sx={{
            width: "100%", // Ancho completo en pantallas móviles
            "@media (min-width: 600px)": {
              // Ajusta según sea necesario para tamaños mayores
              width: "25vw",
            },
          }}
          size="small"
          id="password"
          label={labels.textFieldLabels.password}
          type="password"
          required
          value={passwordsd}
          onChange={handleOnChangePassword}
          error={loginFail}
          disabled={loginSuccess}
          variant="standard"
        />
      </Stack>
    </>
  );
});

export default LoginFragment;
