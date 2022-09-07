import { Button } from '@mui/material';
import { PrimaryButton } from '../../../common/UI';
import { useSelector } from 'react-redux';

export const PendingAcceptanceStatusButtons = (props) => {
    const { onDeclineButtonClick, onAcceptButtonClick } = props;
    const isLoadingButton = useSelector(state => state.loadingStatus.isLoadingButton);
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
                loading={isLoadingButton}
                title={'Accept'}
                size='small'
                fullWidth={false}
                onClick={onAcceptButtonClick}
            />
        </>
    );
};