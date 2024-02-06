import { Link, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfileIconDataString } from "../contexts/TextProvider";
import { centeringStyles, gridProfileInfoStyle } from "../theme.jsx";
import UserBadge from "./UserBadgeFragment";
import { useService } from "../contexts/ServiceContext.js";

const ProfileIconData = ({ iuser }) => {
  const labels = useProfileIconDataString();
  const nav = useNavigate();
  const { AE, User, fetch_end_pdf } = useService();

  const handleEndPDF = async () => {
    try {
      const pdfUrl = await fetch_end_pdf();
      window.open("data:application/pdf;base64," + pdfUrl, "_blank");
    } catch (error) {
      // Manejar el error, por ejemplo, mostrar un mensaje al usuario
      console.error("Error al abrir el PDF:", error);
    }
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
          <UserBadge username={iuser.name} isActive={iuser.ae !== AE.NON_AE} />
          <Typography variant="body1" paddingRight={17} fontSize={10}>
            {labels.cuil}
          </Typography>
          <Typography variant="h5">{iuser.cuil}</Typography>
          <Typography variant="body1">{iuser.name}</Typography>
          {/** ingresar botones de ojito y descarga*/}
        </Stack>
        <Stack padding={2} spacing={1} sx={centeringStyles}>
          {User.ae === AE.FINALIZED && (
            <Link size="small" onClick={handleEndPDF}>
              {labels.endPDF}
            </Link>
          )}
          {User.ae !== AE.NON_AE && User.ae !== AE.FINALIZED && (
            <Link size="small">{labels.startPDF}</Link>
          )}
          <Link size="small" onClick={(e) => nav("/user/reset-password")}>
            {labels.password}
          </Link>
          <Link size="small" onClick={(e) => nav("/user/email-change")}>
            {labels.email}
          </Link>
        </Stack>
        <Link size="small" onClick={(e) => nav("/user/reset-password")}>
          {labels.verify}
        </Link>
      </Paper>
    </Box>
  );
};

export default ProfileIconData;
