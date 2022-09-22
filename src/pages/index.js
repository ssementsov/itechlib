import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { GoogleLogin } from 'react-google-login';
import { Box, Container, TextField, Typography } from '@mui/material';
import { UserAPI } from '../api/user-api';
import jwt_decode from 'jwt-decode';
import {
    isRequired,
    LOGIN_PATH,
    MAIN_CATALOGUE_PATH,
    mustBeLessSymbols,
    mustBeMoreSymbols,
} from '../common/constants';
import { useCustomSnackbar } from '../utils/hooks/custom-snackbar-hook';
import { NoAutocompleteForm, PrimaryButton } from '../common/UI';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingButton } from '../store/reducers';

const Register = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [disabledGoogle, setDisabledGoogle] = useState(true);
    const [disabledCorp, setDisabledCorp] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();
    const isLoadingButton = useSelector(state => state.loadingStatus.isLoadingButton);

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
                .min(24, mustBeMoreSymbols('Email', 24))
                .max(50, mustBeLessSymbols('Email', 50)),
        }),
        validate,
        onSubmit: (value) => {
            dispatch(setLoadingButton(true));
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
                })
                .finally(() => dispatch(setLoadingButton(false)));
        },
    });

    const resGoogleHandlerRegister = (res) => {
        let token = res.tokenId;
        if (token) {
            const responsePayload = jwt_decode(token);
            let googleEmail = responsePayload.email;
            let corpEmail = localStorage.getItem('corpEmail');

            dispatch(setLoadingButton(true));
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
                            { variant: 'success' },
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
                            { variant: 'error' },
                        );
                    } else {
                        defaultErrorSnackbar();
                    }
                })
                .finally(() => dispatch(setLoadingButton(false)));
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
                        background: '#FFF'
                    }}
                >
                    <NoAutocompleteForm onSubmit={formik.handleSubmit}>
                        <Box sx={{ mt: 3, mb: 3 }}>
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
                        <Box sx={{ mt: 3, mb: 2 }}
                        >
                            <PrimaryButton
                                loadingButton
                                loading={isLoadingButton && disabledGoogle}
                                title={'Confirm corporate email'}
                                type='submit'
                                disabled={disabledCorp}
                            />
                        </Box>
                    </NoAutocompleteForm>
                    <Box sx={{ mt: 1, mb: 6 }}>
                        <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
                            render={(renderProps) => (
                                <PrimaryButton
                                    loadingButton
                                    loading={isLoadingButton && disabledCorp}
                                    fullWidth
                                    title={'Confirm Google email'}
                                    color='error'
                                    onClick={renderProps.onClick}
                                    disabled={disabledGoogle}
                                />
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
