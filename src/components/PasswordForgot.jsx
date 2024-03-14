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
import { useService } from "../contexts/ServiceContext";
import {
  useCommonsString,
  useForgotPasswordString,
} from "../contexts/TextProvider";
import CodeFragment from "../fragments/CodeFragment";
import { boxLoginSyle, cardLoginStyle, centerButtonsStyle } from "../theme";
import { doformatCUIL } from "../utiles";
/**
 * The ForgotPassword function is a React component that renders a form for users to enter their CUIL
 * (Argentinian identification number) and handles the submission and validation of the form.
 * @returns {JSX.Element} The ForgotPassword component is returning a JSX structure that represents a card with a
 * form for resetting a password. The card contains a title, a text field for entering a CUIL (a unique
 * identification number used in Argentina), an alert with information about the CUIL format, and two
 * buttons for navigating back or submitting the form. Additionally, there are two Collapse components that display success or
 * error messages.
 */
const PasswordForgot = () => {
  //const [isSubmitted, setIsSubmitted] = useState(false);
  const labelbutton = useCommonsString();
  const label = useForgotPasswordString();
  const [error, setError] = React.useState(false);
  const [code, setCode] = useState("");
  const [icon, setIcon] = useState(false);
  const { send_forgot_password_email } = useService();
  const [send, setSend] = useState(false);
  //const [result, setResult] = useState(false);
  const navigate = useNavigate();
  /**
   * The handleAcept function checks if the formattedCUIL is valid and if it is, it sets the error
   * state to false and either navigates to the login page or toggles the isSubmitted state.
   * @param {Event} e - the event object
   */
  const handleAcept = async (e) => {
    e.preventDefault();
    let error = !formattedCUIL.trim() || formattedCUIL.length !== 13;
    setError(error);
    if (!error && !send) {
      //enviar
      const resul = await send_forgot_password_email(formattedCUIL);
      setSend(resul);
      setError(!resul);
    }
  };

  const handleBack = () => {
    if (send) {
      setSend(false);
    } else {
      navigate(-1);
    }
  };
  const sendEmail = async () => {
    //await send_confirmation_email(password, email);
  };

  /**
   * The handleBack function navigates back to the login page.
   */

  const handleConfirmCode = async () => {
    let response = null;
    if (response) {
      setError(false);
      navigate("/user/profile");
    } else {
      setError(true);
    }
  };

  const [formattedCUIL, setFormattedCUIL] = useState("");

  /**
   * The handleInputChange function takes an input value, formats it using the doformatCUIL function,
   * and sets the formatted value in the state variable formattedCUIL.
   * @param {Event} event - the input event object
   */
  const handleCUILChange = (event) => {
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
            id="cuil"
            size="small"
            label={label.cuil}
            required
            disabled={send}
            error={error}
            value={formattedCUIL}
            onChange={handleCUILChange}
            variant="standard"
          />
        </CardContent>
        <CardContent item sx={12} sm={8}>
          {send && (
            <CodeFragment
              error={error}
              code={code}
              setCode={setCode}
              icon={icon}
              setIcon={setIcon}
              resend={sendEmail}
            />
          )}

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
        <Button
          size="small"
          onClick={code === "" ? handleAcept : handleConfirmCode}
        >
          {code !== "" ? labelbutton.button.send : labelbutton.button.ok}
        </Button>
      </CardActions>
      <Collapse in={send}>
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

export default PasswordForgot;
