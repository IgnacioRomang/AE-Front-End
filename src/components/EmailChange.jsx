import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import {
  useCommonsString,
  useEmailChangeString,
} from "../contexts/TextProvider";
import CodeFragment from "../fragments/CodeFragment";
import { centerButtonsStyle } from "../theme";

/**
 * Function for handling email change form submission and user interaction.
 *  - Handles form submission
 *  - Handles user interaction with form fields
 *  - Handles email sending and confirmation
 * @return {JSX.Element} The JSX element for the email change form
 */
const EmailChange = () => {
  const commonlabels = useCommonsString();
  const labels = useEmailChangeString();
  const [formData, setFormData] = useState({
    code: "",
    email: "",
    reemail: "",
    password: "",
    send: false,
    error: false,
    errorEmail: false,
    icon: false,
  });

  const navigate = useNavigate();
  const { User, send_confirmation_code, send_confirmation_email } =
    useService();

  React.useEffect(() => {
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
      setFormData({ ...formData, send: response });
    } catch (error) {
      console.error("Error sending email:", error);
      setFormData({ ...formData, send: false });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBack = () => {
    if (formData.send) {
      setFormData({ ...formData, send: false });
    } else {
      navigate(-1);
    }
  };

  const handleConfirm = () => {
    if (formData.reemail === formData.email) {
      setFormData({ ...formData, errorEmail: false });
      sendEmail();
    } else {
      setFormData({ ...formData, errorEmail: true });
    }
  };

  /**
   * Asynchronous function to handle sending confirmation code.
   * @async
   * @return {Promise<void>} Promise that resolves once the confirmation code is sent
   */
  const handleSend = async () => {
    let response = await send_confirmation_code(formData.code, formData.email);
    if (response) {
      setFormData({ ...formData, error: false });
      navigate("/user/profile");
    } else {
      setFormData({ ...formData, error: true });
    }
  };

  return (
    <Card>
      <Grid container spacing={2} direction={"column"} padding={5}>
        <Grid item>
          <Alert severity="info">
            <AlertTitle>{labels.alert.title}</AlertTitle>
            <strong>{labels.alert.strong}</strong>
            <br />
            {labels.alert.body}
          </Alert>
        </Grid>
        <Grid item>
          <TextField
            name="email"
            variant="standard"
            value={formData.email}
            autoComplete="off"
            disabled={formData.send}
            error={formData.errorEmail}
            onChange={handleChange}
            label={labels.textField.email}
          />
        </Grid>
        {!formData.send ? (
          <>
            <Grid item>
              <TextField
                name="reemail"
                autoComplete="off"
                variant="standard"
                error={formData.errorEmail}
                value={formData.reemail}
                onChange={handleChange}
                label={labels.textField.reemail}
              />
            </Grid>
            <Grid item>
              <TextField
                name="password"
                autoComplete="new-password"
                variant="standard"
                error={formData.errorEmail}
                value={formData.password}
                type="password"
                onChange={handleChange}
                label={labels.textField.password}
              />
            </Grid>
          </>
        ) : (
          <Grid item>
            <CodeFragment
              error={formData.error}
              code={formData.code}
              setCode={(value) => setFormData({ ...formData, code: value })}
              icon={formData.icon}
              setIcon={(value) => setFormData({ ...formData, icon: value })}
              resend={sendEmail}
            />
          </Grid>
        )}
      </Grid>
      <CardActions sx={centerButtonsStyle}>
        <Button size="small" onClick={handleBack}>
          {commonlabels.button.back}
        </Button>
        <Button
          size="small"
          onClick={formData.code === "" ? handleConfirm : handleSend}
        >
          {formData.code !== ""
            ? commonlabels.button.send
            : commonlabels.button.ok}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EmailChange;
