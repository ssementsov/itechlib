import { StyledModal, WarningModalText } from '../../../common/UI';

export const RejectedBookingModal = (props) => {
    const { open, onClose } = props;

    return (
        <StyledModal open={open} onClose={onClose}>
            <WarningModalText
                contentText={'Oops! You already have 5 books. Please return some book to assign a new one.'}
            />
        </StyledModal>
    );
};
