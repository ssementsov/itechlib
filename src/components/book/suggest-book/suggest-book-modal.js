import * as React from 'react';
import PropTypes from 'prop-types';
import StyledModal from '../../styled-modal';
import SuggestBookFormBox from './suggest-book-form-box';

export default function SuggestBookModal(props) {
    const { open, onClose, onCreate } = props;
    return (
        <StyledModal open={open} onClose={onClose}>
            <SuggestBookFormBox
                title={'Suggest a book'}
                buttonName={'Submit'}
                onClose={onClose}
                open={open}
                onCreate={onCreate}
            />
        </StyledModal>
    );
}

SuggestBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func.isRequired,
};
