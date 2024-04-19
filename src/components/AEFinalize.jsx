import BlockIcon from "@mui/icons-material/Block";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";

import {
  useCommonsButtonString,
  useCommonsFieldString,
  useComponentAEFinalizeString,
} from "../contexts/TextProvider.jsx";

import AlertFragment from "../fragments/AlertFragmet.jsx";

import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext.js";
import FormMessageFinalizeSuccess from "../fragments/form/FormMessageFinalizeSuccess.jsx";
import { FormMessageError } from "../fragments/index.js";
import {
  boxUnRegisterLogSyle,
  cardRegisterStyle,
  centerButtonsStyle,
} from "../theme.jsx";

/**
 * @brief This component is used to unregister the user from the system.
 *
 * @return {JSX.Element} The component.
 */
const AEFinalize = () => {
  const commonbuttons = useCommonsButtonString();
  const aefinalizelabels = useComponentAEFinalizeString();
  const commonfields = useCommonsFieldString();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const { User, finalize_ae, refresh } = useService();
  useEffect(() => {
    if (User === null) {
      navigate("/");
    }
  }, [navigate, User]);

  const handleSend = async () => {
    let result = await finalize_ae(password);
    setError(!result);
    if (!result) {
      setOpen(true);
    } else {
      //refresh();
      navigate("/ae/profile");
    }
  };

  const handleClose = () => {
    if (!open) {
      navigate(-1);
    }
    setOpen(false);
  };

  return (
    <>
      <Card sx={cardRegisterStyle}>
        <CardHeader
          avatar={<BlockIcon />}
          titleTypographyProps={{ variant: "h6" }}
          title={aefinalizelabels.title}
        />
        <CardContent>
          {open ? (
            <>
              {!error ? <FormMessageFinalizeSuccess /> : <FormMessageError />}
            </>
          ) : (
            <>
              <AlertFragment
                type={"warning"}
                title={aefinalizelabels.alert_warning.title}
                body={aefinalizelabels.alert_warning.body}
              />
              <Box container="true" paddingTop={3} sx={boxUnRegisterLogSyle}>
                <TextField
                  sx={{
                    width: "100%", // Ancho completo en pantallas móviles
                    "@media (min-width: 600px)": {
                      // Ajusta según sea necesario para tamaños mayores
                      width: "25vw",
                    },
                  }}
                  size="small"
                  autoComplete="new-password"
                  id="password"
                  label={commonfields.password}
                  type="password"
                  required
                  value={password}
                  onChange={handleOnChangePassword}
                  error={error}
                  //disabled={loginSuccess}
                  variant="standard"
                />
              </Box>
            </>
          )}
        </CardContent>
        <CardActions sx={centerButtonsStyle}>
          <Button size="small" color="inherit" onClick={handleClose}>
            {commonbuttons.cancel}
          </Button>
          <Button size="small" onClick={handleSend}>
            {error ? commonbuttons.restart : commonbuttons.ok}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default AEFinalize;
