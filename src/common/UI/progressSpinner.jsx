import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const ProgressSpinner = () => {
    return (
        <Box
            sx={{
                position: 'fixed',
                zIndex: '999',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                margin: 'auto',
                width: '50px',
                height: '50px',
            }}
        >
            <CircularProgress size={100} />
        </Box>
    );
};
