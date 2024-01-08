import BlockIcon from "@mui/icons-material/Block";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import React, { useState } from "react";
import {
  useCommonsString,
  useUnRegisterCardString,
} from "../contexts/TextProvider.jsx";
import AlertFragment from "../fragments/AlertFragmet.jsx";
import ErrorAE from "../fragments/ErrorFragment.jsx";
import LoginFragment from "../fragments/LoginFragment.jsx";
import UnRegisterSuccessFragment from "../fragments/UnRegisterSuccessFragment.jsx";
import {
  boxUnRegisterLogSyle,
  cardRegisterStyle,
  centerButtonsStyle,
} from "../theme.jsx";

const UnRegisterCard = () => {
  const commonlabels = useCommonsString();
  const renewalstring = useUnRegisterCardString();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleSend = () => {
    if (error) {
      setError(false);
    }
    setOpen(!open);
  };

  const handleClose = () => {
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
              <Box container={true} sx={boxUnRegisterLogSyle}>
                {/* Box succes tambien es estilo en otro lado cuidado*/}
                <LoginFragment></LoginFragment>
              </Box>
            </>
          )}
        </CardContent>
        <CardActions sx={centerButtonsStyle}>
          <Button size="small" color="inherit">
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

export default UnRegisterCard;
