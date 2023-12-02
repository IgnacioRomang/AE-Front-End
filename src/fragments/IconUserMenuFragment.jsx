import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import * as React from "react";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { stringAvatar } from "../utiles";

import { useNavigate } from "react-router-dom";

const settings = [{ label: "Cerrar sesión", icon: <ExitToAppIcon />, id: 5 }];

const settings_login = [
  { label: "Acceso", icon: <LockOpenIcon />, id: 1 },
  { label: "Registrarse", icon: <HowToRegIcon />, id: 2 },
];

const IconUserMenu = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const onClickMenu = (e, id) => {
    switch (id) {
      case settings_login[0].id:
        navigate("login");
        break;
      case settings_login[1].id:
        navigate("register");
        break;
      case settings[0].id:
        navigate("news");
        break;
      default:
        navigate("error");
    }
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {props.userAuth ? (
              <Avatar
                {...stringAvatar(props.userName)}
                sx={{ width: 40, height: 40 }}
                variant="rounded"
              />
            ) : (
              <Avatar
                src={PersonIcon}
                sx={{ width: 40, height: 40 }}
                variant="rounded"
              />
            )}
          </IconButton>
        </Tooltip>
        <Menu
          edge="end"
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {(props.userAuth ? settings : settings_login).map((setting) => (
            <MenuItem
              key={setting.id}
              onClick={(e) => onClickMenu(e, setting.id)}
            >
              {setting.icon}
              <Typography textAlign="center" paddingBlockStart={"5px"}>
                {setting.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </>
    </Box>
  );
};
export default IconUserMenu;
