import * as React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../styled-modal';
import { types } from '../../types';
import SuggestedBookView from './suggested-book-view';

export default function SuggestedBookModal(props) {
    const { open, onClose, book } = props;
    return (
        <StyledModal open={open} onClose={onClose}>
            <SuggestedBookView book={book} />
        </StyledModal>
    );
}

SuggestedBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    book: types.suggestedBookTypes,
};
