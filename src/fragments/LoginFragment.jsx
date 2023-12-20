import { Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import { useLoginString } from "../contexts/TextProvider.jsx";
import { doformatCUIL } from "../utiles.js";
import axios from "axios";

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
  const getData = async () => {
    let url = process.env.REACT_APP_BACK_URL;
    let user = null;
    await axios
      .post(`${url}/api/login`, {
        name: formattedCUIL,
        password: passwordsd,
      })
      .then((response) => {
        sessionStorage.setItem("authorization", response.authorization);
        console.log(response.data);
        if (response.data !== null) {
          user = {
            id: "DFSKLF2KSADASDASDASDASDASDASDSADASDAS",
            name: "Ignacio",
            cuil: response.data.user.name,
            lastname: "Romang",
            birthdate: "1996-04-21",
            gender: 2,
            email: response.data.user.email,
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
        }
      })
      .catch((e) => {
        console.error("Error durante el inicio de sesión:", e);
      });
    return user;
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
