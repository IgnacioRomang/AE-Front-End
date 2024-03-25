import { Link, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEmailVerify } from "../../contexts/EmailVerifyContext.js";
import { useService } from "../../contexts/ServiceContext.js";
import {
  useCommonsFieldString,
  useComponentAEProfileString,
} from "../../contexts/TextProvider.jsx";
import { centeringStyles, gridProfileInfoStyle } from "../../theme.jsx";
import EmailBackdrop from "../EmailBackdrop.jsx";
import IconUserBadge from "./ProfileIconUserBadge.jsx";

const ProfileInfo = () => {
  const aeprofilestring = useComponentAEProfileString();
  const commonfields = useCommonsFieldString();
  const nav = useNavigate();
  const { AE, User, fetch_end_pdf, fetch_start_pdf } = useService();

  const { resend_verify_email } = useEmailVerify();
  const handleEndPDF = async () => {
    try {
      const pdfUrl = await fetch_end_pdf();
      await window.open("data:application/pdf;base64," + pdfUrl, "_blank");
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      console.error("Error al abrir el PDF:", error);
    }
  };
  const handleStartPDF = async () => {
    try {
      const pdfUrl = await fetch_start_pdf();
      await window.open("data:application/pdf;base64," + pdfUrl, "_blank");
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      console.error("Error al abrir el PDF:", error);
    }
  };

  const handleGoTo = (url) => {
    nav(url);
  };

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [click, setClick] = useState(false);
  const [timeLeft, setTimeLeft] = useState(31);

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
            {commonfields.cuil}
          </Typography>
          <Typography variant="h5">{User.cuil}</Typography>
          <Typography variant="body1">{User.name}</Typography>
          {/** ingresar botones de ojito y descarga*/}
        </Stack>
        <Stack padding={2} spacing={1} sx={centeringStyles}>
          {User.ae === AE.FINALIZED && (
            <Link size="small" onClick={handleEndPDF}>
              {aeprofilestring.link_label.end_of_ae_certificate}
            </Link>
          )}
          {User.ae !== AE.NON_AE && User.ae !== AE.FINALIZED && (
            <Link size="small" onClick={handleStartPDF}>
              {aeprofilestring.link_label.start_of_ae_certificate}
            </Link>
          )}
          <Link size="small" onClick={(e) => handleGoTo("/password/change")}>
            {aeprofilestring.link_label.password_change}
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
              aeprofilestring.link_label.email_change
            ) : (
              <>
                {aeprofilestring.link_label.email_verify}
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
