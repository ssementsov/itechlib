import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  FormControlLabel,
  Modal,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { withSnackbar } from "notistack";
import PropTypes from "prop-types";
import { apiBookings } from "../../api/bookings";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #838E9F",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.35)",
  borderRadius: "25px",
  pt: 2,
  px: 4,
  pb: 3,
  maxWidth: 580,
  overflowY: "auto",
  maxHeight: "95vh",
  "&:focus": {
    outline: "none",
  },
};

const ReturnBookModal = ({
  enqueueSnackbar,
  isOpenReturn,
  toggleReturn,
  assignHandler,
}) => {
  const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
  const [isDisabledSkip, setIsDisabledSkip] = useState(false);
  const initValue = {
    rate: 0,
    feedback: "",
  };

  const handleClose = () => {
    formik.handleReset();
    toggleReturn();
    setIsDisabledSubmit(true);
    setIsDisabledSkip(false);
  };

  const handleChange = (e) => {
    formik.handleChange(e);
    let value = e.target.value;
    if (value) {
      setIsDisabledSubmit(false);
      setIsDisabledSkip(true);
    } else {
      setIsDisabledSubmit(true);
      setIsDisabledSkip(false);
    }
  };

  const cancelBooking = (body) => {
    let bookingId = localStorage.getItem("bookingId");
    apiBookings
      .cancelBooking(bookingId, body)
      .then(() => {
        toggleReturn();
        assignHandler(false);
        enqueueSnackbar(
          !body.feedback && !body.rate
            ? "Your book was returned successfully!"
            : "Thank You for feedback. Read on!",
          {
            variant: "success",
          }
        );
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong. Please retry.", {
          variant: "error",
        });
      });
  };

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: Yup.object({
      feedback: Yup.string()
        .min(10, "Feedback must be more than 10 symbols")
        .max(150, "Feedback must be less than 150 symbols"),
    }),
    onSubmit: async (values, actions) => {
      actions.resetForm({
        values: initValue,
      });
      cancelBooking({ feedback: values.feedback, rate: Number(values.rate) });
    },
  });

  return (
    <>
      <Modal open={isOpenReturn} onClose={handleClose}>
        <Box sx={style}>
          <Box sx={{ my: 3 }}>
            <Typography color="textPrimary" variant="h4" textAlign="center">
              Please leave your feedback
            </Typography>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: "50px" }}>
              <FormControlLabel
                label="Please rate the book"
                labelPlacement="start"
                sx={{
                  ml: 0,
                }}
                control={
                  <>
                    <input
                      name="rate"
                      type="number"
                      value={formik.values.rate}
                      hidden
                      readOnly
                    />
                    <Rating
                      name="rate"
                      value={Number(formik.values.rate)}
                      size="middle"
                      onChange={handleChange}
                      sx={{
                        ml: 5,
                      }}
                    />
                  </>
                }
              />
            </Box>
            <Box
              sx={{
                mt: 3,
              }}
            >
              <TextField
                error={Boolean(
                  formik.touched.feedback && formik.errors.feedback
                )}
                helperText={formik.touched.feedback && formik.errors.feedback}
                onBlur={formik.handleBlur}
                multiline
                fullWidth
                label="Feedback"
                margin="dense"
                name="feedback"
                onChange={handleChange}
                value={formik.values.feedback}
                variant="outlined"
              />
            </Box>
            <Box sx={{ py: 2, mt: 4 }}>
              <Button
                disabled={isDisabledSubmit}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                disabled={isDisabledSkip}
                fullWidth
                size="large"
                type="submit"
                sx={{
                  my: "20px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "primary",
                }}
              >
                Skip
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

ReturnBookModal.propTypes = {
  isOpenReturn: PropTypes.bool,
};

export default withSnackbar(ReturnBookModal);
