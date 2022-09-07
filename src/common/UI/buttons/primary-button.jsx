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
            sx={{width: !fullWidth ? '150px' : '100%'}}
            fullWidth={fullWidth}
            size={size}
            variant={variant}
            {...buttonProps}
        >
            {title}
        </Button>
    );
};
