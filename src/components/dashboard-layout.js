import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DashboardNavbar } from './dashboard-navbar';
import { DashboardSidebar } from './dashboard-sidebar';
import { LOGIN_PATH, ROOT_PATH } from '../common/constants/route-constants';
import { avatarSlice } from '../store/reducers/AvatarSlice';
import { userSlice } from "../store/reducers/UserSlice";
import { UserAPI } from '../api/user-api';
import { api } from '../api/api';

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
        paddingLeft: 280,
    },
}));

export const DashboardLayout = (props) => {
    const { children } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const { setAvatarData, uploadAvatar, setIsLoadingAvatar } = avatarSlice.actions;
    const { setUser } = userSlice.actions;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.setupAuth(token);
        }
        dispatch(setIsLoadingAvatar(true));
        UserAPI.getUser()
            .then((res) => {
                dispatch(setUser(res.data));
                dispatch(setIsLoadingAvatar(false));
                let avatar = res.data.fileInfo;
                if (avatar) {
                    dispatch(setAvatarData(avatar));
                    dispatch(uploadAvatar(true));
                    dispatch(setIsLoadingAvatar(false));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [dispatch, setAvatarData, setIsLoadingAvatar, uploadAvatar]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        let corpEmail = localStorage.getItem('corpEmail');
        if (!token && !corpEmail) {
            router.replace(ROOT_PATH);
        } else if (!token) {
            router.replace(LOGIN_PATH);
        } else {
            setLoaded(true);
        }
    }, [router]);

    if (!loaded) {
        return <div></div>;
    }

    return (
        <>
            <DashboardLayoutRoot>
                <Box
                    sx={{
                        display: 'flex',
                        flex: '1 1 auto',
                        flexDirection: 'column',
                        width: '100%',
                    }}
                >
                    {children}
                </Box>
            </DashboardLayoutRoot>
            <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} />
            <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
        </>
    );
};
