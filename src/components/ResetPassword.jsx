import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import PasswordFragment from "../fragments/PasswordFragment";
import {
  useCommonsString,
  useResetPasswordCardString,
} from "../contexts/TextProvider";
import {
  boxLoginSyle,
  cardLoginStyle,
  centerButtonsStyle,
  centeringStyles,
} from "../theme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const ResetPassword = () => {
  const labelbutton = useCommonsString();
  const label = useResetPasswordCardString();
  const nav = useNavigate();
  const { setUser, setIsAuthenticated } = useAuth();
  const ref = React.useRef(null);
  const [error, setError] = React.useState(false);
  const handleAcept = () => {
    //TODO HACe;
    let result = ref.current.sendData();
    setError(!result[0]);
    if (result[0]) {
      //TODO enviar datos de result[1]
      let url = process.env.REACT_APP_BACK_URL;
      axios
        .post(url + "/api/auth/change_password", result[1])
        .then((response) => {
          console.log(response.data);
          setError(false);
          setUser(null);
          setIsAuthenticated(false);

          nav("/auth/login", { replace: true });
        })
        .catch((error) => {
          console.error("Error en la solicitud:", error);
          console.error("Detalles del error:", error.response.data);
          setError(true);
        });
    }
  };
  const handleBack = () => {
    nav("/user/profile");
  };
  return (
    <Card sx={cardLoginStyle}>
      <CardHeader title={label.title} />
      <CardContent container sx={boxLoginSyle}>
        <CardContent item sx={12} sm={8}>
          <PasswordFragment ref={ref} />
        </CardContent>
        <CardContent item sx={12} sm={8}>
          <Collapse in={error}>
            <Alert
              severity="error"
              style={{ textAlign: "left", marginTop: "16px" }}
            >
              <AlertTitle>{label.alert.title}</AlertTitle>
              <ul>
                {label.alert.body.map((lablel, index) => (
                  <li key={index}>{lablel}</li>
                ))}
              </ul>
            </Alert>
          </Collapse>
        </CardContent>
      </CardContent>
      <CardActions sx={centerButtonsStyle}>
        <Button size="small" onClick={handleBack} color="inherit">
          {labelbutton.button.back}
        </Button>
        <Button size="small" onClick={handleAcept}>
          {labelbutton.button.ok}
        </Button>
      </CardActions>
    </Card>
  );
};

export default ResetPassword;
