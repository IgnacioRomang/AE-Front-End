import { Divider, Grid, Paper, Typography, TextField } from "@mui/material";
import React from "react";
import UserBadge from "./UserBadgeFragment";
import { centeringStyles } from "../theme.jsx";
import { IconButton } from "@mui/material";
import { GetApp, Visibility } from "@mui/icons-material";
import { Box, Stack } from "@mui/system";
import { useProfileIconDataString } from "../contexts/TextProvider";

const ProfileIconData = ({ iuser }) => {
  const [ae, setAe] = React.useState(iuser.ae);
  const labels = useProfileIconDataString();
  const handleDownload = () => {
    // Lógica para descargar el PDF
    console.log("Descargando el PDF");
  };

  const handleView = () => {
    // Lógica para visualizar el PDF
    console.log("Visualizando el PDF");
  };
  return (
    <Box sx={{ ...centeringStyles, paddingLeft: "4px", paddingRight: "4px" }}>
      <Stack sx={centeringStyles}>
        <UserBadge username={iuser.name + " " + iuser.lastname} isActive={ae} />
        <Typography variant="body1" paddingRight={17} fontSize={10}>
          {labels.cuil}
        </Typography>
        <Typography variant="h5">{iuser.cuil}</Typography>
        <Typography variant="body1">
          {iuser.lastname + ", " + iuser.name}
        </Typography>
        {/** ingresar botones de ojito y descarga*/}
      </Stack>
      {ae && (
        <>
          <Divider />
          <Stack direction={"row"} sx={centeringStyles}>
            <Typography variant="body1" fontSize={14}>
              {labels.PDF}
            </Typography>
            <IconButton onClick={handleDownload} aria-label="Descargar PDF">
              <GetApp />
            </IconButton>
            <IconButton onClick={handleView} aria-label="Visualizar PDF">
              <Visibility />
            </IconButton>
          </Stack>
        </>
      )}
    </Box>
  );
};

export default ProfileIconData;
