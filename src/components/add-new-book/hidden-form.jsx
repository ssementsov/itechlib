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
            name="dateFrom"
            onChange={(value) => {
              formik.setFieldValue('dateFrom', value);
            }}
            value={formik.values.dateFrom}
            label="from"
            renderInput={(params) => (
              <TextField
                error={Boolean(
                  formik.touched.dateFrom && formik.errors.dateFrom
                )}
                helperText={formik.touched.dateFrom && formik.errors.dateFrom}
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
            name="dateTo"
            onChange={(value) => {
              formik.setFieldValue('dateTo', value);
            }}
            value={formik.values.dateTo}
            label="till"
            renderInput={(params) => (
              <TextField
                error={Boolean(formik.touched.dateTo && formik.errors.dateTo)}
                helperText={formik.touched.dateTo && formik.errors.dateTo}
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
