import { Button } from '@mui/material';
import { PrimaryButton } from '../../../common/UI';
import PropTypes from 'prop-types';

const PendingAcceptanceStatusButtons = (props) => {
    const { onDeclineButtonClick, onAcceptButtonClick, isLoadingAcceptButton } = props;

    return (
        <>
            <Button
                onClick={onDeclineButtonClick}
                sx={{ mr: 1 }}
            >
                Decline with comments
            </Button>
            <PrimaryButton
                loadingButton
                loading={isLoadingAcceptButton}
                title={'Accept'}
                size='small'
                fullWidth={false}
                onClick={onAcceptButtonClick}
            />
        </>
    );
};

PendingAcceptanceStatusButtons.propTypes = {
    onDeclineButtonClick: PropTypes.func.isRequired,
    onAcceptButtonClick: PropTypes.func.isRequired,
    isLoadingAcceptButton: PropTypes.bool.isRequired,
};

export default PendingAcceptanceStatusButtons;