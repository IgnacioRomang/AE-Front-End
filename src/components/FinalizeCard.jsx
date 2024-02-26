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

import React, { useState } from "react";

import {
  useCommonsString,
  useLoginString,
  useUnRegisterCardString,
} from "../contexts/TextProvider.jsx";

import AlertFragment from "../fragments/AlertFragmet.jsx";
import ErrorAE from "../fragments/ErrorFragment.jsx";
import UnRegisterSuccessFragment from "../fragments/UnRegisterSuccessFragment.jsx";

import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext.js";
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
const FinalizeCard = () => {
  const commonlabels = useCommonsString();
  const renewalstring = useUnRegisterCardString();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [labels] = useLoginString();

  const [passwordsd, setPassword] = React.useState("");

  const handleOnChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const { User, finalize_ae } = useService();
  React.useEffect(() => {
    if (User === null) {
      navigate("/");
    }
  }, [navigate, User]);

  const handleSend = async () => {
    let result = await finalize_ae(passwordsd);
    setError(!result);
    if (!result) {
      setOpen(!result);
    } else {
      navigate("/user/profile");
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
          title={renewalstring.mainTitle}
        />
        <CardContent>
          {open ? (
            <>{!error ? <UnRegisterSuccessFragment /> : <ErrorAE />}</>
          ) : (
            <>
              <AlertFragment
                type={"warning"}
                title={renewalstring.warning.title}
                body={renewalstring.warning.body}
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
                  label={labels.textFieldLabels.password}
                  type="password"
                  required
                  value={passwordsd}
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
            {commonlabels.button.cancel}
          </Button>
          <Button size="small" onClick={handleSend}>
            {error ? commonlabels.button.restart : commonlabels.button.ok}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default FinalizeCard;
