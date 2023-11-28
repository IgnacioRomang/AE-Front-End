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

import { useTopBarString } from "../contexts/TextProvider.jsx";
import {
  boxSMmenu,
  boxXLmenu,
  buttonTopStyle,
  iconButtonTopStyle,
  logoTopStyle,
  menuStyles,
} from "../theme.jsx";

const TopBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [labels, assets] = useTopBarString();

  const pages = [
    { label: labels.opctions[0], icon: <PersonIcon /> },
    { label: labels.opctions[1], icon: <RefreshIcon /> },
    { label: labels.opctions[2], icon: <HistoryIcon /> },
    { label: labels.opctions[3], icon: <BlockIcon /> },
  ];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
              href={assets.logo.href}
              style={logoTopStyle}
            />
            {props.userAuth &&
              pages.map((page) => (
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={buttonTopStyle}
                  startIcon={page.icon}
                >
                  {page.label}
                </Button>
              ))}
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
                  {pages.map((page) => (
                    <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                      {page.icon}
                      <Typography textAlign="center" paddingBlockStart={"5px"}>
                        {page.label}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </>
            )}
            <img
              src={assets.logo.src}
              loading="lazy"
              alt="" //todo alt
              href={assets.logo.href}
              style={logoTopStyle}
            />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          <IconUserMenu userAuth={props.userAuth} userName="Ignacio Romang" />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
