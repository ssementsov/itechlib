import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { UserAPI } from '../api/user-api';
import { DashboardLayout } from '../components/dashboard-layout';
import UploadImageCard from '../components/upload-image-card';
import { useCustomSnackbar } from './../utils/custom-snackbar-hook';
import ProfileDetails from './../components/profile/profile-details';
import { LOGIN_PATH } from '../common/constants/route-constants';
import { avatarSlice } from '../store/reducers/AvatarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { YOU_CAN_UPLOAD_IMAGE } from './../common/constants/warning-messages';
import { ProgressLinear } from '../common/UI/progressLinear';
import { GoBackButton } from './../common/UI/buttons/go-back-button';

function ProfilePage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [user, setUser] = useState({});
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const isUpdatedAvatar = useSelector((state) => state.avatar.isUpdatedAvatar);
    const isUploadedAvatar = useSelector((state) => state.avatar.isUploadedAvatar);
    const { defaultErrorSnackbar } = useCustomSnackbar();
    const { uploadAvatar, updateAvatar, setAvatarData, deleteAvatarData, setIsLoadingAvatar } =
        avatarSlice.actions;

    const addAvatar = (file, onClose) => {
        dispatch(setIsLoadingAvatar(true));
        UserAPI.addAvatar(file)
            .then(() => {
                onClose();
                dispatch(uploadAvatar(true));
                dispatch(updateAvatar(true));
                dispatch(setIsLoadingAvatar(false));
            })
            .catch(() => {
                defaultErrorSnackbar();
            });
    };

    const deleteAvatar = (imageId, onDeleteButtonClose) => {
        UserAPI.deleteAvatar(imageId)
            .then(() => {
                dispatch(uploadAvatar(false));
                dispatch(deleteAvatarData());
                onDeleteButtonClose();
            })
            .catch(() => defaultErrorSnackbar());
    };

    useEffect(() => {
        UserAPI.getUser()
            .then((res) => {
                setUser(res.data);
                setIsLoaded(true);
                setIsOwner(true);
                let avatar = res.data.fileInfo;
                if (avatar) {
                    dispatch(setAvatarData(avatar));
                    dispatch(uploadAvatar(true));
                }
            })
            .catch((err) => {
                if (err.response?.status === 403) {
                    router.replace(LOGIN_PATH);
                    localStorage.removeItem('token');
                } else {
                    defaultErrorSnackbar();
                }
            });
    }, [
        defaultErrorSnackbar,
        dispatch,
        isUpdatedAvatar,
        isUploadedAvatar,
        router,
        setAvatarData,
        uploadAvatar,
    ]);

    if (!isLoaded) {
        return <ProgressLinear/>;
    } else {
        return (
            <>
                <Head>
                    <title>Profile page</title>
                </Head>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: 3,
                        pb: 8,
                    }}
                >
                    <GoBackButton/>
                    <Container
                        maxWidth="lg"
                        sx={{
                            pt: 11,
                        }}
                    >
                        <Grid container spacing={12}>
                            <Grid item lg={4} md={4} xs={12}>
                                <UploadImageCard
                                    data={user}
                                    isOwner={isOwner}
                                    onAdd={addAvatar}
                                    onDelete={deleteAvatar}
                                    title={'avatar'}
                                    isUploadedImage={isUploadedAvatar}
                                    description={YOU_CAN_UPLOAD_IMAGE}
                                />
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                                <ProfileDetails user={user} />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </>
        );
    }
}

ProfilePage.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProfilePage;
