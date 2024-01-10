import BlockIcon from "@mui/icons-material/Block";
import HistoryIcon from "@mui/icons-material/History";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import RefreshIcon from "@mui/icons-material/Refresh";
import AppBar from "@mui/material/AppBar";

import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import React from "react";
import IconUserMenu from "../fragments/IconUserMenuFragment.jsx";

import { Link, useNavigate } from "react-router-dom";
import { useTopBarString } from "../contexts/TextProvider.jsx";
import {
  boxSMmenu,
  boxXLmenu,
  buttonTopStyle,
  iconButtonTopStyle,
  logoTopStyle,
  menuStyles,
} from "../theme.jsx";
import { useAuth } from "../contexts/AuthContext.js";

const TopBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [labels, assets] = useTopBarString();
  const { User, serverDates } = useAuth();
  const navigate = useNavigate();
  const today = new Date();
  let pages = [
    { label: labels.opctions[0], id: 0, disabled: false },
    { label: labels.opctions[1], id: 3, disabled: false },
    {
      label: labels.opctions[2],
      id: 1,
      disabled: User !== null ? User.ae : false,
    },
    {
      label: labels.opctions[3],
      id: 2,
      disabled:
        User !== null && User.ae
          ? today.getMilliseconds() >=
              serverDates.fifthMonth.getMilliseconds() &&
            today.getMilliseconds() <= serverDates.sixthMonth.getMilliseconds()
          : false,
    },
  ];
  React.useEffect(() => {
    pages = [
      { label: labels.opctions[0], id: 0, disabled: false },
      { label: labels.opctions[1], id: 3, disabled: false },
      {
        label: labels.opctions[2],
        id: 1,
        disabled: User !== null ? User.ae : false,
      },
      {
        label: labels.opctions[3],
        id: 2,
        disabled:
          User !== null && User.ae
            ? today.getMilliseconds() >=
                serverDates.fifthMonth.getMilliseconds() &&
              today.getMilliseconds() <=
                serverDates.sixthMonth.getMilliseconds()
            : false,
      },
    ];
  }, [User, serverDates]);

  const handleoOnClickMenu = (e, id) => {
    switch (id) {
      case pages[3].id:
        navigate("/user/profile");
        break;
      case pages[1].id:
        navigate("/user/ae-renewal");
        break;
      case pages[2].id:
        navigate("/user/ae-finalize");
        break;
      case pages[0].id:
        navigate("/");
        break;

      default:
        navigate("error");
    }
  };
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <AppBar position="static">
      <Container
        sx={{
          maxWidth: "xl",
        }}
      >
        <Toolbar disableGutters>
          <Box sx={boxXLmenu}>
            <img
              src={assets.logo.src}
              loading="lazy"
              alt="" //todo alt
              onClick={handleLogoClick}
              style={logoTopStyle}
            />

            {props.userAuth &&
              pages.map(
                (page) =>
                  !page.disabled && (
                    <Button
                      key={page.label}
                      disabled={page.disabled}
                      onClick={(e) => handleoOnClickMenu(e, page.id)}
                      sx={buttonTopStyle}
                    >
                      {page.label}
                    </Button>
                  )
              )}
          </Box>

          <Box sx={boxSMmenu}>
            {props.userAuth && (
              <>
                <IconButton {...iconButtonTopStyle} onClick={handleOpenNavMenu}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  {...menuStyles}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                >
                  {pages.map(
                    (page) =>
                      !page.disabled && (
                        <MenuItem
                          key={page.label}
                          disabled={page.disabled}
                          onClick={(e) => handleoOnClickMenu(e, page.id)}
                        >
                          <Typography
                            textAlign="center"
                            paddingBlockStart={"5px"}
                          >
                            {page.label}
                          </Typography>
                        </MenuItem>
                      )
                  )}
                </Menu>
              </>
            )}
            <img
              src={assets.logo.src}
              loading="lazy"
              alt="" //todo alt
              onClick={handleLogoClick}
              style={logoTopStyle}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <IconUserMenu userAuth={props.userAuth} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
