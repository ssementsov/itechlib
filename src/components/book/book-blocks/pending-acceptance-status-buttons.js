import { Button } from '@mui/material';
import { PrimaryButton } from '../../../common/UI';

export const PendingAcceptanceStatusButtons = (props) => {
    const { onDeclineButtonClick, onAcceptButtonClick } = props;
    return (
        <>
            <Button
                onClick={onDeclineButtonClick}
                sx={{ mr: 1 }}
            >
                Decline with comments
            </Button>
            <PrimaryButton
                title={'Accept'}
                size='small'
                fullWidth={false}
                onClick={onAcceptButtonClick}
            />
        </>
    );
};