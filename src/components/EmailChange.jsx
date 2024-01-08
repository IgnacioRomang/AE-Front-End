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

import { useNavigate } from "react-router-dom";
import CodeFragment from "../fragments/CodeFragment";
import { centerButtonsStyle } from "../theme";
import axios from "axios";
import {
  useCommonsString,
  useEmailChangeString,
} from "../contexts/TextProvider";
import { common } from "@mui/material/colors";

/**
 * Elemento cargado del cambio de email, es una card solo accesible desde el perfil de usuario
 * Posee un text field para el email y otro para el codigo de confirmacion
 *
 * @return {*}
 */
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

  /**
   * Verifica si el email esta escrito correctamente y tiene un formato tipico de email
   * en caso afirmativo setea banderas para la interfaz como bajar signos de error y notificar envio
   * luego se comunica con backend
   *
   * en caso de no cumplir setea los errores.
   *
   */
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
