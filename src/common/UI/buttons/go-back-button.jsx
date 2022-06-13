import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const GoBackButton = () => {
    const router = useRouter();
    return (
        <Button
            onClick={() => router.back()}
            component="a"
            startIcon={<ArrowBackIcon fontSize="small" />}
            sx={{
                ml: 2,
            }}
        >
            Back
        </Button>
    );
};
