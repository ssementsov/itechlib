import React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../../styled-modal';
import { useFormik } from 'formik';
import { DatePeriodForm } from '../../../common/UI/date-period-form/date-period-form';
import { add } from 'date-fns';

const initValue = {
    startDate: new Date(),
    finishDate: null,
};

const minDate = add(new Date(), {
    days: 1,
});

const maxDate = add(new Date(), {
    months: 1,
});

export const ProlongateReadingModal = (props) => {
    const { onProlongate, open, onClose } = props;

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
            onProlongate(values);
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
};
