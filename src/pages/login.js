import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { LOGIN_PATH, MAIN_CATALOGUE_PATH, ROOT_PATH } from '../common/constants';
import { UserAPI } from '../api/user-api';
import { useTheme } from '@mui/material/styles';
import { api } from '../api/api';
import { useCustomSnackbar } from '../utils/hooks/custom-snackbar-hook';
import { useDispatch } from 'react-redux';
import { avatarSlice } from '../store/reducers/AvatarSlice';

const Login = () => {
    let theme = useTheme();
    const router = useRouter();
    const dispatch = useDispatch();
    const { uploadAvatar, setAvatarData } = avatarSlice.actions;
    const [correctEmail, setCorrectEmail] = useState(true);
    const [isRegistered, setIsRegistered] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    const resGoogleHandlerLogin = (resFromGoogle) => {
        let googleEmail = localStorage.getItem('googleEmail');
        if (resFromGoogle.profileObj.email === googleEmail) {
            UserAPI.auth(resFromGoogle)
                .then((res) => {
                    localStorage.setItem('token', res.data.token);
                    api.setupAuth(res.data.token);
                    router.replace(MAIN_CATALOGUE_PATH);

                    let avatar = res.data.fileInfoDto;
                    if (avatar) {
                        dispatch(setAvatarData(avatar));
                        dispatch(uploadAvatar(true));
                    }
                })
                .catch(() => {
                    defaultErrorSnackbar();
                });
        } else {
            setCorrectEmail(false);
        }
    };

    useEffect(() => {
        if (router.asPath !== LOGIN_PATH && router.query.userId) {
            UserAPI.confirmRegistration(router.query)
                .then(() => {
                    setIsRegistered(true);
                })
                .catch(() => {
                    defaultErrorSnackbar();
                });
        }
    }, [defaultErrorSnackbar, enqueueSnackbar, router, router.query]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        let corpEmail = localStorage.getItem('corpEmail');
        if (!token && !corpEmail) {
            router.replace(ROOT_PATH);
        } else if (token) {
            router.replace(MAIN_CATALOGUE_PATH);
        } else {
            setLoaded(true);
        }
    }, [router]);

    if (!loaded) {
        return <div></div>;
    }

    return (
        <>
            <Head>
                <title>Login</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                }}
            >
                <Container
                    maxWidth="sm"
                    sx={{
                        border: '1px solid #838E9F',
                        boxShadow: '2px 2px 4px #838E9F',
                        borderRadius: '25px',
                    }}
                >
                    <form>
                        <Box
                            sx={{
                                my: 4,
                                textAlign: 'center',
                            }}
                        >
                            <Typography color="textPrimary" variant="h4">
                                Log in with Google account
                            </Typography>
                            {isRegistered && (
                                <Typography
                                    color={'textPrimary'}
                                    variant="body1"
                                    sx={{
                                        mt: 5,
                                    }}
                                >
                                    Your Google account has been confirmed successfully
                                </Typography>
                            )}
                            <Typography
                                color={correctEmail ? 'textPrimary' : theme.palette.error.main}
                                variant="body1"
                                sx={{
                                    mt: 5,
                                }}
                            >
                                {correctEmail
                                    ? ''
                                    : 'Please select Google account which You provided on sign up'}
                            </Typography>
                        </Box>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                mt: 4,
                                mb: 5,
                            }}
                        >
                            <Grid item xs={12} md={12}>
                                <GoogleLogin
                                    clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                                    render={(renderProps) => (
                                        <Button
                                            fullWidth
                                            color="error"
                                            onClick={renderProps.onClick}
                                            disabled={renderProps.disabled}
                                            size="large"
                                            variant="contained"
                                        >
                                            Log in with Google
                                        </Button>
                                    )}
                                    onSuccess={resGoogleHandlerLogin}
                                    onFailure={resGoogleHandlerLogin}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login;
