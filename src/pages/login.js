import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { MAIN_CATALOGUE_PATH } from '../common/constants/route-constants';
import { UserAPI } from '../api/user-api';
import { useTheme } from '@mui/material/styles';
import { withSnackbar } from 'notistack';
import jwt_decode from 'jwt-decode';
import { LOGIN_PATH } from '../common/constants/route-constants';
import { api } from '../api/api';

const Login = ({ enqueueSnackbar }) => {
  let theme = useTheme();
  const router = useRouter();
  const [correctEmail, setCorrectEmail] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const resGoogleHandlerLogin = (resFromGoogle) => {
    const responsePayload = jwt_decode(resFromGoogle.tokenId);
    localStorage.setItem('avatar', responsePayload.picture);

    let googleEmail = localStorage.getItem('googleEmail');
    if (resFromGoogle.profileObj.email === googleEmail) {
      UserAPI.auth(resFromGoogle)
        .then((res) => {
          localStorage.setItem('token', res.data);
          api.setupAuth(res.data);
          router.replace(MAIN_CATALOGUE_PATH);
        })
        .catch(() => {
          enqueueSnackbar('Something went wrong... Please retry.', {
            variant: 'error',
          });
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
          enqueueSnackbar('Something went wrong... Please retry.', {
            variant: 'error',
          });
        });
    }
  }, [enqueueSnackbar, router, router.query]);

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
                  clientId={process.env.GOOGLE_CLIENT_ID}
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

export default withSnackbar(Login);
