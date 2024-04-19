import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";

import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import React, { useState } from "react";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import PersonIcon from "@mui/icons-material/Person";
import { stringAvatar } from "../../utiles";

import { useNavigate } from "react-router-dom";
import { useService } from "../../contexts/ServiceContext";

const settings = [{ label: "Cerrar sesión", icon: <ExitToAppIcon />, id: 5 }];

const settings_login = [
  { label: "Acceso", icon: <LockOpenIcon />, id: 1 },
  { label: "Registrarse", icon: <HowToRegIcon />, id: 2 },
];

const IconUserMenu = (props) => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();
  const { User, isAuthenticated, unauthenticate } = useService();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = async () => {
    await unauthenticate()
      .then(() => navigate("/", { replace: true }))
      .catch((e) => console.log("Error during logout: ", e))
      .finally(() => setAnchorElUser(null));
  };

  const loginPath = "/auth/login";
  const registerPath = "/auth/register";

  const onClickMenu = async (e, id) => {
    const actions = {
      [settings_login[0].id]: () => {
        if (window.location.pathname === loginPath) {
          window.location.reload();
        } else {
          navigate(loginPath);
          setAnchorElUser(null);
        }
      },
      [settings_login[1].id]: () => {
        if (window.location.pathname === registerPath) {
          window.location.reload();
        } else {
          navigate(registerPath);
          setAnchorElUser(null);
        }
      },
      [settings[0].id]: logout,
      default: () => navigate("error"),
    };

    const action = actions[id] || actions.default;
    await action();
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
          overflow="hidden"
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
              key={setting.label + "menu-icon"}
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
