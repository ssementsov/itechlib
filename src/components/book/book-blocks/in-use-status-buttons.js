import { Button } from '@mui/material';
import { PrimaryButton } from '../../../common/UI';

export const InUseStatusButtons = (props) => {
    const {isDisabledProlongateButton, onProlongateButtonClick, onReturnButtonClick} = props;
    return (
        <>
            <Button
                disabled={isDisabledProlongateButton}
                onClick={onProlongateButtonClick}
                sx={{ mr: 1 }}
            >
                Prolongate reading
            </Button>
            <PrimaryButton
                title={'Return the book'}
                size='small'
                fullWidth={false}
                onClick={onReturnButtonClick}
            />
        </>
    );
};