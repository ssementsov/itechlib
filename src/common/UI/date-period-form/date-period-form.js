import { Box, Button, TextField, Typography } from '@mui/material';
import DatePicker from '@mui/lab/DatePicker';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

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
    const {title, formik, onClose, minDate, maxDate} = props;
    return (
        <>
            <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" textAlign="center">
                    {title}
                </Typography>
            </Box>
            <form onSubmit={formik.handleSubmit}>
                <BoxForDate>
                    <DatePicker
                        disabled
                        name="startDate"
                        onChange={(value) => {
                            formik.setFieldValue('startDate', value);
                        }}
                        value={formik.values.startDate}
                        label="from"
                        renderInput={(params) => (
                            <TextField
                                sx={{
                                    width: '200px',
                                }}
                                {...params}
                            />
                        )}
                    />
                    <DatePicker
                        minDate={minDate}
                        maxDate={maxDate}
                        name="finishDate"
                        onChange={(value) => {
                            formik.setFieldValue('finishDate', value);
                        }}
                        value={formik.values.finishDate}
                        label="till"
                        renderInput={(params) => (
                            <TextField
                                error={Boolean(
                                    formik.touched.finishDate && formik.errors.finishDate
                                )}
                                helperText={formik.touched.finishDate && formik.errors.finishDate}
                                sx={{
                                    width: '200px',
                                }}
                                {...params}
                            />
                        )}
                    />
                </BoxForDate>
                <Box sx={{ py: 2, mt: 4 }}>
                    <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Ok
                    </Button>
                    <Button
                        onClick={onClose}
                        fullWidth
                        size="large"
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
    maxDate: PropTypes.instanceOf(Date)
};
