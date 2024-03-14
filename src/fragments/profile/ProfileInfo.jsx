import {
  Backdrop,
  CircularProgress,
  Link,
  Paper,
  Popper,
  Typography,
} from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfileIconDataString } from "../../contexts/TextProvider.jsx";
import { centeringStyles, gridProfileInfoStyle } from "../../theme.jsx";
import IconUserBadge from "./ProfileIconUserBadge.jsx";
import { useService } from "../../contexts/ServiceContext.js";
import EmailBackdrop from "../EmailBackdrop.jsx";
import CheckIcon from "@mui/icons-material/Check";

const ProfileInfo = () => {
  const labels = useProfileIconDataString();
  const nav = useNavigate();
  const { AE, User, fetch_end_pdf, fetch_start_pdf, resend_verify_email } =
    useService();

  const handleEndPDF = async () => {
    try {
      const pdfUrl = await fetch_end_pdf();
      window.open("data:application/pdf;base64," + pdfUrl, "_blank");
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      console.error("Error al abrir el PDF:", error);
    }
  };
  const handleStartPDF = async () => {
    try {
      const pdfUrl = await fetch_start_pdf();
      window.open("data:application/pdf;base64," + pdfUrl, "_blank");
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      console.error("Error al abrir el PDF:", error);
    }
  };

  const handleGoTo = (url) => {
    nav(url);
  };

  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [click, setClick] = React.useState(false);
  const [timeLeft, setTimeLeft] = React.useState(31);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const handleClick = async (event) => {
    if (!click) {
      setOpen(true);
      await sendEmail();

      setTimeLeft(30);
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      setClick(true);
      setTimeout(() => {
        clearInterval(intervalId);
        setClick(false);
      }, 31000);

      setOpen(false);
    }
  };

  const sendEmail = async () => {
    setLoading(true);
    await resend_verify_email();
    setLoading(false);
    await sleep(500);
  };

  return (
    <Box
      sx={{
        ...centeringStyles,
        paddingLeft: "4px",
        paddingRight: "4px",
      }}
    >
      <Paper elevation={1} sx={gridProfileInfoStyle}>
        <Stack sx={centeringStyles}>
          <IconUserBadge
            username={User.name}
            isActive={User.ae !== AE.NON_AE}
          />
          <Typography variant="body1" paddingRight={17} fontSize={10}>
            {labels.cuil}
          </Typography>
          <Typography variant="h5">{User.cuil}</Typography>
          <Typography variant="body1">{User.name}</Typography>
          {/** ingresar botones de ojito y descarga*/}
        </Stack>
        <Stack padding={2} spacing={1} sx={centeringStyles}>
          {User.ae === AE.FINALIZED && (
            <Link size="small" onClick={handleEndPDF}>
              {labels.endPDF}
            </Link>
          )}
          {User.ae !== AE.NON_AE && User.ae !== AE.FINALIZED && (
            <Link size="small" onClick={handleStartPDF}>
              {labels.startPDF}
            </Link>
          )}
          <Link size="small" onClick={(e) => handleGoTo("/password/change")}>
            {labels.password}
          </Link>
          <Link
            size="small"
            disable={click}
            style={
              click
                ? {
                    marginLeft: "9px",
                    color: "#d6dbdf ",
                    textDecorationColor: "#d6dbdf ",
                  }
                : null
            }
            onClick={
              User.email_verified_at
                ? (e) => handleGoTo("/email/change")
                : handleClick
            }
          >
            {User.email_verified_at ? (
              labels.email
            ) : (
              <>
                {labels.verify}
                {click ? (
                  <span style={{ marginLeft: "9px", color: "#d6dbdf " }}>
                    {timeLeft}s
                  </span>
                ) : (
                  <></>
                )}
              </>
            )}
          </Link>
        </Stack>
      </Paper>
      <EmailBackdrop open={open} loading={loading} />
    </Box>
  );
};

export default ProfileInfo;
