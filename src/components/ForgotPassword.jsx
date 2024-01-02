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
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import PasswordFragment from "../fragments/PasswordFragment";
import {
  useCommonsString,
  useForgotPasswordString,
  useResetPasswordCardString,
} from "../contexts/TextProvider";
import {
  boxLoginSyle,
  cardLoginStyle,
  centerBottonsStyle,
  centeringStyles,
} from "../theme";
import { useNavigate } from "react-router-dom";
import { doformatCUIL } from "../utiles";

const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nav = useNavigate();
  const labelbutton = useCommonsString();
  const label = useForgotPasswordString();
  const [error, setError] = React.useState(false);

  const handleAcept = (e) => {
    e.preventDefault();
    if (!formattedCUIL.trim() || formattedCUIL.length !== 13) {
      setError(true);
    } else {
      setError(false);
      if (isSubmitted) {
        nav("/auth/login");
      }
      setIsSubmitted(!isSubmitted);
    }
  };
  const handleBack = () => {
    nav("/auth/login");
  };

  const [formattedCUIL, setFormattedCUIL] = useState("");

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    let formatted = doformatCUIL(inputValue);

    setFormattedCUIL(formatted);
  };

  return (
    <Card sx={cardLoginStyle}>
      <CardHeader title={label.title} />
      <CardContent container sx={boxLoginSyle}>
        <CardContent item sx={12} sm={8}>
          <TextField
            sx={{
              width: "100%", // Ancho completo en pantallas móviles
              "@media (min-width: 600px)": {
                // Ajusta según sea necesario para tamaños mayores
                width: "25vw",
              },
            }}
            id="cuil"
            label={label.textFieldLabels}
            required
            disabled={null}
            error={null}
            value={formattedCUIL}
            onChange={handleInputChange}
            variant="standard"
          />
        </CardContent>
        <CardContent item sx={12} sm={8}>
          <Alert
            severity="info"
            style={{ textAlign: "left", marginTop: "16px" }}
          >
            <AlertTitle>{label.alert.title}</AlertTitle>
            <ul>
              {label.alert.body.map((lablel, index) => (
                <li key={index}>{lablel}</li>
              ))}
            </ul>
          </Alert>
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
      <Collapse in={isSubmitted}>
        <Alert severity="success">
          <AlertTitle>{label.success.title}</AlertTitle>
          {label.success.body}
          <strong> {label.success.strong}</strong>
        </Alert>
      </Collapse>
      <Collapse in={error}>
        <Alert severity="error">
          <AlertTitle>{label.fail.title}</AlertTitle>
          {label.fail.body}
          <strong>{label.fail.strong}</strong>
        </Alert>
      </Collapse>
    </Card>
  );
};

export default ForgotPassword;
