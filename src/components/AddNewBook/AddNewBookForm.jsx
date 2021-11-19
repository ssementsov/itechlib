import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { cathegories } from "./datas-for-form-options/cathegories";
import { languages } from "./datas-for-form-options/languages";
import { statuses } from "./datas-for-form-options/statuses";

const createOptions = (option) => {
  if (option.defaultValue === "") {
    return (
      <option
        key={option.defaultValue}
        value={option.defaultValue}
        disabled={option.disabled}
      >
        {option.defaultLabel}
      </option>
    );
  } else {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    );
  }
};

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
        error={Boolean(formik.touched.сathegory && formik.errors.сathegory)}
        fullWidth
        helperText={formik.touched.сathegory && formik.errors.сathegory}
        name="сathegory"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="dense"
        select
        SelectProps={{ native: true }}
        value={formik.values.сathegory}
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
        select
        SelectProps={{ native: true }}
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
        select
        SelectProps={{ native: true }}
        value={formik.values.status}
        variant="outlined"
      >
        {statuses.map(createOptions)}
      </TextField>
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
  );
};

export default AddNewBookForm;
