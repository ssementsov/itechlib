import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

export const PrimaryButton = (props) => {
    const {
        title,
        size = 'large',
        fullWidth = true,
        variant = 'contained',
        loadingButton = false,
        loading = false,
        ...buttonProps
    } = props;
    let theme = useTheme();

    if (loadingButton) {
        return (
            <LoadingButton
                color='primary'
                sx={{ width: !fullWidth ? '150px' : '100%', '& .MuiLoadingButton-loadingIndicator': {color: theme.palette.primary.main} }}
                fullWidth={fullWidth}
                size={size}
                loading={loading}
                variant={variant}
                {...buttonProps}
            >
                {title}
            </LoadingButton>
        );
    } else {
        return (
            <Button
                color='primary'
                sx={{ width: !fullWidth ? '150px' : '100%' }}
                fullWidth={fullWidth}
                size={size}
                variant={variant}
                {...buttonProps}
            >
                {title}
            </Button>
        );
    }
};
