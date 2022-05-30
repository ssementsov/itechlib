import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { CloseIcon } from '../../../icons/close-icon';
import classes from './assign-book-modal.module.css';

export const AssignBookRejected = (props) => {
    const { onClose } = props;

    return (
        <>
            <Box sx={{ mt: 5, mb: 3 }}>
                <div className={classes.closeIcon}>
                    <CloseIcon
                        onClick={onClose}
                        sx={{
                            justifySelf: 'flex-end',
                        }}
                    />
                </div>
                <Typography color="textPrimary" variant="h4" textAlign="center">
                    Oops! You already have 5 books. Please return some book to assign a new one.
                </Typography>
            </Box>
        </>
    );
};

AssignBookRejected.propTypes = {
    onClose: PropTypes.func.isRequired,
};
