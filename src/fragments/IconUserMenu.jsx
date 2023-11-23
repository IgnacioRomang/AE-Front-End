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

function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}

function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
}

const settings = [
    { label: "Perfil", icon: <PersonIcon /> },
    { label: "Ajustes", icon: <SettingsIcon /> },
    { label: "Cerrar sesión", icon: <ExitToAppIcon /> },
];

const settings_login = [
    { label: "Acceso", icon: <LockOpenIcon /> },
    { label: "Registrarse", icon: <HowToRegIcon /> },
];

const IconUserMenu = (props) => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Box sx={{ flexGrow: 0 }}>
                <>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            {props.userAuth ? (
                                <Avatar {...stringAvatar(props.userName)} />
                            ) : (
                                <Avatar src={PersonIcon} />
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
                        {(props.userAuth ? settings : settings_login).map(
                            (setting) => (
                                <MenuItem
                                    key={setting.label}
                                    onClick={handleCloseUserMenu}
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
                    </Menu>
                </>
            </Box>
        </>
    );
};
export default IconUserMenu;
