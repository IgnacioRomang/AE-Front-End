import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCommonsButtonString,
  useCommonsFieldString,
  useComponentAuthLoginString,
} from "../contexts/TextProvider.jsx";
import {
  boxLoginSyle,
  buttonTopStyle,
  cardLoginStyle,
  centerButtonsStyle,
  centeringStyles,
  linksStyle,
} from "../theme.jsx";

import { TextField } from "@mui/material";

import { useService } from "../contexts/ServiceContext.js";
import ProcessAlert from "../fragments/ProcessAlert.jsx";
import { doformatCUIL, sleep } from "../utiles.js";

const AuthLogin = () => {
  const authloginlabels = useComponentAuthLoginString();
  const commonbuttons = useCommonsButtonString();
  const commonfields = useCommonsFieldString();

  const { User, authenticate } = useService();

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFail, setLoginFail] = useState(false);

  const [cuil, setCuil] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setOpen(false);
    setLoginFail(false);
    setCuil(doformatCUIL(event.target.value));
  };

  const handleOnChangePassword = (event) => {
    setOpen(false);
    setLoginFail(false);
    setPassword(event.target.value);
  };

  /**
   * @brief This useEffect hook is used to perform side effects in a functional component.
   * In this case, the effect is triggered when the component mounts (since the dependency array is empty []).
   */
  React.useEffect(() => {
    if (User != null) {
      navigate("/ae/profile");
    }
  }, [User, navigate]);

  /**
   * @brief This function checks if the login data is valid, sets the appropriate state variables,
   * and redirects the user to their profile page if the login is successful.
   *
   * @param {Event} event The event object.
   */
  const handleLogin = async () => {
    setOpen(true);
    let result = await authenticate(cuil, password);
    setLoginSuccess(result);
    setLoginFail(!result);
    setLoading(false);

    if (result) {
      navigate("/ae/profile", {
        replace: true,
      });
    } else {
      // apra que se pueda leer el cartel
      await sleep(700);
      setOpen(false);
      setLoading(true);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <>
      <ProcessAlert open={open} success={loginSuccess} loading={loading} />
      <Card sx={cardLoginStyle}>
        <CardHeader
          titleTypographyProps={{ variant: "h6" }}
          avatar={<LockOpenIcon />}
          title={authloginlabels.title}
        />
        <Divider />
        <CardContent sx={boxLoginSyle}>
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
              label={commonfields.cuil}
              required
              disabled={loginSuccess}
              helperText={"Sin '-', se agregan solos"}
              error={loginFail}
              value={cuil}
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
              label={commonfields.password}
              type="password"
              required
              value={password}
              onChange={handleOnChangePassword}
              error={loginFail}
              disabled={loginSuccess}
              variant="standard"
            />
            <Link
              size="small"
              component="button"
              disabled={loginSuccess}
              sx={{...centeringStyles, padding: 1}}
              underline="hover"
              onClick={() => {
                navigate("/password/forgot");
              }}
              style={loginSuccess ? linksStyle : buttonTopStyle}
            >
              {authloginlabels.link_label.password}
            </Link>
            <Divider />

            <CardActions sx={centerButtonsStyle}>
              <Button
                size="small"
                color="inherit"
                onClick={handleCancel}
                disabled={loginSuccess}
              >
                {commonbuttons.cancel}
              </Button>
              <Button
                size="small"
                sx={buttonTopStyle}
                onClick={handleLogin}
                disabled={loginSuccess}
              >
                {commonbuttons.ok}
              </Button>
            </CardActions>
          </Stack>
        </CardContent>
        {/* Notificvacion de exito 
        
                <Collapse in={loginSuccess}>
          <AlertFragment
            type="success"
            title={authloginlabels.alert.success.title}
            body={authloginlabels.alert.success.body}
            strong={authloginlabels.alert.success.strong}
          />
        </Collapse>
        
        <Collapse in={loginFail}>
          <AlertFragment
            type="error"
            title={authloginlabels.alert.error.title}
            body={authloginlabels.alert.error.body}
            strong={authloginlabels.alert.error.strong}
          />
        </Collapse>
        */}
      </Card>
    </>
  );
};

export default AuthLogin;
