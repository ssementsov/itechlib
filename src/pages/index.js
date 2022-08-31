import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { GoogleLogin } from 'react-google-login';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { UserAPI } from '../api/user-api';
import jwt_decode from 'jwt-decode';
import {
    LOGIN_PATH,
    MAIN_CATALOGUE_PATH,
} from '../common/constants/route-constants';
import { useCustomSnackbar } from '../utils/hooks/custom-snackbar-hook';
import { PrimaryButton } from '../common/UI/buttons/primary-button';
import * as Yup from 'yup';
import { isRequired } from '../common/constants/warning-messages-and-validation';

const Register = () => {
    const router = useRouter();
    const [disabledGoogle, setDisabledGoogle] = useState(true);
    const [disabledCorp, setDisabledCorp] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    function validate(value) {
        let error = {};
        if (!value.email) {
            error.email = isRequired('Email');
        } else if (!/^[A-Z0-9._%+-]+\.+[A-Z0-9._%+-]+@itechart-group.com/i.test(value.email)) {
            error.email = 'Please enter correct corporate email';
        }
        return error;
    }

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .trim()
                .min(24, 'Email must be 24 or more symbols')
                .max(50, 'Email must be 50 or less symbols'),
        }),
        validate,
        onSubmit: (value) => {
            UserAPI.checkCorpEmail(value.email)
                .then(() => {
                    setDisabledCorp(true);
                    setDisabledGoogle(false);
                    localStorage.setItem('corpEmail', value.email);
                    enqueueSnackbar(
                        'Your corporate email was confirmed successfully. You can proceed with your Google account.',
                        {
                            variant: 'success',
                        },
                    );
                })
                .catch(() => {
                    enqueueSnackbar('Your corporate email is not registered.', {
                        variant: 'error',
                    });
                });
        },
    });

    const resGoogleHandlerRegister = (res) => {
        let token = res.tokenId;
        if (token) {
            const responsePayload = jwt_decode(token);
            let googleEmail = responsePayload.email;
            let corpEmail = localStorage.getItem('corpEmail');

            UserAPI.connectGoogleEmail({
                corpEmail: corpEmail,
                googleEmail: googleEmail,
            })
                .then((res) => {
                    localStorage.setItem('googleEmail', googleEmail);
                    if (!res.data) {
                        setDisabledGoogle(true);
                        enqueueSnackbar(
                            'A letter with instructions has been sent to your Google mailbox. To log in please follow the link in the email.',
                            {
                                variant: 'success',
                            },
                        );
                    } else {
                        router.replace(LOGIN_PATH);
                    }
                })
                .catch((error) => {
                    if (
                        error.response.data.message ===
                        'This User already has a different google address.'
                    ) {
                        enqueueSnackbar(
                            'Please select Google account which You provided on sign up page.',
                            {
                                variant: 'error',
                            },
                        );
                    } else {
                        defaultErrorSnackbar();
                    }
                });
        }
    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        let corpEmail = localStorage.getItem('corpEmail');
        if (!token && corpEmail) {
            router.replace(LOGIN_PATH);
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
                <title>Register</title>
            </Head>
            <Box
                component='main'
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                }}
            >
                <Container
                    maxWidth='sm'
                    sx={{
                        border: '1px solid #838E9F',
                        boxShadow: '2px 2px 4px #838E9F',
                        borderRadius: '25px',
                    }}
                >
                    <form onSubmit={formik.handleSubmit}>
                        <Box
                            sx={{
                                mt: 3,
                                mb: 3,
                            }}
                        >
                            <Typography
                                color='textPrimary'
                                variant='h4'
                                textAlign='center'
                            >
                                Sign up
                            </Typography>
                        </Box>
                        <TextField
                            disabled={disabledCorp}
                            error={Boolean(
                                formik.touched.email && formik.errors.email,
                            )}
                            fullWidth
                            helperText={
                                formik.touched.email && formik.errors.email
                            }
                            label='Please enter your corporate email here'
                            margin='normal'
                            name='email'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type='email'
                            value={formik.values.email}
                            variant='outlined'
                        />
                        <Box
                            sx={{
                                mt: 3,
                                mb: 2,
                            }}
                        >
                            <PrimaryButton
                                title='Confirm corporate email'
                                type='submit'
                                disabled={disabledCorp}
                            />
                        </Box>
                    </form>
                    <Box
                        sx={{
                            mt: 1,
                            mb: 6,
                        }}
                    >
                        <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                                <Button
                                    fullWidth
                                    color='error'
                                    onClick={renderProps.onClick}
                                    disabled={disabledGoogle}
                                    size='large'
                                    variant='contained'
                                >
                                    Confirm Google email
                                </Button>
                            )}
                            onSuccess={resGoogleHandlerRegister}
                            onFailure={resGoogleHandlerRegister}
                            cookiePolicy={'single_host_origin'}
                        />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default Register;
