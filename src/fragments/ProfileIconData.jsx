import { Divider, Button, Paper, Typography } from "@mui/material";
import React from "react";
import UserBadge from "./UserBadgeFragment";
import { centeringStyles, gridProfileInfoStyle } from "../theme.jsx";
import { Box, Stack } from "@mui/system";
import { useProfileIconDataString } from "../contexts/TextProvider";
import { useNavigate } from "react-router-dom";
import { Height } from "@mui/icons-material";

const ProfileIconData = ({ iuser }) => {
  const [ae, setAe] = React.useState(iuser.ae);
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
            isActive={ae}
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

        {ae && (
          <>
            <Divider />
            <Stack direction={"row"} sx={centeringStyles}>
              <Button>{labels.PDF}</Button>
              <Divider orientation="vertical" flexItem />
              <Button onClick={(e) => nav("/resetpassword")}>
                {labels.password}
              </Button>
              <Divider orientation="vertical" flexItem />
              <Button onClick={(e) => nav("/resetpassword")}>
                {labels.email}
              </Button>
            </Stack>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default ProfileIconData;
