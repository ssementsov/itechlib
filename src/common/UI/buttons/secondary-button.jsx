import { Button } from '@mui/material';

export const SecondaryButton = (props) => {
    const { title, ...buttonProps } = props;
    return (
        <Button
            {...buttonProps}
            fullWidth
            size="large"
            sx={{
                my: '20px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'primary',
            }}
        >
            {title}
        </Button>
    );
};
