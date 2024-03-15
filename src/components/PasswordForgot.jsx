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
  useCommonsButtonString,
  useCommonsFieldString,
  useComponentPasswordAlertString,
  useComponentPasswordForgotString,
  useComponentEmailSendString,
} from "../contexts/TextProvider";

import { boxLoginSyle, cardLoginStyle, centerButtonsStyle } from "../theme";
import { doformatCUIL } from "../utiles";
import AlertFragment from "../fragments/AlertFragmet";
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
  const commonbutton = useCommonsButtonString();
  const passwordforgot = useComponentPasswordForgotString();
  const passwordalert = useComponentPasswordAlertString();
  const commonfields = useCommonsFieldString();
  const emailsend = useComponentEmailSendString();

  const [error, setError] = useState(false);

  const [send, setSend] = useState(false);
  const { send_forgot_password_email } = useService();

  const [formattedCUIL, setFormattedCUIL] = useState("");

  const navigate = useNavigate();

  const handleBack = () => {
    if (send) {
      setSend(false);
    } else {
      navigate(-1);
    }
  };

  const send_email = async () => {
    if (!formattedCUIL.trim() || formattedCUIL.length !== 13) {
      setError(true);
      return;
    }
    const response = await send_forgot_password_email(formattedCUIL);
    if (response) {
      setSend(true);
    }
  };

  const handleReSend = () => {
    send_email();
  };

  const handleCUILChange = (event) => {
    const inputValue = event.target.value;
    let formatted = doformatCUIL(inputValue);
    setFormattedCUIL(formatted);
  };

  return (
    <Card sx={cardLoginStyle}>
      <CardHeader title={passwordforgot.title} />
      <CardContent container sx={boxLoginSyle}>
        <CardContent item sx={12} sm={8}>
          <TextField
            id="cuil"
            size="small"
            label={commonfields.cuil}
            required
            disabled={send}
            error={error}
            value={formattedCUIL}
            onChange={handleCUILChange}
            variant="standard"
          />
        </CardContent>
        <CardContent item sx={12} sm={8}>
          {!send && (
            <AlertFragment
              type={"info"}
              title={passwordalert.info.verify.title}
              body={passwordalert.info.verify.body}
              strong={passwordalert.info.verify.strong}
            />
          )}
        </CardContent>
      </CardContent>
      <CardActions sx={centerButtonsStyle}>
        <Button size="small" onClick={handleBack} color="inherit">
          {commonbutton.back}
        </Button>
        <Button size="small" onClick={handleReSend}>
          {send ? commonbutton.resend : commonbutton.send}
        </Button>
      </CardActions>
      <Collapse in={send}>
        <AlertFragment
          type={"success"}
          title={commonfields.email}
          body={emailsend.alert.success.body}
          strong={emailsend.alert.success.strong}
        />
      </Collapse>
      <Collapse in={error}>
        <AlertFragment
          type={"error"}
          title={commonfields.email}
          body={emailsend.alert.fail.body}
          strong={emailsend.alert.fail.strong}
        />
      </Collapse>
    </Card>
  );
};

export default PasswordForgot;
