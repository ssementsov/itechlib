import React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../../styled-modal';
import { useFormik } from 'formik';
import { DatePeriodForm } from '../../../common/UI/date-period-form/date-period-form';
import { add, parseISO } from 'date-fns';

export const ProlongateReadingModal = (props) => {
    const { onProlongate, open, onClose, bookingInfo } = props;
    const bookingId = bookingInfo.id;
    const startDate = parseISO(bookingInfo.startDate);

    const minDate = add(new Date(), {
        days: 1,
    });
    const maxDate = add(startDate, {
        months: 1,
    });

    const initValue = {
        startDate: bookingInfo.startDate,
        finishDate: null,
    };

    function validate(value) {
        let error = {};
        if (!value.finishDate) {
            error.finishDate = 'Date is required';
        }
        return error;
    }

    const formik = useFormik({
        initialValues: initValue,
        validate,
        onSubmit: async (values, actions) => {
            actions.resetForm({
                values: initValue,
            });
            onProlongate(bookingId, values.finishDate);
        },
    });

    return (
        <StyledModal open={open} onClose={onClose}>
            <DatePeriodForm
                formik={formik}
                onClose={onClose}
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
    startDate: PropTypes.string
};
