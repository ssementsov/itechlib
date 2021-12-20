import React from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { categories } from "./datas-for-form-options/categories";
import { languages } from "./datas-for-form-options/languages";
import { statuses } from "./datas-for-form-options/statuses";
import HiddenForm from "./HiddenForm";
import { status } from "../../common/constants/status-constants";

const createOptions = (option) => {
  return (
    <MenuItem key={option.value} value={option.value}>
      {option.label}
    </MenuItem>
  );
};

const AddNewBookForm = ({ formik, title, buttonName }) => {
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ my: 3 }}>
        <Typography color="textPrimary" variant="h4" textAlign="center">
          {title}
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
        {categories.map(createOptions)}
      </TextField>
      <TextField
        error={Boolean(formik.touched.language && formik.errors.language)}
        fullWidth
        helperText={formik.touched.language && formik.errors.language}
        name="language"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        margin="dense"
        label="Language*"
        select
        value={formik.values.language}
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
      {formik.values.status === status.inUse && (
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
          {buttonName}
        </Button>
      </Box>
    </form>
  );
};

export default AddNewBookForm;
