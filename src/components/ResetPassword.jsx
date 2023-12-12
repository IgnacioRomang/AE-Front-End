import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import React from "react";
import PasswordFragment from "../fragments/PasswordFragment";
import {
  useCommonsString,
  useResetPasswordCardString,
} from "../contexts/TextProvider";
import {
  boxLoginSyle,
  cardLoginStyle,
  centerBottonsStyle,
  centeringStyles,
} from "../theme";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const labelbutton = useCommonsString();
  const label = useResetPasswordCardString();
  const nav = useNavigate();
  const ref = React.useRef(null);

  const handleAcept = () => {
    //TODO HACe;
    //ref.current.sendData();
    nav("/profile");
  };
  const handleBack = () => {
    nav("/profile");
  };
  return (
    <>
      <Card sx={cardLoginStyle}>
        <CardHeader title={label.title} />
        <CardContent sx={boxLoginSyle}>
          <PasswordFragment ref={ref} />
        </CardContent>
        <CardActions sx={centerBottonsStyle}>
          <Button size="small" onClick={handleBack} color="inherit">
            {labelbutton.button.back}
          </Button>
          <Button size="small" onClick={handleAcept}>
            {labelbutton.button.ok}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default ResetPassword;
