import * as React from 'react';
import PropTypes from 'prop-types';
import { StyledModal } from '../../../common/UI';
import AddEditSuggestedBookFormBox from './add-edit-suggested-book-form-box';

export default function AddSuggestedBookModal(props) {
    const { open, onClose, onCreate } = props;
    return (
        <StyledModal isSticky open={open} onClose={onClose}>
            <AddEditSuggestedBookFormBox
                title={'Suggest a book'}
                buttonName={'Submit'}
                open={open}
                onCreate={onCreate}
            />
        </StyledModal>
    );
}

AddSuggestedBookModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
};
