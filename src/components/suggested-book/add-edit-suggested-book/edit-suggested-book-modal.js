import * as React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../../styled-modal';
import AddEditSuggestedBookFormBox from './add-edit-suggested-book-form-box';
import { types } from '../../../types';

export default function EditSuggestedBookModal(props) {
    const { book, open, onClose, onEdit } = props;
    return (
        <StyledModal isSticky open={open} onClose={onClose}>
            <AddEditSuggestedBookFormBox
                title={'Edit Book Information'}
                buttonName={'Save'}
                open={open}
                onEdit={onEdit}
                book={book}
            />
        </StyledModal>
    );
}

EditSuggestedBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onEdit: PropTypes.func,
    book: types.suggestedBookTypes.isRequired,
};
