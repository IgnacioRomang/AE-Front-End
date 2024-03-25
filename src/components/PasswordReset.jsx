import { Button, CardActions, Stack, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCommonsButtonString,
  useCommonsFieldString,
  useComponentPasswordAlertString,
} from "../contexts/TextProvider";
import AlertFragment from "../fragments/AlertFragmet";

import { usePasswordService } from "../contexts/PasswordContext";
import ProcessAlert from "../fragments/ProcessAlert";
import { buttonTopStyle, centerButtonsStyle } from "../theme";
import { doformatCUIL } from "../utiles";

const PasswordReset = () => {
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [send, setSend] = useState(false);

  const passwordreq = useComponentPasswordAlertString();
  const commonbuttons = useCommonsButtonString();
  const commonfields = useCommonsFieldString();
  const navigate = useNavigate();

  const token = new URLSearchParams(window.location.search).get("token");

  const { send_reset_password } = usePasswordService();

  const [cuil, setCuil] = useState();
  const [password, setPassword] = useState();
  const [password_confirmation, setPasswordConfirmation] = useState();

  const handleCUILChange = (event) => {
    let cuilf = doformatCUIL(event.target.value);
    setCuil(cuilf);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const sendData = async () => {
    setSend(true);
    try {
      const result = await send_reset_password(
        token,
        cuil,
        password,
        password_confirmation
      );
      setSuccess(result);
      setLoading(!result);
    } catch (error) {
      setSuccess(false);
      setLoading(false);
      setError(true);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSend(false);
      navigate("/", { replace: true });
    }
  };

  return (
    <>
      {!send ? (
        <Card>
          <CardContent sx={{ padding: 4 }}>
            <Stack spacing={2}>
              <TextField
                size="small"
                id="cuil"
                label={commonfields.cuil}
                required
                sx={{ width: "25vw" }}
                disabled={null}
                error={error}
                value={cuil}
                onChange={handleCUILChange}
                variant="standard"
              />
              <TextField
                id="password"
                label={commonfields.password}
                size="small"
                type="password"
                sx={{ width: "25vw" }}
                required
                autoComplete="off"
                error={error}
                value={password}
                onChange={handlePasswordChange}
                variant="standard"
              />
              <TextField
                id="passwordres"
                label={commonfields.password}
                size="small"
                type="password"
                sx={{ width: "25vw" }}
                required
                autoComplete="off"
                error={error}
                value={password_confirmation}
                onChange={handlePasswordConfirmationChange}
                variant="standard"
              />
            </Stack>
            {error && (
              <AlertFragment
                type="error"
                title={passwordreq.info.requirements.title}
                body={passwordreq.info.requirements.body}
              />
            )}
          </CardContent>
          <CardActions sx={centerButtonsStyle}>
            <Button size="small" color="inherit" onClick={null} disabled={null}>
              {commonbuttons.cancel}
            </Button>
            <Button
              size="small"
              sx={buttonTopStyle}
              onClick={sendData}
              disabled={send}
            >
              {commonbuttons.ok}
            </Button>
          </CardActions>
        </Card>
      ) : (
        <ProcessAlert open={send} loading={loading} success={success} />
      )}
    </>
  );
};

export default PasswordReset;
