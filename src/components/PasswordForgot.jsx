import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCommonsButtonString,
  useCommonsFieldString,
  useComponentPasswordAlertString,
  useComponentPasswordForgotString,
} from "../contexts/TextProvider.jsx";

import { usePasswordService } from "../contexts/PasswordContext";
import AlertFragment from "../fragments/AlertFragmet.jsx";
import ProcessAlert from "../fragments/ProcessAlert.jsx";
import SixtysecFragment from "../fragments/SixtysecFragment.jsx";
import {
  boxLoginSyle,
  cardLoginStyle,
  centerButtonsStyle,
  centeringStyles,
} from "../theme.jsx";
import { doformatCUIL } from "../utiles.js";
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

  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [send, setSend] = useState(false);
  const { send_forgot_password_email } = usePasswordService();

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
      return false;
    }
    try {
      const success = await send_forgot_password_email(formattedCUIL);
      setSend(success);
      setError(!success);
      return success;
    } catch (error) {
      setError(true);
      return false;
    }
  };

  const handleReSend = async () => {
    setOpen(true);
    setSend(false);
    const result = await send_email();
    setOpen(false);
    return result;
  };

  const handleCUILChange = (event) => {
    const inputValue = event.target.value;
    let formatted = doformatCUIL(inputValue);
    setFormattedCUIL(formatted);
  };

  return (
    <>
      <ProcessAlert open={open} loading={send} success={!error} />

      <Card sx={cardLoginStyle}>
        <CardHeader title={passwordforgot.title} />
        <CardContent sx={boxLoginSyle}>
          <Grid container spacing={3} sx={centeringStyles}>
            <Grid item>
              <TextField
                id="cuil"
                size="small"
                label={commonfields.cuil}
                required
                disabled={send ? "true" : undefined}
                error={error}
                value={formattedCUIL}
                onChange={handleCUILChange}
                variant="standard"
              />
            </Grid>
            <Grid item>
              {!send && (
                <AlertFragment
                  type={"info"}
                  title={passwordalert.info.verify.title}
                  body={passwordalert.info.verify.body}
                  strong={passwordalert.info.verify.strong}
                />
              )}
            </Grid>
          </Grid>
        </CardContent>
        <CardActions sx={centerButtonsStyle}>
          <Button size="small" onClick={handleBack} color="inherit">
            {commonbutton.back}
          </Button>
          <SixtysecFragment
            action={handleReSend}
            label={send ? commonbutton.resend : commonbutton.send}
          >
            <Button />
          </SixtysecFragment>
        </CardActions>
      </Card>
    </>
  );
};

export default PasswordForgot;
