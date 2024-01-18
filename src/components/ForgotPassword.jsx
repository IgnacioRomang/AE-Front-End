import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCommonsString,
  useForgotPasswordString,
} from "../contexts/TextProvider";
import { boxLoginSyle, cardLoginStyle, centerButtonsStyle } from "../theme";
import { doformatCUIL } from "../utiles";
import { useAuth } from "../contexts/AuthContext";
/**
 * The ForgotPassword function is a React component that renders a form for users to enter their CUIL
 * (Argentinian identification number) and handles the submission and validation of the form.
 * @returns {JSX.Element} The ForgotPassword component is returning a JSX structure that represents a card with a
 * form for resetting a password. The card contains a title, a text field for entering a CUIL (a unique
 * identification number used in Argentina), an alert with information about the CUIL format, and two
 * buttons for navigating back or submitting the form. Additionally, there are two Collapse components that display success or
 * error messages.
 */
const ForgotPassword = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nav = useNavigate();
  const labelbutton = useCommonsString();
  const label = useForgotPasswordString();
  const [error, setError] = React.useState(false);

  const { User } = useAuth();
  React.useEffect(() => {
    if (User === null) {
      nav("/");
    }
  }, [nav, User]);

  /**
   * The handleAcept function checks if the formattedCUIL is valid and if it is, it sets the error
   * state to false and either navigates to the login page or toggles the isSubmitted state.
   * @param {Event} e - the event object
   */
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

  /**
   * The handleBack function navigates back to the login page.
   */
  const handleBack = () => {
    nav(-1);
  };

  const [formattedCUIL, setFormattedCUIL] = useState("");

  /**
   * The handleInputChange function takes an input value, formats it using the doformatCUIL function,
   * and sets the formatted value in the state variable formattedCUIL.
   * @param {Event} event - the input event object
   */
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
            size="small"
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
      <CardActions sx={centerButtonsStyle}>
        <Button size="small" onClick={handleBack} color="inherit">
          {labelbutton.button.back}
        </Button>
        <Button size="small" onClick={handleAcept}>
          {!isSubmitted ? labelbutton.button.ok : labelbutton.button.login}
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
