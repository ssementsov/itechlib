import * as React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../styled-modal';
import { types } from '../../types';
import SuggestedBookInfo from './suggested-book-info';

export default function SuggestedBookModal(props) {
    const { open, onClose, book, onOpen, onDelete } = props;
    return (
        <StyledModal open={open} onClose={onClose}>
            <SuggestedBookInfo
                book={book}
                onOpen={onOpen}
                onDelete={onDelete}
            />
        </StyledModal>
    );
}

SuggestedBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: types.suggestedBookTypes,
    onOpen: PropTypes.func,
    onDelete: PropTypes.func,
};
