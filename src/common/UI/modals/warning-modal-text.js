import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const WarningModalText = (props) => {
    const { contentText } = props;
    return (
        <Box sx={{ mt: 5, mb: 3 }}>
            <Typography color='textPrimary' variant='h4' textAlign='center'>
                {contentText}
            </Typography>
        </Box>
    );
};
WarningModalText.propTypes = {
    contentText: PropTypes.string.isRequired,
};