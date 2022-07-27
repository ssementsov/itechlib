import PropTypes from 'prop-types';
import { WarningModalText } from './warning-modal-text';
import StyledModal from '../../../components/styled-modal';

export const BlockingModal = (props) => {
    const { open, onClose } = props;
    return (
        <StyledModal open={open} onClose={onClose}>
            <WarningModalText
                onClose={onClose}
                contentText={'Oops! You have been blocked. Please return the book to remove blocking'}
            />
        </StyledModal>
    );
};
BlockingModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};