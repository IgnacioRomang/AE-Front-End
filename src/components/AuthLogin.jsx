import LockOpenIcon from "@mui/icons-material/LockOpen";
import {
  Alert,
  AlertTitle,
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
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCommonsString, useLoginString } from "../contexts/TextProvider.jsx";
import {
  boxLoginSyle,
  buttonTopStyle,
  cardLoginStyle,
  centerButtonsStyle,
  linksStyle,
} from "../theme.jsx";

import { TextField } from "@mui/material";

import { useService } from "../contexts/ServiceContext.js";
import { doformatCUIL } from "../utiles.js";

const AuthLogin = () => {
  const [labels, assets] = useLoginString();
  const commonlabels = useCommonsString();

  const { User, authenticate } = useService();

  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const [loginFail, setLoginFail] = React.useState(false);

  const [formattedCUIL, setFormattedCUIL] = React.useState("");
  const [passwordsd, setPassword] = React.useState("");

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
      navigate("/user/profile");
    }
  }, [User, navigate]);

  /**
   * @brief This function checks if the login data is valid, sets the appropriate state variables,
   * and redirects the user to their profile page if the login is successful.
   *
   * @param {Event} event The event object.
   */
  const handleLogin = async () => {
    let result = await authenticate(formattedCUIL, passwordsd);
    setLoginSuccess(result);
    setLoginFail(!result);
    if (result) {
      navigate("/user/profile", {
        replace: true,
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Card sx={cardLoginStyle}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        avatar={<LockOpenIcon />}
        title={labels.title}
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
        <Stack paddingTop={4} spacing={2}>
          {/* links */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"center"}
            spacing={1}
          >
            <Link
              size="small"
              component="button"
              href={assets.links.password}
              disabled={loginSuccess}
              underline="hover"
              onClick={() => {
                navigate("/password/forgot");
              }}
              style={loginSuccess ? linksStyle : buttonTopStyle}
            >
              {labels.links.labels.password}
            </Link>
            <Link
              size="small"
              component="button"
              href={assets.links.account}
              disabled={loginSuccess}
              underline="hover"
              onClick={() => {
                navigate("/faq");
              }}
              style={loginSuccess ? linksStyle : buttonTopStyle}
            >
              {labels.links.labels.faq}
            </Link>
            <Link
              size="small"
              component="button"
              href={assets.links.account}
              disabled={loginSuccess}
              onClick={() => {
                navigate("/auth/register");
              }}
              underline="hover"
              style={loginSuccess ? linksStyle : buttonTopStyle}
            >
              {labels.links.labels.account}
            </Link>
          </Stack>
          <Divider></Divider>
          {/* BOTONES */}
          <CardActions sx={centerButtonsStyle}>
            <Button
              size="small"
              color="inherit"
              onClick={handleCancel}
              disabled={loginSuccess}
            >
              {commonlabels.button.cancel}
            </Button>
            <Button
              size="small"
              sx={buttonTopStyle}
              onClick={handleLogin}
              disabled={loginSuccess}
            >
              {commonlabels.button.ok}
            </Button>
          </CardActions>
        </Stack>
      </CardContent>
      {/* Notificvacion de exito */}
      <Collapse in={loginSuccess}>
        <Alert severity="success">
          <AlertTitle>{labels.alerts.success.title}</AlertTitle>
          {labels.alerts.success.body}
          <strong>{labels.alerts.success.strong}</strong>
        </Alert>
      </Collapse>
      {/* Notificacion de error */}
      <Collapse in={loginFail}>
        <Alert severity="error">
          <AlertTitle>{labels.alerts.fail.title}</AlertTitle>
          {labels.alerts.fail.body}
          <strong>{labels.alerts.fail.strong}</strong>
        </Alert>
      </Collapse>
    </Card>
  );
};

export default AuthLogin;
