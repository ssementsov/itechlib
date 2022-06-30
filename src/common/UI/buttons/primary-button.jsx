import { Button } from '@mui/material';

export const PrimaryButton = (props) => {
    const {
        title,
        size = 'large',
        fullWidth = true,
        variant = 'contained',
        ...buttonProps
    } = props;
    return (
        <Button
            color="primary"
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            {...buttonProps}
        >
            {title}
        </Button>
    );
};
