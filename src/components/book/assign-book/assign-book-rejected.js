import PropTypes from 'prop-types';
import { WarningModalText } from '../../../common/UI/modals/warning-modal-text';

export const AssignBookRejected = (props) => {
    const { onClose } = props;
    return (
        <WarningModalText
            onClose={onClose}
            contentText={'Oops! You already have 5 books. Please return some book to assign a new one.'}
        />
    );
};

AssignBookRejected.propTypes = {
    onClose: PropTypes.func.isRequired,
};
