import React from "react";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import DatePicker from "@mui/lab/DatePicker";
import { add } from "date-fns";
import StyledModal from "../../styled-modal";

const BoxForDate = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  mt: 1,
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    alignItems: "space-between",
    flexWrap: "wrap",
    "& .MuiTextField-root": {
      width: "100%",
      marginTop: "10px",
    },
  },
}));

const initValue = {
  startDate: new Date(),
  finishDate: null,
};
const maxDate = add(new Date(), {
  months: 1,
});

const AssignBookModal = (props) => {
  const { onAssign, open, onClose } = props;

  function validate(value) {
    let error = {};
    if (!value.finishDate) {
      error.finishDate = "Date is required";
    }
    return error;
  }

  const formik = useFormik({
    initialValues: initValue,
    validate,
    onSubmit: async (values, actions) => {
      actions.resetForm({
        values: initValue,
      });
      onAssign(values);
    },
  });

  return (
    <StyledModal open={open} onClose={onClose}>
      <Box sx={{ my: 3 }}>
        <Typography color="textPrimary" variant="h4" textAlign="center">
          To assign the book please specify period
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <BoxForDate>
          <DatePicker
            disabled
            name="startDate"
            onChange={(value) => {
              formik.setFieldValue("startDate", value);
            }}
            value={formik.values.startDate}
            label="from"
            renderInput={(params) => (
              <TextField
                sx={{
                  width: "200px",
                }}
                {...params}
              />
            )}
          />
          <DatePicker
            minDate={new Date()}
            maxDate={maxDate}
            name="finishDate"
            onChange={(value) => {
              formik.setFieldValue("finishDate", value);
            }}
            value={formik.values.finishDate}
            label="till"
            renderInput={(params) => (
              <TextField
                error={Boolean(
                  formik.touched.finishDate && formik.errors.finishDate
                )}
                helperText={
                  formik.touched.finishDate && formik.errors.finishDate
                }
                sx={{
                  width: "200px",
                }}
                {...params}
              />
            )}
          />
        </BoxForDate>
        <Box sx={{ py: 2, mt: 4 }}>
          <Button
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Ok
          </Button>
          <Button
            onClick={onClose}
            fullWidth
            size="large"
            sx={{
              my: "20px",
              borderWidth: "1px",
              borderStyle: "solid",
              borderColor: "primary",
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </StyledModal>
  );
};

AssignBookModal.propTypes = {
  onAssign: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignBookModal;
