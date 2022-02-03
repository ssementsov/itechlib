import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { categories } from './add-edit-book/datas-for-form-options/categories';
import { languages } from './add-edit-book/datas-for-form-options/languages';
import { statuses } from './add-edit-book/datas-for-form-options/statuses';
import HiddenForm from './add-edit-book/hidden-form';
import { bookStatus } from '../../common/constants/status-constants';

const createOptions = (option) => {
    return (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
    );
};

const MultipurposeBookForm = ({ formik, title, buttonName, isSuggestForm }) => {
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
                label={isSuggestForm ? 'Author' : 'Author*'}
                margin="dense"
                name="author"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.author}
                variant="outlined"
            />
            <TextField
                error={Boolean(
                    formik.touched.category && formik.errors.category
                )}
                fullWidth
                helperText={formik.touched.category && formik.errors.category}
                name="category"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                margin="dense"
                label={isSuggestForm ? 'Category' : 'Category*'}
                select
                value={formik.values.category}
                variant="outlined"
            >
                {categories.map(createOptions)}
            </TextField>
            <TextField
                error={Boolean(
                    formik.touched.language && formik.errors.language
                )}
                fullWidth
                helperText={formik.touched.language && formik.errors.language}
                name="language"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                margin="dense"
                label={isSuggestForm ? 'Language' : 'Language*'}
                select
                value={formik.values.language}
                variant="outlined"
            >
                {languages.map(createOptions)}
            </TextField>
            {!isSuggestForm ? (
                <TextField
                    error={Boolean(
                        formik.touched.description && formik.errors.description
                    )}
                    fullWidth
                    helperText={
                        formik.touched.description && formik.errors.description
                    }
                    label="Description*"
                    multiline
                    margin="dense"
                    name="description"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    variant="outlined"
                />
            ) : (
                <TextField
                    error={Boolean(
                        formik.touched.comment && formik.errors.comment
                    )}
                    fullWidth
                    helperText={formik.touched.comment && formik.errors.comment}
                    label="Comment"
                    multiline
                    margin="dense"
                    name="comment"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.comment}
                    variant="outlined"
                />
            )}
            <TextField
                error={Boolean(formik.touched.link && formik.errors.link)}
                fullWidth
                helperText={formik.touched.link && formik.errors.link}
                label="Link to external website"
                margin="dense"
                name="link"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.link}
                variant="outlined"
            />
            {!isSuggestForm && (
                <TextField
                    error={Boolean(
                        formik.touched.status && formik.errors.status
                    )}
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
            )}
            {formik.values.status === bookStatus.inUse.name && (
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

MultipurposeBookForm.propTypes = {
    formik: PropTypes.object,
    buttonName: PropTypes.string,
    title: PropTypes.string,
    isSuggestForm: PropTypes.bool,
};

export default MultipurposeBookForm;
