import React from 'react';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { Box, Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import DatePicker from '@mui/lab/DatePicker';
import { add } from 'date-fns';
import { Booking } from './../../models/booking-model';
import { apiBookings } from './../../api/bookings';
import { withSnackbar } from 'notistack';

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

const AssignBookModal = ({
  enqueueSnackbar,
  handleClose,
  book,
  updateInfo,
}) => {
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

  const assign = ({ startDate, finishDate }) => {
    const booking = new Booking(0, book.id, startDate, finishDate);
    const token = localStorage.getItem('token');
    apiBookings
      .postBooking(booking, token)
      .then((res) => {
        updateInfo(res.data.book);
        enqueueSnackbar('The book was assigned to you successfully!', {
          variant: 'success',
        });
      })
      .catch(() => {
        enqueueSnackbar('Something went wrong... Please retry.', {
          variant: 'error',
        });
      });
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
  updateInfo: PropTypes.func,
  handleClose: PropTypes.func,
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    language: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    link: PropTypes.string,
    status: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

export default withSnackbar(AssignBookModal);
