import {CloseIcon} from '../../../icons/close-icon';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import classes from './warning-modal-text.module.css';

export const WarningModalText = (props) => {
    const { onClose, contentText } = props;
    return (
        <Box sx={{ mt: 5, mb: 3 }}>
            <div className={classes.closeIcon}>
                <CloseIcon
                    onClick={onClose}
                    sx={{
                        justifySelf: 'flex-end',
                    }}
                />
            </div>
            <Typography color='textPrimary' variant='h4' textAlign='center'>
                {contentText}
            </Typography>
        </Box>
    );
};
WarningModalText.propTypes = {
    onClose: PropTypes.func.isRequired,
    contentText: PropTypes.string.isRequired,
};