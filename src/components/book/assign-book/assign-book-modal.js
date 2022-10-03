import React from 'react';
import PropTypes from 'prop-types';
import { DatePeriodForm, StyledModal } from '../../../common/UI';
import { add } from 'date-fns';
import { isRequired } from '../../../common/constants';
import { useFormik } from 'formik';

const initValue = {
    startDate: new Date(),
    finishDate: null,
};
const minDatePickerDate = new Date();
const maxDate = add(new Date(), { months: 1 });

const AssignBookModal = (props) => {
    const { onAssign, open, onClose } = props;

    function validate(value) {
        let error = {};

        if (!value.finishDate) {
            error.finishDate = isRequired('Date');
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
            onAssign(values);
        },
    });

    return (
        <StyledModal open={open} onClose={onClose}>
            <DatePeriodForm
                formik={formik}
                onClose={onClose}
                minDate={minDatePickerDate}
                maxDate={maxDate}
                title={'To assign the book please specify period'}
            />
        </StyledModal>
    );
};

AssignBookModal.propTypes = {
    onAssign: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AssignBookModal;
