import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, FormControlLabel, Rating, TextField, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { NoAutocompleteForm, PrimaryButton, SecondaryButton, StyledModal } from '../../../common/UI';
import {
    mustBeLessSymbols,
    mustBeMoreSymbols,
    ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE,
    ONLY_ONE_WHITESPACE_ALLOWED_REGEX,
} from '../../../common/constants';
import { useSelector } from 'react-redux';

const ReturnBookModal = (props) => {
    const { open, onClose, onReturn } = props;
    const [isDisabledSubmit, setIsDisabledSubmit] = useState(true);
    const [isDisabledSkip, setIsDisabledSkip] = useState(false);
    const [rateValue, setRateValue] = useState(null);
    const [feedbackValue, setFeedbackValue] = useState(null);
    const isLoadingButton = useSelector(state => state.loadingStatus.isLoadingButton);
    const initValue = {
        rate: 0,
        feedback: '',
    };

    const handleClose = () => {
        formik.handleReset();
        onClose();
        setIsDisabledSubmit(true);
        setIsDisabledSkip(false);
    };

    const handleDisableButtons = (prevValue, newValue) => {
        if (prevValue || newValue) {
            setIsDisabledSubmit(false);
            setIsDisabledSkip(true);
        } else {
            setIsDisabledSubmit(true);
            setIsDisabledSkip(false);
        }
    };

    // eslint-disable-next-line no-unused-vars
    const handleChangeRate = (_e, newValue) => {
        formik.setFieldValue('rate', newValue);
        setRateValue(newValue);
        handleDisableButtons(newValue, feedbackValue);
    };

    const handleChangeFeedback = (e) => {
        let newValue = e.target.value;
        formik.setFieldValue('feedback', newValue);
        setFeedbackValue(newValue);
        handleDisableButtons(rateValue, newValue);
    };

    const formik = useFormik({
        initialValues: initValue,
        validationSchema: Yup.object({
            feedback: Yup.string()
                .trim()
                .min(10, mustBeMoreSymbols('Feedback', 10))
                .max(250, mustBeLessSymbols('Feedback', 250)),
        }),
        validate: (value) => {
            let error = {};
            if (ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.feedback)) {
                error.feedback = ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
            }
            return error;
        },
        onSubmit: async (values, actions) => {
            actions.resetForm({
                values: initValue,
            });
            onReturn({ feedback: values.feedback, rate: values.rate });
        },
    });

    return (
        <StyledModal open={open} onClose={handleClose}>
            <Box sx={{ my: 3 }}>
                <Typography color='textPrimary' variant='h4' textAlign='center'>
                    Please leave your feedback
                </Typography>
            </Box>
            <NoAutocompleteForm onSubmit={formik.handleSubmit}>
                <Box sx={{ mt: '50px' }}>
                    <FormControlLabel
                        label='Please rate the book'
                        labelPlacement='start'
                        sx={{ ml: 0 }}
                        control={
                            <Rating
                                name='rate'
                                value={formik.values.rate}
                                size='middle'
                                onChange={handleChangeRate}
                                sx={{ ml: 5 }}
                            />
                        }
                    />
                </Box>
                <Box sx={{ mt: 3 }}>
                    <TextField
                        error={Boolean(formik.touched.feedback && formik.errors.feedback)}
                        helperText={formik.touched.feedback && formik.errors.feedback}
                        onBlur={formik.handleBlur}
                        multiline
                        fullWidth
                        label='Feedback'
                        margin='dense'
                        name='feedback'
                        onChange={handleChangeFeedback}
                        value={formik.values.feedback}
                        variant='outlined'
                    />
                </Box>
                <Box sx={{ py: 2, mt: 4 }}>
                    <PrimaryButton
                        loadingButton
                        loading={isLoadingButton && isDisabledSkip}
                        title='Submit'
                        type='submit'
                        disabled={isDisabledSubmit}
                    />
                    <SecondaryButton
                        loadingButton
                        loading={isLoadingButton && isDisabledSubmit}
                        title='Skip'
                        type='submit'
                        disabled={isDisabledSkip}
                    />
                </Box>
            </NoAutocompleteForm>
        </StyledModal>
    );
};

ReturnBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onReturn: PropTypes.func.isRequired,
};

export default ReturnBookModal;
