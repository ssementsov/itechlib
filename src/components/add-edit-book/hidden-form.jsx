import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from '@mui/lab/DatePicker';
import { Box, TextField, Typography } from '@mui/material';
import { readers } from './datas-for-form-options/readers';
import { sub, add } from 'date-fns';

const HiddenForm = ({ formik, createOptions }) => {
  const minDate = sub(new Date(), {
    years: 1,
  });
  const maxDate = add(new Date(), {
    months: 1,
  });
  return (
    <Box>
      <TextField
        error={Boolean(formik.touched.reader && formik.errors.reader)}
        fullWidth
        helperText={formik.touched.reader && formik.errors.reader}
        name="reader"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="dense"
        label="Reader*"
        select
        value={formik.values.reader}
        variant="outlined"
      >
        {readers.map(createOptions)}
      </TextField>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 1,
        }}
      >
        <Typography
          color="textSecondary"
          variant="boby1"
          alignSelf="center"
          marginLeft="15px"
        >
          In use*
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <DatePicker
            minDate={minDate}
            maxDate={new Date()}
            name="startDate"
            onChange={(value) => {
              formik.setFieldValue('startDate', value);
            }}
            value={formik.values.startDate}
            label="from"
            renderInput={(params) => (
              <TextField
                error={Boolean(
                  formik.touched.startDate && formik.errors.startDate
                )}
                helperText={formik.touched.startDate && formik.errors.startDate}
                sx={{
                  width: '150px',
                }}
                {...params}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
                  width: '150px',
                }}
                {...params}
              />
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

HiddenForm.propTypes = {
  formik: PropTypes.object,
  createOptions: PropTypes.func,
};

export default HiddenForm;
