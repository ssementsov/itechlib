import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { ReadOnlyDatePicker } from '../read-only-date-picker';
import { useSelector } from 'react-redux';
import { PrimaryButton } from '../buttons/primary-button';

const BoxForDate = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    mt: 1,
    width: '500px',
    [theme.breakpoints.down('md')]: {
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'space-between',
        flexWrap: 'wrap',
        '& .MuiTextField-root': {
            width: '100%',
            marginTop: '10px',
        },
    },
}));

export const DatePeriodForm = (props) => {
    const { title, formik, onClose, minDate, maxDate } = props;
    const isLoadingButton = useSelector(state => state.loadingStatus.isLoadingButton);

    return (
        <>
            <Box sx={{ my: 3 }}>
                <Typography color='textPrimary' variant='h4' textAlign='center'>
                    {title}
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <BoxForDate>
                    <ReadOnlyDatePicker
                        onChange={(value) => {
                            formik.setFieldValue('startDate', value);
                        }}
                        datePickerProps={{
                            disabled: true,
                            name: 'startDate',
                            value: formik.values.startDate,
                            label: 'from',
                        }}
                        textFieldProps={{ sx: { width: '200px' } }}
                    />
                    <ReadOnlyDatePicker
                        onChange={(value) => {
                            formik.setFieldValue('finishDate', value);
                        }}
                        datePickerProps={{
                            minDate: minDate,
                            maxDate: maxDate,
                            name: 'finishDate',
                            value: formik.values.finishDate,
                            label: 'till',
                            PaperProps: { sx: { mt: '-50px' } },
                        }}
                        textFieldProps={{
                            error: Boolean(formik.touched.finishDate && formik.errors.finishDate),
                            helperText: formik.touched.finishDate && formik.errors.finishDate,
                            sx: { width: '200px' },
                        }}
                    />
                </BoxForDate>
                <Box sx={{ py: 2, mt: 4 }}>
                    <PrimaryButton
                        loadingButton
                        loading={isLoadingButton}
                        title={'Ok'}
                        type='submit'
                    />
                    <Button
                        onClick={onClose}
                        fullWidth
                        size='large'
                        sx={{
                            my: '20px',
                            borderWidth: '1px',
                            borderStyle: 'solid',
                            borderColor: 'primary',
                        }}
                    >
                        Cancel
                    </Button>
                </Box>
            </form>
        </>
    );
};

DatePeriodForm.propTypes = {
    title: PropTypes.string.isRequired,
    formik: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
};
