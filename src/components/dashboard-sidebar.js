import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Divider, Drawer, useMediaQuery } from '@mui/material';
import { HomePageIcon } from '../icons/home-page-icon';
import { MyBooksIcon } from '../icons/my-books-icon';
import { SettingsIcon } from '../icons/settings-icon';
import { HelpIcon } from '../icons/help-icon';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import { theme } from '../theme/index';
import {
    MAIN_CATALOGUE_PATH,
    MY_BOOKS_PATH,
    REGISTER_PATH,
    HELP_PATH,
    SUGGESTED_BOOKS_PATH,
} from '../common/constants/route-constants';

const items = [
    {
        href: MAIN_CATALOGUE_PATH,
        icon: <HomePageIcon fontSize="small" />,
        title: 'Home page',
    },
    {
        href: MY_BOOKS_PATH,
        icon: <MyBooksIcon fontSize="small" />,
        title: 'My books',
    },
    {
        href: SUGGESTED_BOOKS_PATH,
        icon: <MyBooksIcon fontSize="small" />,
        title: 'Suggested books',
    },
    {
        href: REGISTER_PATH,
        icon: <SettingsIcon fontSize="small" />,
        title: 'Settings',
    },
    {
        href: HELP_PATH,
        icon: <HelpIcon fontSize="small" />,
        title: 'Help',
    },
];

export const DashboardSidebar = (props) => {
    const { open, onClose } = props;
    const router = useRouter();
    const lgUp = useMediaQuery(theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false,
    });

    useEffect(() => {
        if (router.isReady && open) {
            onClose?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [router.asPath]);

    const content = (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                }}
            >
                <div>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Link href={MAIN_CATALOGUE_PATH} passHref>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>
                                <Logo
                                    sx={{
                                        height: 42,
                                        width: 42,
                                    }}
                                />
                            </a>
                        </Link>
                    </Box>
                </div>
                <Divider
                    sx={{
                        borderColor: 'background.divider',
                        my: 3,
                    }}
                />
                <Box sx={{ flexGrow: 1 }}>
                    {items.map((item) => (
                        <NavItem
                            key={item.title}
                            icon={item.icon}
                            href={item.href}
                            title={item.title}
                        />
                    ))}
                </Box>
            </Box>
        </>
    );

    const propsDrawer = {
        anchor: 'left',
        PaperProps: {
            sx: {
                backgroundColor: 'neutral.900',
                color: '#FFFFFF',
                width: 280,
            },
        },
        variant: lgUp ? 'permanent' : 'temporary',
    };

    if (lgUp) {
        return (
            <Drawer open {...propsDrawer}>
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            onClose={onClose}
            open={open}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            {...propsDrawer}
        >
            {content}
        </Drawer>
    );
};

DashboardSidebar.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool,
};
