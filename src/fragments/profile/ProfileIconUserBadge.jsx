import React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Box } from "@mui/material";
import { stringAvatar } from "../../utiles";
import { useUserBadgeString } from "../../contexts/TextProvider";
import { badgeUserAnchorStyle, boxUserbadgeStyle } from "../../theme";
import { grey } from "@mui/material/colors";

function IconUserBadge({ username, isActive }) {
  const statusColor =
    isActive !== null ? (isActive ? "success" : "error") : "secondary";
  const badgeString = useUserBadgeString();
  const statusText = isActive ? badgeString.status[0] : badgeString.status[1];

  return (
    <Box sx={boxUserbadgeStyle}>
      <Badge
        anchorOrigin={badgeUserAnchorStyle}
        badgeContent={statusText}
        color={statusColor}
      >
        <Avatar {...stringAvatar(username)} variant="rounded"></Avatar>
      </Badge>
    </Box>
  );
}

export default IconUserBadge;
