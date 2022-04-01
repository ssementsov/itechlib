import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { GoogleLogout } from 'react-google-login';
import { LOGIN_PATH, PROFILE_PATH } from '../common/constants/route-constants';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

const styleForMenu = {
    elevation: 0,
    sx: {
        width: '150px',
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        mt: 1.5,
        '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
};

export const DashboardNavbar = (props) => {
    const router = useRouter();
    const { onSidebarOpen, ...other } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [avatar, setAvatar] = useState(null);

    const handleHover = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.replace(LOGIN_PATH);
    };

    useEffect(() => {
        setAvatar(localStorage.getItem('avatar'));
    }, []);

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: {
                        lg: 280,
                    },
                    width: {
                        lg: 'calc(100% - 280px)',
                    },
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{
                        minHeight: 64,
                        left: 0,
                        px: 2,
                    }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: {
                                xs: 'inline-flex',
                                lg: 'none',
                            },
                        }}
                    >
                        <MenuIcon fontSize="small" />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <IconButton onMouseEnter={handleHover} size="small" sx={{ ml: 2 }}>
                        <Avatar
                            src={avatar}
                            sx={{
                                height: 40,
                                width: 40,
                                ml: 1,
                            }}
                        ></Avatar>
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        autoFocus={false}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{ ...styleForMenu }}
                        transformOrigin={{
                            horizontal: 'right',
                            vertical: 'top',
                        }}
                        anchorOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                    >
                        <MenuItem
                            onClick={() => {
                                router.push(PROFILE_PATH);
                            }}
                        >
                            <Avatar src={avatar} /> Profile
                        </MenuItem>
                        <Divider />
                        <GoogleLogout
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            isSignedIn={false}
                            onLogoutSuccess={handleLogout}
                            onFailure={handleLogout}
                            render={(renderProps) => (
                                <MenuItem onClick={renderProps.onClick}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            )}
                        ></GoogleLogout>
                    </Menu>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
};
