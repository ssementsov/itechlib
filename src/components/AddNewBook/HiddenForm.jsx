import React from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Box, TextField, Typography } from '@mui/material'
import { readers } from './datas-for-form-options/readers'
import { sub, add } from 'date-fns'

const HiddenForm = ({ formik, createOptions }) => {
  const minDate = sub(new Date(), {
    years: 1,
  })
  const maxDate = add(new Date(), {
    years: 1,
  })
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              minDate={minDate}
              error={Boolean(formik.touched.dateFrom && formik.errors.dateFrom)}
              helperText={formik.touched.dateFrom && formik.errors.dateFrom}
              name="dateFrom"
              onChange={(value) => {
                formik.setFieldValue('dateFrom', value)
              }}
              onBlur={formik.handleBlur}
              value={formik.values.dateFrom}
              label="from"
              renderInput={(params) => (
                <TextField
                  sx={{
                    border: '1px solid #E6E8F0',
                    borderRadius: '8px',
                    width: '150px',
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              maxDate={maxDate}
              error={Boolean(formik.touched.dateTo && formik.errors.dateTo)}
              helperText={formik.touched.dateTo && formik.errors.dateTo}
              name="dateTo"
              onChange={(value) => {
                formik.setFieldValue('dateTo', value)
              }}
              onBlur={formik.handleBlur}
              value={formik.values.dateTo}
              label="till"
              renderInput={(params) => (
                <TextField
                  sx={{
                    border: '1px solid #E6E8F0',
                    borderRadius: '8px',
                    width: '150px',
                  }}
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </Box>
    </Box>
  )
}

export default HiddenForm
