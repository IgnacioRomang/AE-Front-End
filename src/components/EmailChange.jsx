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

const EmailChange = () => {
  const commonlabels = useCommonsString();
  const labels = useEmailChangeString();
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [reemail, setReEmail] = useState("");
  const [password, setPassword] = useState("");
  const [send, setSend] = useState(false);

  const [error, setError] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [icon, setIcon] = useState(false);
  const navigate = useNavigate();

  const { User, send_confirmation_code, send_confirmation_email } =
    useService();
  React.useEffect(() => {
    if (User === null) {
      navigate("/");
    }
  }, [navigate, User]);

  const sendEmail = async () => {
    try {
      const response = await send_confirmation_code(code, email);
      setSend(response);
    } catch (error) {
      console.error("Error sending email:", error);
      setSend(false);
    }
  };

  const handleChangeEmail = (event) => {
    setSend(false);
    setEmail(event.target.value);
  };

  const handleChangeReEmail = (event) => {
    setReEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleBack = () => {
    if (send) {
      setSend(false);
    } else {
      navigate(-1);
    }
  };

  const handleConfirm = () => {
    if (reemail === email) {
      setErrorEmail(false);
      sendEmail();
    } else {
      setErrorEmail(true);
    }
  };
  const handleSend = async () => {
    let response = await send_confirmation_code(code, email);
    if (response) {
      setError(false);
      navigate("/user/profile");
    } else {
      setError(true);
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
            variant="standard"
            value={email}
            autoComplete="off"
            disabled={send}
            error={errorEmail}
            onChange={handleChangeEmail}
            label={labels.textField.email}
          />
        </Grid>
        {!send && (
          <Grid item>
            <TextField
              autoComplete="off"
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
              autoComplete="new-password"
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
        <Button size="small" onClick={handleBack}>
          {commonlabels.button.back}
        </Button>
        <Button size="small" onClick={code === "" ? handleConfirm : handleSend}>
          {code !== "" ? commonlabels.button.send : commonlabels.button.ok}
        </Button>
      </CardActions>
    </Card>
  );
};

export default EmailChange;
