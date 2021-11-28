import React from 'react'
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material'
import { cathegories } from './datas-for-form-options/cathegories'
import { languages } from './datas-for-form-options/languages'
import { statuses } from './datas-for-form-options/statuses'
import HiddenForm from './HiddenForm'

const createOptions = (option) => {
  return (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  )
}

const AddNewBookForm = ({ formik }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ my: 3 }}>
        <Typography color="textPrimary" variant="h4" textAlign="center">
          Add New Book
        </Typography>
      </Box>
      <TextField
        error={Boolean(formik.touched.title && formik.errors.title)}
        fullWidth
        helperText={formik.touched.title && formik.errors.title}
        label="Title*"
        margin="dense"
        name="title"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.title}
        variant="outlined"
      />
      <TextField
        error={Boolean(formik.touched.author && formik.errors.author)}
        fullWidth
        helperText={formik.touched.author && formik.errors.author}
        label="Author*"
        margin="dense"
        name="author"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.author}
        variant="outlined"
      />
      <TextField
        error={Boolean(formik.touched.category && formik.errors.category)}
        fullWidth
        helperText={formik.touched.category && formik.errors.category}
        name="category"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="dense"
        label="Category*"
        select
        value={formik.values.category}
        variant="outlined"
      >
        {cathegories.map(createOptions)}
      </TextField>
      <TextField
        error={Boolean(formik.touched.languages && formik.errors.languages)}
        fullWidth
        helperText={formik.touched.languages && formik.errors.languages}
        name="languages"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="dense"
        label="Language*"
        select
        value={formik.values.languages}
        variant="outlined"
      >
        {languages.map(createOptions)}
      </TextField>
      <TextField
        error={Boolean(formik.touched.description && formik.errors.description)}
        fullWidth
        helperText={formik.touched.description && formik.errors.description}
        label="Description*"
        multiline
        margin="dense"
        name="description"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.description}
        variant="outlined"
      />
      <TextField
        error={Boolean(formik.touched.linkToWeb && formik.errors.linkToWeb)}
        fullWidth
        helperText={formik.touched.linkToWeb && formik.errors.linkToWeb}
        label="Link to external website"
        margin="dense"
        name="linkToWeb"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.linkToWeb}
        variant="outlined"
      />
      <TextField
        error={Boolean(formik.touched.status && formik.errors.status)}
        fullWidth
        helperText={formik.touched.status && formik.errors.status}
        name="status"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="dense"
        label="Status*"
        select
        value={formik.values.status}
        variant="outlined"
      >
        {statuses.map(createOptions)}
      </TextField>
      {formik.values.status === 'in use' && (
        <HiddenForm formik={formik} createOptions={createOptions} />
      )}

      <Box sx={{ py: 2 }}>
        <Button
          color="primary"
          disabled={formik.isSubmitting}
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Add
        </Button>
      </Box>
    </form>
  )
}

export default AddNewBookForm
