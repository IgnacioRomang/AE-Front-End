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
  cardLoginStyle,
  centerButtonsStyle,
  linksStyle,
} from "../theme.jsx";

import { useAuth } from "../contexts/AuthContext.js";
import LoginFragment from "../fragments/LoginFragment.jsx";

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [labels, assets] = useLoginString();
  const commonlabels = useCommonsString();
  const { setIsAuthenticated, setUser, User } = useAuth();

  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const navigate = useNavigate();
  const [loginFail, setLoginFail] = React.useState(false);

  const logindataref = React.useRef(null);

  /* The `React.useEffect` hook is used to perform side effects in a functional component. In this case,
the effect is triggered when the component mounts (since the dependency array is empty `[]`). */
  React.useEffect(() => {
    if (User !== null) {
      navigate("/profile");
    }
  }, []);

  /**
   * The handleLogin function checks if the login data is valid, sets the appropriate state variables,
   * and redirects the user to their profile page if the login is successful.
   */
  const handleLogin = async (event) => {
    setOpen(true);
    let loggin = await logindataref.current.getData();
    setOpen(false);
    if (loggin !== null) {
      setLoginSuccess(true);
      setLoginFail(false);

      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsAuthenticated(true);

      setUser(loggin);

      navigate("/user/profile", {
        replace: true,
      });
    } else {
      setLoginSuccess(false);
      setLoginFail(true);
    }
  };

  const handleCancel = (event) => {
    navigate("/");
  };
  return (
    <Card sx={cardLoginStyle}>
      <CardHeader
        titleTypographyProps={{ variant: "h6" }}
        avatar={<LockOpenIcon />}
        title={labels.title}
      />
      <CardContent sx={boxLoginSyle}>
        <LoginFragment ref={logindataref} />
        <Stack paddingTop={4} spacing={2}>
          {/* links */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            justifyContent={"center"}
            spacing={1}
          >
            <Link
              component="button"
              href={assets.links.password}
              disabled={loginSuccess}
              underline="hover"
              onClick={() => {
                navigate("/auth/forgot-password");
              }}
              style={loginSuccess ? linksStyle : null}
            >
              {labels.links.labels.password}
            </Link>
            <Link
              component="button"
              href={assets.links.account}
              disabled={loginSuccess}
              underline="hover"
              onClick={() => {
                navigate("/faq");
              }}
              style={loginSuccess ? linksStyle : null}
            >
              {labels.links.labels.faq}
            </Link>
            <Link
              component="button"
              href={assets.links.account}
              disabled={loginSuccess}
              onClick={() => {
                navigate("/auth/register");
              }}
              underline="hover"
              style={loginSuccess ? linksStyle : null}
            >
              {labels.links.labels.account}
            </Link>
          </Stack>
          <Divider></Divider>
          {/* BOTONES */}
          <CardActions sx={centerButtonsStyle}>
            <Button
              color="inherit"
              onClick={handleCancel}
              disabled={loginSuccess}
            >
              {commonlabels.button.cancel}
            </Button>
            <Button onClick={handleLogin} disabled={loginSuccess}>
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

export default Login;
