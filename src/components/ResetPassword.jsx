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
  centerBottonsStyle,
  centeringStyles,
} from "../theme";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const labelbutton = useCommonsString();
  const label = useResetPasswordCardString();
  const nav = useNavigate();
  const ref = React.useRef(null);
  const [error, setError] = React.useState(false);
  const handleAcept = () => {
    //TODO HACe;
    let result = ref.current.sendData();
    setError(!result[0]);
    if (result[0]) {
      //TODO enviar datos de result[1]
      nav("/profile");
    }
  };
  const handleBack = () => {
    nav("/profile");
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
                <li>{label.alert.body[0]}</li>
                <li>{label.alert.body[1]}</li>
                <li>{label.alert.body[2]}</li>
                <li>{label.alert.body[3]}</li>
              </ul>
            </Alert>
          </Collapse>
        </CardContent>
      </CardContent>
      <CardActions sx={centerBottonsStyle}>
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
