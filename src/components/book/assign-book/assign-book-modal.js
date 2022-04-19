import React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../../styled-modal';
import { AssignBookAllowed } from './assign-book-allowed';
import { AssignBookRejected } from './assign-book-rejected';

const AssignBookModal = (props) => {
    const { onAssign, open, onClose } = props;

    return (
        <StyledModal open={open} onClose={onClose}>
            {/* <AssignBookAllowed onAssign={onAssign} onClose={onClose} /> */}
            <AssignBookRejected onClose={onClose} />
        </StyledModal>
    );
};

AssignBookModal.propTypes = {
    onAssign: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AssignBookModal;
