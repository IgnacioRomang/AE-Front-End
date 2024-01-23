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
import { stringAvatar } from "../utiles";

import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext";
import axios from "axios";

const settings = [{ label: "Cerrar sesión", icon: <ExitToAppIcon />, id: 5 }];

const settings_login = [
  { label: "Acceso", icon: <LockOpenIcon />, id: 1 },
  { label: "Registrarse", icon: <HowToRegIcon />, id: 2 },
];

const IconUserMenu = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const {
    setUser,
    setServerDates,
    setIsAuthenticated,
    User,
    isAuthenticated,
    unauthenticate,
  } = useService();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    try {
      let result = await unauthenticate();
      if (result) {
        navigate("/", { replace: true });
        setAnchorElUser(null);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const onClickMenu = (e, id) => {
    switch (id) {
      case settings_login[0].id:
        navigate("/auth/login");
        setAnchorElUser(null);
        break;
      case settings_login[1].id:
        navigate("/auth/register");
        setAnchorElUser(null);
        break;
      case settings[0].id:
        logout();
        break;
      default:
        navigate("error");
    }
  };
  const avatarname = isAuthenticated
    ? stringAvatar(User.name + " " + User.lastname)
    : stringAvatar("N N");
  return (
    <Box sx={{ flexGrow: 0 }}>
      <>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {props.userAuth ? (
              <Avatar
                sx={{ ...avatarname.sx, width: 40, height: 40 }}
                variant="rounded"
              >
                {avatarname.children}
              </Avatar>
            ) : (
              <Avatar sx={{ width: 40, height: 40 }} variant="rounded">
                <PersonIcon />
              </Avatar>
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
          size="small"
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {(props.userAuth ? settings : settings_login).map((setting) => (
            <MenuItem
              size="small"
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
