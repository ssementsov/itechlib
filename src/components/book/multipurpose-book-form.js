import React from 'react';
import PropTypes from 'prop-types';
import { Box, MenuItem, TextField, Typography } from '@mui/material';
import { categories } from './add-edit-book/datas-for-form-options/categories';
import { languages } from './add-edit-book/datas-for-form-options/languages';
import { statuses } from './add-edit-book/datas-for-form-options/statuses';
import HiddenForm from './add-edit-book/hidden-form';
import { bookStatus } from '../../common/constants/book-status-constants';
import { UploadBookCoverField } from './upload-book-cover-field';
import { PrimaryButton } from '../../common/UI/buttons/primary-button';
import { CloseIcon } from '../../icons/close-icon';
import { useTheme } from '@mui/material/styles';

const createOptions = (option) => {
    if (option.value === 'IN USE') return null;
    return (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
    );
};

const StyledTextField = (props) => {
    const {children, ...rest} = props;
    return (
        <TextField
            fullWidth
            margin="dense"
            name="title"
            variant="outlined"
            {...rest}
        >
            {children}
        </TextField>
    )
};

const MultipurposeBookForm = (props) => {
    const { formik, title, buttonName, isSuggestForm, inEditMode = false, onClose } = props;
    const theme = useTheme();
    return (
        <>
            <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    paddingTop: theme.spacing(2),
                    backgroundColor: theme.palette.background.paper,
                    zIndex: theme.zIndex.modal,
                    width: '100%',
                }}
            >
                <Typography
                    color="textPrimary"
                    variant="h4"
                    textAlign="center"
                    sx={{
                        mt: 2,
                        mb: 2,
                    }}
                >
                    {title}
                </Typography>
                <Box
                    sx={{
                        position: 'absolute',
                        cursor: 'pointer',
                        right: 0,
                        top: 22,
                        [theme.breakpoints.down('md')]: {
                            right: -12,
                        },
                    }}
                >
                    <CloseIcon onClick={onClose} />
                </Box>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <StyledTextField
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    label="Title*"
                    name="title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <StyledTextField
                    error={Boolean(formik.touched.author && formik.errors.author)}
                    helperText={formik.touched.author && formik.errors.author}
                    label={isSuggestForm ? 'Author' : 'Author*'}
                    name="author"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.author}
                />
                <StyledTextField
                    error={Boolean(formik.touched.category && formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                    name="category"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={isSuggestForm ? 'Category' : 'Category*'}
                    select
                    value={formik.values.category}
                >
                    {categories.map(createOptions)}
                </StyledTextField>
                <StyledTextField
                    error={Boolean(formik.touched.language && formik.errors.language)}
                    helperText={formik.touched.language && formik.errors.language}
                    name="language"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    label={isSuggestForm ? 'Language' : 'Language*'}
                    select
                    value={formik.values.language}
                >
                    {languages.map(createOptions)}
                </StyledTextField>
                {!isSuggestForm ? (
                    <StyledTextField
                        error={Boolean(formik.touched.description && formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                        label="Description*"
                        multiline
                        name="description"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                ) : (
                    <StyledTextField
                        error={Boolean(formik.touched.comment && formik.errors.comment)}
                        helperText={formik.touched.comment && formik.errors.comment}
                        label="Comment"
                        multiline
                        name="comment"
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                    />
                )}
                <StyledTextField
                    error={Boolean(formik.touched.link && formik.errors.link)}
                    helperText={formik.touched.link && formik.errors.link}
                    label="Link to external website"
                    name="link"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.link}
                />
                {!isSuggestForm && (
                    <StyledTextField
                        error={Boolean(formik.touched.status && formik.errors.status)}
                        helperText={formik.touched.status && formik.errors.status}
                        name="status"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        label="Status*"
                        select
                        value={formik.values.status}
                    >
                        {statuses.map(createOptions)}
                    </StyledTextField>
                )}

                {formik.values.status === bookStatus.inUse.name && (
                    <HiddenForm formik={formik} createOptions={createOptions} />
                )}
                {!isSuggestForm && !inEditMode && <UploadBookCoverField formik={formik} />}
                <Box sx={{ py: 2 }}>
                    <PrimaryButton
                        title={buttonName}
                        type="submit"
                        disabled={formik.isSubmitting}
                    />
                </Box>
            </form>
        </>
    );
};

MultipurposeBookForm.propTypes = {
    formik: PropTypes.object,
    buttonName: PropTypes.string,
    title: PropTypes.string,
    isSuggestForm: PropTypes.bool,
    inEditMode: PropTypes.bool,
};

export default MultipurposeBookForm;
