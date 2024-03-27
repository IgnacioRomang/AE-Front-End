import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
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
import AlertFragment from "../fragments/AlertFragmet.jsx";
import { doformatCUIL } from "../utiles.js";
import ProcessAlert from "../fragments/ProcessAlert.jsx";

const AuthLogin = () => {
  const authloginlabels = useComponentAuthLoginString();
  const commonbuttons = useCommonsButtonString();
  const commonfields = useCommonsFieldString();

  const { User, authenticate } = useService();

  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginFail, setLoginFail] = useState(false);

  const [formattedCUIL, setFormattedCUIL] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    let formatted = doformatCUIL(inputValue);
    setFormattedCUIL(formatted);
  };

  const handleOnChangePassword = (event) => {
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
    let result = await authenticate(formattedCUIL, password);
    setLoginSuccess(result);
    setLoading(false);
    setLoginFail(!result);
    setOpen(false);
    if (result) {
      navigate("/ae/profile", {
        replace: true,
      });
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
              label={commonfields.password}
              type="password"
              required
              value={password}
              onChange={handleOnChangePassword}
              error={loginFail}
              disabled={loginSuccess}
              variant="standard"
            />
          </Stack>
          <Stack paddingTop={4} spacing={2}>
            {/* links */}
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={centeringStyles}
            >
              <Link
                size="small"
                component="button"
                disabled={loginSuccess}
                underline="hover"
                onClick={() => {
                  navigate("/password/forgot");
                }}
                style={loginSuccess ? linksStyle : buttonTopStyle}
              >
                {authloginlabels.link_label.password}
              </Link>
              <Link
                size="small"
                component="button"
                disabled={loginSuccess}
                underline="hover"
                onClick={() => {
                  navigate("/faq");
                }}
                style={loginSuccess ? linksStyle : buttonTopStyle}
              >
                {authloginlabels.link_label.faq}
              </Link>
              <Link
                size="small"
                component="button"
                disabled={loginSuccess}
                onClick={() => {
                  navigate("/auth/register");
                }}
                underline="hover"
                style={loginSuccess ? linksStyle : buttonTopStyle}
              >
                {authloginlabels.link_label.account}
              </Link>
            </Stack>
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
        {/* Notificvacion de exito */}
        <Collapse in={loginSuccess}>
          <AlertFragment
            type="success"
            title={authloginlabels.alert.success.title}
            body={authloginlabels.alert.success.body}
            strong={authloginlabels.alert.success.strong}
          />
        </Collapse>
        {/* Notificacion de error */}
        <Collapse in={loginFail}>
          <AlertFragment
            type="error"
            title={authloginlabels.alert.error.title}
            body={authloginlabels.alert.error.body}
            strong={authloginlabels.alert.error.strong}
          />
        </Collapse>
      </Card>
    </>
  );
};

export default AuthLogin;
