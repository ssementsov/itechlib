import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { AppBar, Box, IconButton, Toolbar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PopupNotificationsListWithWebsocket } from './navbar-components/popup-notifications-list';
import { PopupMenuWithWebsocket } from './navbar-components/popup-menu';

const DashboardNavbarRoot = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
}));

export const DashboardNavbar = (props) => {
    const { onSidebarOpen, ...other } = props;

    return (
        <>
            <DashboardNavbarRoot
                sx={{
                    left: { lg: 280 },
                    width: { lg: 'calc(100% - 280px)' },
                }}
                {...other}
            >
                <Toolbar
                    disableGutters
                    sx={{ minHeight: 64, left: 0, px: 2 }}
                >
                    <IconButton
                        onClick={onSidebarOpen}
                        sx={{
                            display: { xs: 'inline-flex', lg: 'none' },
                        }}
                    >
                        <MenuIcon fontSize='small' />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <PopupNotificationsListWithWebsocket />
                    <PopupMenuWithWebsocket />
                </Toolbar>
            </DashboardNavbarRoot>
        </>
    );
};

DashboardNavbar.propTypes = {
    onSidebarOpen: PropTypes.func,
};
