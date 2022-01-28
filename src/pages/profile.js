import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Container, Grid, Button } from '@mui/material';
import { UserAPI } from '../api/user-api';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DashboardLayout } from '../components/dashboard-layout';
import UploadImageCard from '../components/upload-image-card';
import { useCustomSnackbar } from './../utils/custom-snackbar-hook';

function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState([]);
    const [isOwner, setIsOwner] = useState(false);
    const [isUploadedAvatar, setIsUploadedAvatar] = useState(false);
    const [isUpdatedAvatar, setIsUpdatedAvatar] = useState(false);
    const { defaultErrorSnackbar } = useCustomSnackbar();

    const addAvatar = (file, onClose) => {
        UserAPI.addAvatar(file)
            .then(() => {
                onClose();
                setIsUploadedAvatar(true);
                setIsUpdatedAvatar(true);
            })
            .catch(() => {
                defaultErrorSnackbar();
            });
    };

    const deleteAvatar = (imageId, onDeleteButtonClose) => {
        UserAPI.deleteAvatar(imageId)
            .then(() => {
                setIsUploadedAvatar(false);
                onDeleteButtonClose();
            })
            .catch(() => defaultErrorSnackbar());
    };

    useEffect(() => {
        UserAPI.getUser()
            .then((res) => {
                setUser(res.data);
                setIsOwner(true);
                let avatar = res.data.fileInfo;
                if (avatar) {
                    setIsUploadedAvatar(true);
                }
            })
            .catch((err) => console.log(err));
    }, [isUpdatedAvatar, isUploadedAvatar]);

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
                <Button
                    onClick={() => router.back()}
                    component="a"
                    startIcon={<ArrowBackIcon fontSize="small" />}
                    sx={{
                        ml: 2,
                    }}
                >
                    Back
                </Button>
                <Container
                    maxWidth="lg"
                    sx={{
                        pt: 11,
                    }}
                >
                    <Grid container spacing={12}>
                        <Grid item lg={4} md={4} xs={12}>
                            <UploadImageCard
                                isUploaded={isUploadedAvatar}
                                onUpdate={setIsUpdatedAvatar}
                                onUpload={setIsUploadedAvatar}
                                data={user}
                                isOwner={isOwner}
                                onAdd={addAvatar}
                                onDelete={deleteAvatar}
                            />
                        </Grid>
                        <Grid item lg={8} md={8} xs={12}></Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
}

ProfilePage.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProfilePage;
