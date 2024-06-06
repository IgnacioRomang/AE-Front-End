import MenuItem from "@mui/material/MenuItem";

import React, { useEffect, useRef, useState } from "react";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { useNavigate } from "react-router-dom";
import { useService } from "../../contexts/ServiceContext.js";
import {
  ClickAwayListener,
  Grow,
  MenuList,
  Paper,
  Typography,
  Button,
  Box,
  Popper,
} from "@mui/material";

const settings = [{ label: "Cerrar sesión", icon: <ExitToAppIcon />, id: 5 }];

const settings_login = [
  { label: "Acceso", icon: <LockOpenIcon />, id: 1 },
  { label: "Excluirse", icon: <HowToRegIcon />, id: 2 },
];

const ButtonMenu = (props) => {
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
      .catch((e) => console.error("Error during logout: ", e))
      .finally(() => setAnchorElUser(null));
  };

  const loginPath = "/auth/login";
  const registerPath = "/auth/register";

  const reloadOrRedirect = (path) => {
    // SI estoy en la pagina y vuelvo apretar el mismo boton recarga
    // Si no estoy , redirige a esta
    if (window.location.pathname === path) {
      window.location.reload();
    } else {
      navigate(path);
      setAnchorElUser(null);
    }
  };
  const onClickMenu = async (e, id) => {
    const actions = {
      [settings_login[0].id]: () => reloadOrRedirect(loginPath),
      [settings_login[1].id]: () => reloadOrRedirect(registerPath),
      [settings[0].id]: logout,
      default: () => navigate("error"),
    };
    const action = actions[id] || actions.default;
    await action();
  };

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (anchorRef.current && prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box sx={{ flexGrow: 0 }}>
      <>
        <Button
          variant="contained"
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? "composition-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {props.userAuth? "Seccion" : "INGRESO"}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom-start" ? "left top" : "left bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    {(props.userAuth ? settings : settings_login).map(
                      (setting) => (
                        <MenuItem
                          size="small"
                          key={setting.label + "menu-icon"}
                          onClick={(e) => onClickMenu(e, setting.id)}
                        >
                          {setting.icon}
                          <Typography
                            textAlign="center"
                            paddingBlockStart={"5px"}
                          >
                            {setting.label}
                          </Typography>
                        </MenuItem>
                      )
                    )}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    </Box>
  );
};

/**
 *         <Menu
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
 */
export default ButtonMenu;
