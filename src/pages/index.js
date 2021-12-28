import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { GoogleLogin } from "react-google-login";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { apiUsers } from "../api/users";
import { withSnackbar } from "notistack";
import jwt_decode from "jwt-decode";
import { ROOT_PATH, LOGIN_PATH } from "../common/constants/route-constants";

const Register = ({ enqueueSnackbar }) => {
  let router = useRouter();
  const [disabledGoogle, setDisabledGoogle] = useState(true);
  const [disabledCorp, setDisabledCorp] = useState(false);

  function validate(value) {
    let error = {};
    if (!value.email) {
      error.email = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@itechart-group.com/i.test(value.email)) {
      error.email = "Please enter correct iTechArt email";
    }
    return error;
  }
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (value) => {
      apiUsers
        .postCorp(value.email)
        .then(() => {
          setDisabledCorp(true);
          setDisabledGoogle(false);
          localStorage.setItem("corpEmail", value.email);
        })
        .catch(() => {
          enqueueSnackbar("Your corporate email is not registered.", {
            variant: "error",
          });
        });
    },
  });

  const responseGoogle = (res) => {
    let token = res.tokenId;
    const responsePayload = jwt_decode(token);
    let googleEmail = responsePayload.email;
    let corpEmail = localStorage.getItem("corpEmail");

    apiUsers
      .postCreds({
        corpEmail: corpEmail,
        googleEmail: googleEmail,
      })
      .then((res) => {
        console.log(res);
        setDisabledGoogle(true);
        enqueueSnackbar(
          "A letter with instructions has been sent to your Google mailbox. To log in please follow the link in the email.",
          {
            variant: "success",
          }
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (router.asPath !== ROOT_PATH) {
      apiUsers
        .getGoogle(router.query)
        .then(() => router.replace(LOGIN_PATH))
        .catch(() => {
          enqueueSnackbar("Something went wrong... Please retry.", {
            variant: "error",
          });
        });
    }
  }, [enqueueSnackbar, router, router.query]);

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            border: "1px solid #838E9F",
            boxShadow: "2px 2px 4px #838E9F",
            borderRadius: "25px",
          }}
        >
          <form onSubmit={formik.handleSubmit}>
            <Box
              sx={{
                mt: 3,
                mb: 3,
              }}
            >
              <Typography color="textPrimary" variant="h4" textAlign="center">
                Sign up
              </Typography>
            </Box>
            <TextField
              disabled={disabledCorp}
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
                mt: 3,
                mb: 2,
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
                Confirm corporate email
              </Button>
            </Box>
          </form>
          <Box
            sx={{
              mt: 1,
              mb: 6,
            }}
          >
            <GoogleLogin
              clientId={process.env.GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  fullWidth
                  color="error"
                  onClick={renderProps.onClick}
                  disabled={disabledGoogle}
                  size="large"
                  variant="contained"
                >
                  Confirm Google email
                </Button>
              )}
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withSnackbar(Register);
