import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useTheme } from '@mui/material/styles';

export const SecondaryButton = (props) => {
    const { title, loadingButton = false, loading = false, ...buttonProps } = props;
    let theme = useTheme();

    if (loadingButton) {
        return (
            <LoadingButton
                {...buttonProps}
                loading={loading}
                size='large'
                fullWidth
                sx={{
                    my: '20px',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderColor: 'primary',
                    '& .MuiLoadingButton-loadingIndicator': {color: theme.palette.primary.main},
                    '&.MuiLoadingButton-loading': {border: `1px solid ${theme.palette.action.disabledBackground}`}
                }}
            >
                {title}
            </LoadingButton>
        );
    } else {
        return (
            <Button
                {...buttonProps}
                fullWidth
                size='large'
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
    }
};
