import * as React from 'react';
import PropTypes from 'prop-types';
import AddEditBookFormBox from './add-edit-book-form-box';
import { StyledModal } from '../../../common/UI';

export default function AddBookModal(props) {
    const { onCreate, open, onClose } = props;
    return (
        <StyledModal isSticky open={open} onClose={onClose}>
            <AddEditBookFormBox
                title={'Add New Book'}
                buttonName={'Add'}
                onCreate={onCreate}
                inEditMode={false}
            />
        </StyledModal>
    );
}

AddBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};
