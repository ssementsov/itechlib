import StyledModal from '../../styled-modal';
import { Box, Typography } from '@mui/material';
import { PrimaryButton, StyledTextField } from '../../../common/UI';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { isRequired, mustBeLessSymbols, mustBeMoreSymbols } from '../../../common/constants';

const DeclineBookingModal = (props) => {
    const { onDecline, onClose, open, isLoadingButton } = props;

    const initValue = { declineReason: '' };
    const formik = useFormik({
        initialValues: initValue,
        validationSchema: Yup.object({
            declineReason: Yup.string()
                .trim()
                .min(10, mustBeMoreSymbols('Decline reason', 10))
                .max(250, mustBeLessSymbols('Decline reason', 250))
                .required(isRequired('Decline reason')),
        }),
        onSubmit: (values, actions) => {
            actions.resetForm({
                values: initValue,
            });
            onDecline(values.declineReason)
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
                    error={Boolean(formik.touched.declineReason && formik.errors.declineReason)}
                    helperText={formik.touched.declineReason && formik.errors.declineReason}
                    label='Decline reason*'
                    name='declineReason'
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.declineReason}
                    multiline
                />
                <Box sx={{ py: 2 }}>
                    <PrimaryButton
                        loadingButton
                        loading={isLoadingButton}
                        disabled={!formik.values.declineReason}
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