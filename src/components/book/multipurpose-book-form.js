import React from 'react';
import PropTypes from 'prop-types';
import { Box, FormControlLabel, MenuItem, RadioGroup, Tooltip, Typography, Zoom } from '@mui/material';
import { categories } from './add-edit-book/datas-for-form-options/categories';
import { languages } from './add-edit-book/datas-for-form-options/languages';
import { statuses } from './add-edit-book/datas-for-form-options/statuses';
import HiddenForm from './add-edit-book/hidden-form';
import { bookStatus } from '../../common/constants';
import { UploadBookCoverField } from './upload-book-cover-field';
import { NoAutocompleteForm, PrimaryButton, StyledTextField } from '../../common/UI';
import { useTheme } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import { useSelector } from 'react-redux';

const createOptions = (option) => {
    return (
        <MenuItem key={option.value} value={option.value}>
            {option.label}
        </MenuItem>
    );
};

const MultipurposeBookForm = (props) => {
    const { formik, title, buttonName, isSuggestForm, inEditMode = false } = props;
    const theme = useTheme();
    const isLoadingButton = useSelector(state => state.loadingStatus.isLoadingButton);

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
                    color='textPrimary'
                    variant='h4'
                    textAlign='center'
                    sx={{ mt: 2, mb: 2 }}
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
                </Box>
            </Box>

            <NoAutocompleteForm onSubmit={formik.handleSubmit}>
                <StyledTextField
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    label='Title*'
                    name='title'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <StyledTextField
                    error={Boolean(formik.touched.author && formik.errors.author)}
                    helperText={formik.touched.author && formik.errors.author}
                    label={isSuggestForm ? 'Author' : 'Author*'}
                    name='author'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.author}
                />
                <StyledTextField
                    error={Boolean(formik.touched.category && formik.errors.category)}
                    helperText={formik.touched.category && formik.errors.category}
                    name='category'
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
                    name='language'
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
                        label='Description*'
                        multiline
                        name='description'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                ) : (
                    <StyledTextField
                        error={Boolean(formik.touched.comment && formik.errors.comment)}
                        helperText={formik.touched.comment && formik.errors.comment}
                        label='Comment'
                        multiline
                        name='comment'
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                    />
                )}
                <StyledTextField
                    error={Boolean(formik.touched.link && formik.errors.link)}
                    helperText={formik.touched.link && formik.errors.link}
                    label='Link to external website'
                    name='link'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.link || ''}
                />
                {!isSuggestForm && (
                    <RadioGroup
                        name='status'
                        value={formik.values.status}
                        onChange={formik.handleChange}
                    >
                        {statuses.map((status) => {
                            if (status.value === bookStatus.inUse.name && inEditMode) return null;

                            return (
                                <Tooltip
                                    key={status.label}
                                    title={status.title}
                                    placement='top-end'
                                    TransitionComponent={Zoom}
                                    arrow
                                    componentsProps={{
                                        tooltip: {
                                            sx: {
                                                fontSize: theme.typography.body2,
                                            },
                                        },
                                    }}
                                >
                                    <FormControlLabel
                                        value={status.value}
                                        control={<Radio />}
                                        label={status.label}
                                        labelPlacement='end'
                                        sx={{ fontSize: theme.typography.body1 }}
                                    />
                                </Tooltip>
                            );
                        })}
                    </RadioGroup>
                )}

                {formik.values.status === bookStatus.inUse.name && !inEditMode && (
                    <HiddenForm formik={formik} />
                )}
                {!isSuggestForm && !inEditMode && <UploadBookCoverField formik={formik} />}
                <Box sx={{ py: 2 }}>
                    <PrimaryButton
                        loadingButton
                        loading={isLoadingButton}
                        title={buttonName}
                        type='submit'
                    />
                </Box>
            </NoAutocompleteForm>
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
