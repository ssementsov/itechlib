import * as React from 'react';
import PropTypes from 'prop-types';
import { types } from '../../../types';
import AddEditBookFormBox from './add-edit-book-form-box';
import StyledModal from '../../styled-modal';

export default function EditBookModal(props) {
    const { onEdit, book, open, onClose } = props;
    return (
        <StyledModal open={open} onClose={onClose}>
            <AddEditBookFormBox
                title={'Edit Book Information'}
                buttonName={'Save'}
                onEdit={onEdit}
                book={book}
                onClose={onClose}
            />
        </StyledModal>
    );
}

EditBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    book: types.bookTypes,
};
