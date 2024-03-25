import { Button, Card, CardActions, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmailVerify } from "../contexts/EmailVerifyContext";
import { useService } from "../contexts/ServiceContext";
import {
  useCommonsButtonString,
  useCommonsFieldString,
  useComponentEmailChangeString,
} from "../contexts/TextProvider";
import AlertFragment from "../fragments/AlertFragmet";
import ProcessAlert from "../fragments/ProcessAlert";
import { centerButtonsStyle } from "../theme";

/**
 * Function for handling email change form submission and user interaction.
 *  - Handles form submission
 *  - Handles user interaction with form fields
 *  - Handles email sending and confirmation
 * @return {JSX.Element} The JSX element for the email change form
 */
const EmailChange = () => {
  const emailchange = useComponentEmailChangeString();
  const commonbuttons = useCommonsButtonString();
  const commonfields = useCommonsFieldString();

  const [formData, setFormData] = useState({
    email: "",
    reemail: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [send, setSend] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const navigate = useNavigate();
  const { User } = useService();
  const { send_confirmation_email } = useEmailVerify();

  useEffect(() => {
    if (User === null) {
      navigate("/");
    }
  }, [navigate, User]);

  /**
   * Asynchronous function to send an email.
   * @async
   * @return {Promise} - A Promise that resolves when the email is sent successfully, and rejects with an error if the email fails to send.
   */
  const sendEmail = async () => {
    try {
      const response = await send_confirmation_email(
        formData.password,
        formData.email
      );
      setSend(response);
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      navigate("/ae/profile");
    } catch (error) {
      console.error("Error sending email:", error);
      setSend(false);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    if (send) {
      setSend(false);
    } else {
      navigate(-1);
    }
  };

  const handleConfirm = async () => {
    if (formData.reemail === formData.email && formData.email !== "") {
      setErrorEmail(false);
      setOpen(true);
      await sendEmail();
    } else {
      setErrorEmail(true);
      setOpen(false);
    }
  };

  /**
   * Asynchronous function to handle sending confirmation code.
   * @async
   * @return {Promise<void>} Promise that resolves once the confirmation code is sent
   */

  return (
    <>
      {!open && (
        <Card>
          <Grid container spacing={2} direction={"column"} padding={5}>
            <Grid item>
              <AlertFragment
                type={"info"}
                title={emailchange.alert.info.title}
                body={emailchange.alert.info.body}
                strong={emailchange.alert.info.strong}
              />
              <AlertFragment
                type={"warning"}
                title={emailchange.alert.warning.title}
                body={emailchange.alert.warning.body}
                strong={emailchange.alert.warning.strong}
              />
            </Grid>
            <Grid item>
              <TextField
                name="email"
                variant="standard"
                value={formData.email}
                autoComplete="off"
                disabled={formData.send}
                error={errorEmail}
                onChange={handleChange}
                label={commonfields.email}
              />
            </Grid>
            <Grid item>
              <TextField
                name="reemail"
                autoComplete="off"
                variant="standard"
                error={errorEmail}
                value={formData.reemail}
                onChange={handleChange}
                label={commonfields.renewemail}
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                autoComplete="new-password"
                variant="standard"
                error={errorEmail}
                value={formData.password}
                type="password"
                onChange={handleChange}
                label={commonfields.password}
              />
            </Grid>
          </Grid>
          <CardActions sx={centerButtonsStyle}>
            <Button size="small" onClick={handleBack}>
              {commonbuttons.back}
            </Button>
            <Button size="small" onClick={handleConfirm}>
              {commonbuttons.send}
            </Button>
          </CardActions>
        </Card>
      )}
      <ProcessAlert open={open} loading={loading} success={send} />
    </>
  );
};

export default EmailChange;
