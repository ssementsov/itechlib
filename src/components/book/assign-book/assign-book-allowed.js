import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { add } from 'date-fns';
import { DatePeriodForm } from '../../../common/UI/date-period-form/date-period-form';

const initValue = {
    startDate: new Date(),
    finishDate: null,
};
const maxDate = add(new Date(), {
    months: 1,
});

export const AssignBookAllowed = (props) => {
    const { onAssign, onClose } = props;

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
            onAssign(values);
        },
    });

    return (
        <DatePeriodForm
            formik={formik}
            onClose={onClose}
            minDate={new Date()}
            maxDate={maxDate}
            title={'To assign the book please specify period'}
        />
    );
};

AssignBookAllowed.propTypes = {
    onAssign: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};
