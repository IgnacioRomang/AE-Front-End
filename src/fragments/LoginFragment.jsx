import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLoginString } from "../contexts/TextProvider.jsx";
import { doformatCUIL } from "../utiles.js";

//TODO QUITAR TEMAS
const LoginFragment = React.forwardRef((props, ref) => {
  const [labels, assets] = useLoginString();

  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);

  const [formattedCUIL, setFormattedCUIL] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    let formatted = doformatCUIL(inputValue);

    setFormattedCUIL(formatted);
  };

  const [passwordsd, setPassword] = React.useState("");

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const getData = (consulta = false) => {
    //TODO CONECTAR
    let connect = {
      id: "DFSKLF2KSADASDASDASDASDASDASDSADASDAS",
      name: "Ignacio",
      cuil: "11-37425457-8",
      lastname: "Romang",
      birthdate: "1996-04-21",
      gender: 2,
      email: "ignacioromang@outlook.com",
      address: {
        street: "calle falsa",
        floor: 1,
        apartment: "A",
        postalCode: "3000",
        city: "ciudad falsa",
        state: "Inunda Fe",
      },
      phone: "+(12) 3214-645123",
      occupation: 11,
      study: 24,
      ae: true,
    };
    return connect;
  };

  React.useImperativeHandle(ref, () => ({
    getData,
  }));

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
