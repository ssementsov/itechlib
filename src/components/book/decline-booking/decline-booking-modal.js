import StyledModal from '../../styled-modal';
import { Box, Typography } from '@mui/material';
import { PrimaryButton, StyledTextField } from '../../../common/UI';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { isRequired, mustBeLessSymbols, mustBeMoreSymbols } from '../../../common/constants';

const DeclineBookingModal = (props) => {
    const { onDecline, onClose, open, isLoadingButton } = props;

    const initValue = { declineReasone: '' };
    const formik = useFormik({
        initialValues: initValue,
        validationSchema: Yup.object({
            declineReasone: Yup.string()
                .trim()
                .min(10, mustBeMoreSymbols('Decline reasone', 10))
                .max(250, mustBeLessSymbols('Decline reasone', 250))
                .required(isRequired('Decline reasone')),
        }),
        onSubmit: (values, actions) => {
            actions.resetForm({
                values: initValue,
            });
            onDecline(values.declineReasone)
        },
    });

    //reset formik values
    const closeModalHandler = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <StyledModal open={open} onClose={closeModalHandler}>
            <Box sx={{ my: 3 }}>
                <Typography color='textPrimary' variant='h4' textAlign='center'>
                    Decline the book
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <StyledTextField
                    error={Boolean(formik.touched.declineReasone && formik.errors.declineReasone)}
                    helperText={formik.touched.declineReasone && formik.errors.declineReasone}
                    label='Decline reasone*'
                    name='declineReasone'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.declineReasone}
                    multiline
                />
                <Box sx={{ py: 2 }}>
                    <PrimaryButton
                        loadingButton
                        loading={isLoadingButton}
                        disabled={!formik.values.declineReasone}
                        title='Submit'
                        type='submit'
                    />
                </Box>
            </form>
        </StyledModal>
    );
};

DeclineBookingModal.propTypes = {
    onDecline: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isLoadingButton: PropTypes.bool,
};

export default DeclineBookingModal;