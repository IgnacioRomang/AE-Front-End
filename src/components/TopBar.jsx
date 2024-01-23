import MenuIcon from "@mui/icons-material/Menu";
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

import { useNavigate } from "react-router-dom";
import { useService } from "../contexts/ServiceContext.js";
import { useTopBarString } from "../contexts/TextProvider.jsx";
import {
  boxSMmenu,
  boxXLmenu,
  buttonTopStyle,
  iconButtonTopStyle,
  logoTopStyle,
  menuStyles,
} from "../theme.jsx";

/**
 * The `TopBar` component is a React functional component that represents the top navigation bar of a
 * web application. It displays a logo, menu options, and a user menu.
 *
 * @param {object} props - The properties of the component
 * @param {boolean} props.userAuth - A boolean indicating whether the user is authenticated or not
 */
const TopBar = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [labels, assets] = useTopBarString();
  const { User, serverDates, isAuthenticated } = useService();
  const navigate = useNavigate();
  const today = React.useMemo(() => new Date(), []);
  const [pages, setPages] = React.useState([
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
  ]);

  /**
   * React.useEffect hook is used to perform side effects in a functional component.
   * In this case, the effect is triggered whenever the User or serverDates variables change.
   *
   * @param {object} prevProps - previous props of the component
   * @param {object} prevState - previous state of the component
   */
  React.useEffect(() => {
    if (serverDates !== null) {
      setPages([
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
              : true,
        },
      ]);
    }
  }, [User, serverDates, labels, today]);

  /**
   * The function `handleoOnClickMenu` is used to navigate to different pages based on the provided `id`
   * parameter.
   *
   * @param {Event} e - The event object
   * @param {number} id - The id of the page to navigate to
   */
  const handleoOnClickMenu = (e, id) => {
    switch (id) {
      case pages[1].id:
        navigate("/user/profile");
        break;
      case pages[2].id:
        navigate("/user/ae-renewal");
        break;
      case pages[3].id:
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

            {isAuthenticated &&
              pages.map(
                (page) =>
                  !page.disabled && (
                    <Button
                      size="small"
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
            {isAuthenticated && (
              <>
                <IconButton {...iconButtonTopStyle} onClick={handleOpenNavMenu}>
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  {...menuStyles}
                  size="small"
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
          <IconUserMenu userAuth={isAuthenticated} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default TopBar;
