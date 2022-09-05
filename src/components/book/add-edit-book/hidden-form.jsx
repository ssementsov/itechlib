/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import DatePicker from '@mui/lab/DatePicker';
import {Box, MenuItem, TextField, Typography} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {useSelector} from 'react-redux';
import {add, sub} from 'date-fns';

const createReadersSelectorOptions = (reader, user) => {
    const userFullName = `${user.name} + ' ' + ${user.surname}`;
    const readerFullName = `${reader.name} + ' ' + ${reader.surname}`;

    if (userFullName === readerFullName) return;

    return (
        <MenuItem key={reader.id} value={reader.id}>
            {reader.name + ' ' + reader.surname}
        </MenuItem>
    );
};
export const minDate = sub(new Date(), {years: 1});
export const maxDate = add(new Date(), {months: 1});

const HiddenForm = ({formik}) => {
    const theme = useTheme();
    const readers = useSelector(state => state.lists.usersList);
    const user = useSelector(state => state.user.user);

    useEffect(() => {
        formik.setFieldValue('reader', '');
        formik.setFieldValue('startDate', null);
        formik.setFieldValue('finishDate', null);

        formik.setFieldTouched('reader', false, false);
        formik.setFieldTouched('startDate', false, false);
        formik.setFieldTouched('finishDate', false, false);
    }, []);

    return (
        <Box>
            <TextField
                error={Boolean(formik.touched.reader && formik.errors.reader)}
                fullWidth
                helperText={formik.touched.reader && formik.errors.reader}
                name='reader'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                margin='dense'
                label='Reader*'
                select
                value={formik.values.reader}
                variant='outlined'
            >
                {readers.map(reader => createReadersSelectorOptions(reader, user))}
            </TextField>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mt: 1,
                    mb: 1.5,
                    [theme.breakpoints.down('md')]: {
                        flexDirection: 'column',
                        alignItems: 'center',
                    },
                }}
            >
                <Typography
                    color='textSecondary'
                    variant='boby1'
                    alignSelf='center'
                    marginLeft='15px'
                    sx={{
                        [theme.breakpoints.down('md')]: {mb: 1},
                    }}
                >
                    In use*
                </Typography>
                <DatePicker
                    minDate={minDate}
                    maxDate={new Date()}
                    name='startDate'
                    onChange={(value) => {
                        formik.setFieldValue('startDate', value);
                    }}
                    value={formik.values.startDate}
                    label='from'
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(formik.touched.startDate && formik.errors.startDate)}
                            helperText={formik.touched.startDate && formik.errors.startDate}
                            onBlur={() => {
                                formik.setFieldTouched('startDate', true);
                            }}
                            onChange={(value) => {
                                formik.setFieldTouched('startDate', true, !!value);
                            }}
                            sx={{
                                width: '170px',
                                [theme.breakpoints.down('md')]: {
                                    width: '100%',
                                },
                            }}
                        />
                    )}
                />
                <DatePicker
                    minDate={new Date()}
                    maxDate={maxDate}
                    name='finishDate'
                    onChange={(value) => {
                        formik.setFieldValue('finishDate', value);
                    }}
                    value={formik.values.finishDate}
                    label='till'
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            error={Boolean(
                                formik.touched.finishDate && formik.errors.finishDate,
                            )}
                            helperText={formik.touched.finishDate && formik.errors.finishDate}
                            onBlur={() => {
                                formik.setFieldTouched('finishDate', true);
                            }}
                            onChange={(value) => {
                                formik.setFieldTouched('finishDate', true, !!value);
                            }}
                            sx={{
                                width: '170px',
                                [theme.breakpoints.down('md')]: {
                                    width: '100%',
                                },
                            }}
                        />
                    )}
                />
            </Box>
        </Box>
    );
};

HiddenForm.propTypes = {
    formik: PropTypes.object,
};

export default HiddenForm;
