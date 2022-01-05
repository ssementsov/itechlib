import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DatePicker from '@mui/lab/DatePicker';
import { add } from 'date-fns';

const BoxForDate = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  mt: 1,
  [theme.breakpoints.down('md')]: {
    justifyContent: 'center',
    alignItems: 'space-between',
    flexWrap: 'wrap',
    '& .MuiTextField-root': {
      width: '100%',
      marginTop: '10px',
    },
  },
}));

const AssignBookModal = ({ handleClose }) => {
  const maxDate = add(new Date(), {
    months: 1,
  });

  function validate(value) {
    let error = {};
    if (!value.finishDate) {
      error.finishDate = 'Date is required';
    }

    return error;
  }

  const formik = useFormik({
    initialValues: {
      startDate: new Date(),
      finishDate: null,
    },
    validate,
    onSubmit: async (values) => {
      assign(values);
      handleClose();
    },
  });

  const assign = (v) => {
    console.log(v);
  };
  return (
    <>
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
              formik.setFieldValue('startDate', value);
            }}
            value={formik.values.startDate}
            label="from"
            renderInput={(params) => (
              <TextField
                sx={{
                  width: '200px',
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
              formik.setFieldValue('finishDate', value);
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
                  width: '200px',
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
            onClick={handleClose}
            fullWidth
            size="large"
            sx={{
              my: '20px',
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: 'primary',
            }}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </>
  );
};

AssignBookModal.propTypes = {
  handleClose: PropTypes.func,
  deleteBook: PropTypes.func,
};

export default AssignBookModal;
