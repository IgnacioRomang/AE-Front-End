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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useCommonsString, useLoginString } from "../contexts/TextProvider.jsx";
import {
  backdropLoginStyle,
  boxLoginSyle,
  cardLoginStyle,
  centerBottonsStyle,
  linksStyle,
} from "../theme.jsx";

import { useAuth } from "../contexts/AuthContext.js";
import LoginFragment from "../fragments/LoginFragment.jsx";

const Login = () => {
  const [open, setOpen] = React.useState(false);
  const [labels, assets] = useLoginString();
  const commonlabels = useCommonsString();
  const { setIsAuthenticated, setUser, User } = useAuth();

  //Si es verdadero desactiva los botones y muestra el mensaje de exito
  //para poder enviarlo  a la proxima pantalla
  const [loginSuccess, setLoginSuccess] = React.useState(false);
  const navigate = useNavigate();
  //Si es verdadero muestra el mensaje de fallo en logeo
  const [loginFail, setLoginFail] = React.useState(false);

  const logindataref = React.useRef(null);

  React.useEffect(() => {
    if (User !== null) {
      navigate("/profile");
    }
  }, []);
  const handleClose = () => {
    setOpen(false);
    let proces = true;
    if (proces === true) {
      setLoginSuccess(true);
      // hacer
    } else {
      setLoginFail(true);
      //Activar mensajes de error en los text
    }
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleLogin = async (event) => {
    //TODO LOGIN
    let loggin = logindataref.current.getData();
    if (loggin !== null) {
      setLoginSuccess(true);
      setLoginFail(false);
      setOpen(true);

      setIsAuthenticated(true);
      setUser(loggin);

      navigate("/profile", {
        replace: true,
      });
      setOpen(false);
    } else {
      loginSuccess(false);
      setLoginFail(true);
    }
    handleOpen();
  };

  const handleCuil = (event) => {
    // Si esta en error cambiar eso
    //TODO hacer que solo acepte numeros y - por si algun bruto lo pone asi
  };
  const handlePassword = (event) => {
    // Si esta en error cambiar eso
    //TODO
  };

  const handleCancel = (event) => {
    navigate("/news");
  };
  return (
    <Card sx={cardLoginStyle} >
      <Backdrop sx={backdropLoginStyle} open={open} onClick={null}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {/*Titulo del cards*/}
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
              style={loginSuccess ? linksStyle : null}
            >
              {labels.links.labels.password}
            </Link>
            <Link
              component="button"
              href={assets.links.account}
              disabled={loginSuccess}
              underline="hover"
              style={loginSuccess ? linksStyle : null}
            >
              {labels.links.labels.account}
            </Link>
          </Stack>
          <Divider></Divider>
          {/* BOTONES */}
          <CardActions sx={centerBottonsStyle}>
            <Button
              size="small"
              color="inherit"
              onClick={handleCancel}
              disabled={loginSuccess}
            >
              {commonlabels.button.cancel}
            </Button>
            <Button size="small" onClick={handleLogin} disabled={loginSuccess}>
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
