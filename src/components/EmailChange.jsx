// This file is part of React. Component. In order to avoid circular imports we have to import all of the components that are in the React context. React's context is a JSX object that represents the top - level React component and its dependencies
import {
  Alert,
  AlertTitle,
  Button,
  Card,
  CardActions,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  useCommonsString,
  useEmailChangeString,
} from "../contexts/TextProvider";
import CodeFragment from "../fragments/CodeFragment";
import { centerButtonsStyle } from "../theme";

const EmailChange = () => {
  const labels = useEmailChangeString();
  const commonlabels = useCommonsString();
  const [code, setCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [reemail, setReEmail] = React.useState("");
  const [send, setSend] = React.useState(false);
  const [result, setResult] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [icon, setIcon] = React.useState(false);
  const navigate = useNavigate();

  // Adds send and error email rules based on the email address. This is used to prevent sending the re
  const handleSend = () => {
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email === reemail) {
      setSend(true);
      setEmail(false);
      setErrorEmail(false);
      sendEmail();
    } else {
      setErrorEmail(true);
    }
  };

  // Adds confirm middleware to handle confirming user's auth code. Also checks if user has chosen to login
  const handleConfirm = () => {
    let url = process.env.REACT_APP_BACK_URL;
    axios
      .post(url + "/api/auth/verify", { code: code })
      .then((response) => {
        if (response.data.msg === "Código válido") {
          setError(false);
          setIcon(true);
          navigate("/user/profile");
        } else {
          setError(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Sends an email to the user's email address if they are not already logged in
  const sendEmail = () => {
    let url = process.env.REACT_APP_BACK_URL;
    axios.post(url + "/api/auth/verify/send", { email: email }).catch((e) => {
      console.log(e);
    });
  };
  const handleChangeEmail = (newEmail) => {
    setSend(false);
    setEmail(newEmail);
  };
  const handleChangeReEmail = (newReEmail) => {
    setReEmail(newReEmail);
  };
  const handleBack = () => {
    navigate("/user/profile");
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
            error={errorEmail}
            onChange={(e) => handleChangeEmail(e.target.value)}
            label={"Email"}
          />
        </Grid>
        {!send && (
          <Grid item>
            <TextField
              variant="standard"
              error={errorEmail}
              onChange={(e) => handleChangeReEmail(e.target.value)}
              label={"Repetir Email"}
            />
          </Grid>
        )}
        <Grid item>
          {send && (
            <CodeFragment
              error={error}
              code={code}
              setCode={(e) => setCode(e)}
              icon={icon}
              setIcon={(e) => setIcon(e)}
              resend={sendEmail}
            />
          )}
        </Grid>
      </Grid>
      <CardActions sx={centerButtonsStyle}>
        <Button onClick={handleBack}>{commonlabels.button.back}</Button>
        <Button onClick={code !== "" ? handleConfirm : handleSend}>
          {code !== "" ? commonlabels.button.send : commonlabels.button.ok}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EmailChange;
