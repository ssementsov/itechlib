import React from "react";
import { useFormik } from "formik";
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

const ReturnBookModal = ({ isOpenReturn, toggleReturn }) => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      feedback: "",
    },
    onSubmit: async () => {
      toggleReturn();
    },
  });

  return (
    <>
      <Modal open={isOpenReturn} onClose={toggleReturn}>
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
                      name="rating"
                      type="number"
                      value={formik.values.rating}
                      hidden
                      readOnly
                    />
                    <Rating
                      name="rating"
                      value={Number(formik.values.rating)}
                      size="middle"
                      precision={0.5}
                      onChange={formik.handleChange}
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
                fullWidth
                label="Feedback"
                margin="dense"
                name="feedback"
                onChange={formik.handleChange}
                value={formik.values.feedback}
                variant="outlined"
              />
            </Box>
            <Box sx={{ py: 2, mt: 4 }}>
              <Button
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
              <Button
                onClick={toggleReturn}
                fullWidth
                size="large"
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
