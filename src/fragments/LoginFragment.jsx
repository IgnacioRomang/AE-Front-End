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
    let csrfToken = null;
    let auth = null;
    await axios
      .post(
        `${url}/api/auth/login`,
        {
          cuil: formattedCUIL,
          password: passwordsd,
        },
        {
          withCredentials: true, // Agrega esta opción para incluir las credenciales
        }
      )
      .then((response) => {
        auth = response.data.authorization;
        sessionStorage.setItem("authorization", auth);
        if (response.data !== null) {
          let names = response.data.user.name.split(" ");
          user = {
            name: names[0],
            cuil: response.data.user.cuil,
            lastname: names[1],
            ae: true,
          };
        }
        axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;
        axios.defaults.headers.common["User-Agent"] = "FRONT-END-REACT";
        axios.defaults.headers.common["Authorization"] = auth.type + auth.token;
      })
      .catch((e) => {
        console.error("Error durante el inicio de sesión:");
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
