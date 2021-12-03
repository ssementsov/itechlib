import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFormik } from 'formik'
import { Box, Button, Container, TextField, Typography } from '@mui/material'

const Register = () => {
  const router = useRouter()

  function validate(value) {
    let arrOfEmail = [
      'misha.mishin@itechart-group.com',
      'ivan.ivanov@itechart-group.com',
      'andrei.andreev@itechart-group.com',
    ]
    let error = {}
    if (!value.email) {
      error.email = 'Email is required'
    } else if (!/^[A-Z0-9._%+-]+@itechart-group.com/i.test(value.email)) {
      error.email = 'Please enter correct iTechArt email'
    } else if (!arrOfEmail.includes(value.email)) {
      error.email = 'Your email is not registered yet'
    }
    return error
  }
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validate,
    onSubmit: () => {
      router.push('/login')
    },
  })
  useEffect(() => {
    let userName = localStorage.getItem('UserName')
    if (userName) {
      router.replace('/main-catalogue')
    }
  })
  return (
    <>
      <Head>
        <title>Register</title>
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
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                mt: 3,
                mb: 6,
              }}
            >
              <Typography color="textPrimary" variant="h4" textAlign="center">
                Please enter Your iTechArt email
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <Box
              sx={{
                mt: 1,
                mb: 6,
              }}
            >
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  )
}

export default Register
