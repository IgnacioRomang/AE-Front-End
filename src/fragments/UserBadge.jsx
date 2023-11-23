import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import React from 'react';

function UserBadge({ username, isActive }) {
    const statusColor = isActive ? "success" : "secondary";
    const statusText = isActive ? 'Activo' : 'Inactivo';

    // Obtener las iniciales del nombre de usuario
    const initials = username
        .split(' ')
        .map((name) => name[0])
        .join('');

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            paddingTop: 5
        }}>
            <Badge badgeContent={statusText} color={statusColor}>
                <Avatar >{initials}</Avatar>
            </Badge>
        </Box>
    );
}

export default UserBadge;
