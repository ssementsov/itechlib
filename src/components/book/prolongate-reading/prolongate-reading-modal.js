import React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../../styled-modal';
import { useFormik } from 'formik';
import { DatePeriodForm } from '../../../common/UI/date-period-form/date-period-form';
import { add, parseISO, sub } from 'date-fns';
import * as Yup from 'yup';
import {
    dateNotEarlierThan,
    dateNotLaterThan,
    FORMAT_DATE,
    INVALID_DATE,
    isRequired,
} from '../../../common/constants';

export const ProlongateReadingModal = (props) => {
    const { onProlongate, open, onClose, bookingInfo } = props;
    const bookingId = bookingInfo.id;
    const startDate = bookingInfo.startDate && parseISO(bookingInfo.startDate);
    const finishDate = bookingInfo.finishDate && parseISO(bookingInfo.finishDate);

    const minDate = finishDate;
    const maxDate = (startDate && add(startDate, { months: 1 })) || new Date();

    const initValue = {
        startDate: bookingInfo.startDate,
        finishDate: null,
    };

    function validate(value) {
        let error = {};

        if (!value.finishDate) {
            error.finishDate = isRequired('Date');
        }
        if (value.finishDate && value.finishDate.toString() === INVALID_DATE) {
            error.finishDate = FORMAT_DATE;
        }

        return error;
    }

    const formik = useFormik({
        initialValues: initValue,
        validationSchema: Yup.object({
            finishDate: Yup.date().min(minDate, dateNotEarlierThan(minDate)).max(maxDate, dateNotLaterThan(maxDate)),
        }),
        validate,
        onSubmit: async (values, actions) => {
            actions.resetForm({
                values: initValue,
            });
            onProlongate(bookingId, values.finishDate);
        },
    });

    //reset formik values
    const closeModalHandler = () => {
        formik.resetForm();
        onClose();
    };

    return (
        <StyledModal open={open} onClose={closeModalHandler}>
            <DatePeriodForm
                formik={formik}
                onClose={closeModalHandler}
                minDate={minDate}
                maxDate={maxDate}
                title={'Prolongate reading'}
            />
        </StyledModal>
    );
};

ProlongateReadingModal.propTypes = {
    onProlongate: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    startDate: PropTypes.string,
};
