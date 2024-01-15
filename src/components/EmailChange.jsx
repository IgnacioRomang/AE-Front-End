import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useCommonsString,
  useEmailChangeString,
} from "../contexts/TextProvider";
import CodeFragment from "../fragments/CodeFragment";
import { centerButtonsStyle } from "../theme";
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
} from "@mui/material";

/**
 * @brief This component handles the email change process.
 *
 * @param {object} props - The props passed to the component.
 *
 * @returns {JSX.Element} The EmailChange component.
 */
const EmailChange = (props) => {
  const commonlabels = useCommonsString();
  const labels = useEmailChangeString();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [reemail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [send, setSend] = useState(false);
  const [result, setResult] = useState(false);
  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [icon, setIcon] = useState(false);
  const navigate = useNavigate();

  /**
   * @brief Sends an email with the verification code to the given email address.
   *
   * @returns {void}
   */
  const sendEmail = () => {
    let url = process.env.REACT_APP_BACK_URL;
    axios
      .post(url + "/api/auth/email/verify/send", {
        password: password,
        email: email,
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /**
   * @brief Handles the change of the email input field.
   *
   * @param {object} event - The event object.
   *
   * @returns {void}
   */
  const handleChangeEmail = (event) => {
    setSend(false);
    setEmail(event.target.value);
  };

  /**
   * @brief Handles the change of the re-email input field.
   *
   * @param {object} event - The event object.
   *
   * @returns {void}
   */
  const handleChangeReEmail = (event) => {
    setReEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  /**
   * @brief Handles the click of the back button.
   *
   * @returns {void}
   */
  const handleBack = () => {
    if (send) {
      setSend(false);
    } else {
      navigate("/user/profile");
    }
  };

  const handleConfirm = () => {
    if (reemail === email) {
      setSend(true);
      setErrorEmail(false);
      sendEmail();
    } else {
      setErrorEmail(true);
    }
  };
  const handleSend = () => {
    let url = process.env.REACT_APP_BACK_URL;
    axios
      .post(url + "/api/auth/email/verify", {
        code: code,
        email: email,
      })
      .then((response) => {
        console.log(response);
        if (response.data.message == "Código válido") {
          setError(false);
          navigate("/user/profile");
        } else {
          setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
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
            variant="standard"
            value={email}
            disabled={send}
            error={errorEmail}
            onChange={handleChangeEmail}
            label={labels.textField.email}
          />
        </Grid>
        {!send && (
          <Grid item>
            <TextField
              variant="standard"
              error={errorEmail}
              value={reemail}
              onChange={handleChangeReEmail}
              label={labels.textField.reemail}
            />
          </Grid>
        )}
        {!send && (
          <Grid item>
            <TextField
              variant="standard"
              error={errorEmail}
              value={password}
              type="password"
              onChange={handleChangePassword}
              label={labels.textField.password}
            />
          </Grid>
        )}
        <Grid item>
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
        </Grid>
      </Grid>
      <CardActions sx={centerButtonsStyle}>
        <Button onClick={handleBack}>{commonlabels.button.back}</Button>
        <Button onClick={code == "" ? handleConfirm : handleSend}>
          {code !== "" ? commonlabels.button.send : commonlabels.button.ok}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EmailChange;
