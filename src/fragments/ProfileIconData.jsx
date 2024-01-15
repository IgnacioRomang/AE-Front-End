import { Link, Paper, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useProfileIconDataString } from "../contexts/TextProvider";
import { centeringStyles, gridProfileInfoStyle } from "../theme.jsx";
import UserBadge from "./UserBadgeFragment";

const ProfileIconData = ({ iuser }) => {
  const labels = useProfileIconDataString();
  const nav = useNavigate();

  const handleDownload = () => {
    // Lógica para descargar el PDF
    console.log("Descargando el PDF");
  };

  const handleView = () => {
    // Lógica para visualizar el PDF
    console.log("Visualizando el PDF");
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
          <UserBadge
            username={iuser.name + " " + iuser.lastname}
            isActive={iuser.ae}
          />
          <Typography variant="body1" paddingRight={17} fontSize={10}>
            {labels.cuil}
          </Typography>
          <Typography variant="h5">{iuser.cuil}</Typography>
          <Typography variant="body1">
            {iuser.lastname + ", " + iuser.name}
          </Typography>
          {/** ingresar botones de ojito y descarga*/}
        </Stack>
        <Stack padding={2} spacing={1} sx={centeringStyles}>
          <Link>{labels.PDF}</Link>
          <Link onClick={(e) => nav("/user/reset-password")}>
            {labels.password}
          </Link>
          <Link onClick={(e) => nav("/user/email-change")}>{labels.email}</Link>
        </Stack>
        <Link onClick={(e) => nav("/user/reset-password")}>
          {labels.verify}
        </Link>
      </Paper>
    </Box>
  );
};

export default ProfileIconData;
