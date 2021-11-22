import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Box, Button, Container, Grid, Typography } from '@mui/material'
import { GoogleLogin } from 'react-google-login'

const Login = () => {
  const router = useRouter()

  const responseGoogle = (response) => {
    console.log(response.tokenId)
    let userName = JSON.stringify(response.profileObj.givenName)
    localStorage.setItem('UserName', userName)
    router.push('/home')
  }

  useEffect(() => {
    let userName = localStorage.getItem('UserName')
    if (userName && (router.pathname === '/login' || router.pathname === '/')) {
      router.push('/home')
    }
  })

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
                Proceed with
              </Typography>
              <Typography color="textPrimary" variant="h4">
                Your Google account
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
                      Login with Google
                    </Button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
              </Grid>
            </Grid>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Login
