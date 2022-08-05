import React from 'react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import { usePopupState, bindHover, bindMenu } from 'material-ui-popup-state/hooks';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import { GoogleLogout } from 'react-google-login';
import { LOGIN_PATH, PROFILE_PATH } from '../common/constants/route-constants';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

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
        mt: 0,
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
            top: 2,
            right: 20,
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
    const avatarData = useSelector((state) => state.avatar.avatarData);
    const isLoadingAvatar = useSelector((state) => state.avatar.isLoadingAvatar);
    const { onSidebarOpen, ...other } = props;
    const [avatar, setAvatar] = useState('');

    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoMenu',
    });

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.replace(LOGIN_PATH);
    };

    useEffect(() => {
        if (avatarData) {
            const avatartUrl = `data:image/${avatarData?.extension};base64,${avatarData?.fileData}`;
            setAvatar(avatartUrl);
        }
    }, [avatarData, isLoadingAvatar]);

    useEffect(() => {
        const socket = new SockJS('http://localhost:8089/api/queue');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, onConnected, onError);
        function onConnected() {
            console.log("its working");
        }
        function onError() {
            console.log("its not working");
        }
    }, [])

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
                    {!isLoadingAvatar && (
                        <IconButton {...bindHover(popupState)} size="small" sx={{ ml: 2 }}>
                            <Avatar
                                src={avatar}
                                sx={{
                                    height: 40,
                                    width: 40,
                                    ml: 1,
                                }}
                            ></Avatar>
                        </IconButton>
                    )}
                    <HoverMenu
                        {...bindMenu(popupState)}
                        PaperProps={{ ...styleForMenu }}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        <MenuItem
                            onClick={() => {
                                popupState.close();
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
                    </HoverMenu>
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
};
