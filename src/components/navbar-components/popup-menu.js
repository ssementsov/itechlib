import { Avatar, IconButton } from '@mui/material';
import { bindHover, bindMenu, usePopupState } from 'material-ui-popup-state/hooks';
import HoverMenu from 'material-ui-popup-state/HoverMenu';
import MenuItem from '@mui/material/MenuItem';
import { LOGIN_PATH, PROFILE_PATH } from '../../common/constants/route-constants';
import Divider from '@mui/material/Divider';
import { GoogleLogout } from 'react-google-login';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const stylesForPopup = {
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
            right: 13,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    },
};

export const PopupMenu = () => {
    const router = useRouter();
    const avatarData = useSelector((state) => state.avatar.avatarData);
    const isLoadingAvatar = useSelector((state) => state.avatar.isLoadingAvatar);
    const [avatar, setAvatar] = useState('');

    const menuPopupState = usePopupState({
        variant: 'popover',
        popupId: 'menu',
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

    return (
        <>
            <IconButton {...bindHover(menuPopupState)} size='small'>
                <Avatar
                    src={avatar}
                    sx={{ height: 40, width: 40, ml: 1 }}
                />
            </IconButton>
            <HoverMenu
                {...bindMenu(menuPopupState)}
                PaperProps={{ ...stylesForPopup }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <MenuItem
                    onClick={() => {
                        menuPopupState.close();
                        router.push(PROFILE_PATH);
                    }}
                >
                    <Avatar src={avatar} /> Profile
                </MenuItem>
                <Divider />
                <GoogleLogout
                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                    buttonText='Logout'
                    isSignedIn={false}
                    onLogoutSuccess={handleLogout}
                    onFailure={handleLogout}
                    render={(renderProps) => (
                        <MenuItem onClick={renderProps.onClick}>
                            <ListItemIcon>
                                <Logout fontSize='small' />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    )}
                ></GoogleLogout>
            </HoverMenu>
        </>
    );
};