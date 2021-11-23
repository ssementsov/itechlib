import React, { useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { Box, TextField } from '@mui/material'

const DatePickerForForm = ({ placeholder }) => {
  const [value, setValue] = useState(null)
  const handleDateChange = (newValue) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label={placeholder}
          value={value}
          onChange={handleDateChange}
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
  )
}

export default DatePickerForForm
