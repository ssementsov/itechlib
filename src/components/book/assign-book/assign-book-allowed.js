import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { add, sub } from 'date-fns';
import { DatePeriodForm } from '../../../common/UI/date-period-form/date-period-form';
import {
    dateNotEarlierThan,
    dateNotLaterThan,
    FORMAT_DATE,
    INVALID_DATE,
    isRequired,
} from '../../../common/constants';
import * as Yup from 'yup';

const initValue = {
    startDate: new Date(),
    finishDate: null,
};
const minDatePickerDate = new Date();
const minFormikDate = sub(new Date(), { days: 1 });
const maxDate = add(new Date(), { months: 1 });

export const AssignBookAllowed = (props) => {
    const { onAssign, onClose } = props;

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
        <DatePeriodForm
            formik={formik}
            onClose={onClose}
            minDate={minDatePickerDate}
            maxDate={maxDate}
            title={'To assign the book please specify period'}
        />
    );
};

AssignBookAllowed.propTypes = {
    onAssign: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
