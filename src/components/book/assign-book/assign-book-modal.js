import React from 'react';
import PropTypes from 'prop-types';
import { StyledModal } from '../../../common/UI';
import { AssignBookAllowed } from './assign-book-allowed';
import { AssignBookRejected } from './assign-book-rejected';

const AssignBookModal = (props) => {
    const { onAssign, open, onClose, isRejectedToAssign } = props;

    return (
        <StyledModal open={open} onClose={onClose}>
            {isRejectedToAssign
                ? <AssignBookRejected onClose={onClose}/>
                : <AssignBookAllowed onAssign={onAssign} onClose={onClose}/>
            }
        </StyledModal>
    );
};

AssignBookModal.propTypes = {
    onAssign: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isRejectedToAssign: PropTypes.bool.isRequired
};

export default AssignBookModal;
