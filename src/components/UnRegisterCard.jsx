import BlockIcon from "@mui/icons-material/Block";
import {
  Alert,
  AlertTitle,
  Button,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import {
  useCommonsString,
  useUnRegisterCardString,
} from "../contexts/TextProvider.jsx";
import ErrorAE from "../fragments/ErrorFragment.jsx";
import LoginFragment from "../fragments/LoginFragment.jsx";
import SuccessAE from "../fragments/SuccessFragment.jsx";
import { cardRegisterStyle, centerBottonsStyle } from "../theme.jsx";
import AlertFragment from "../fragments/AlertFragmet.jsx";
import UnRegisterSuccessFragment from "../fragments/UnRegisterSuccessFragment.jsx";

const UnRegisterCard = () => {
  const commonlabels = useCommonsString();
  const renewalstring = useUnRegisterCardString();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(true);

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
              <Box
                container={true}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoginFragment></LoginFragment>
              </Box>
            </>
          )}
        </CardContent>
        <CardActions sx={centerBottonsStyle}>
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
