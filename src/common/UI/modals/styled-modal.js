import React from 'react';
import { Box, Card, Modal } from '@mui/material';
import PropTypes from 'prop-types';
import { CloseIcon } from '../../../icons/close-icon';
import { useTheme } from '@mui/material/styles';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #838E9F',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.35)',
    borderRadius: '25px',
    px: 4,
    pb: 3,
    maxWidth: 580,
    minWidth: 500,
    overflowY: 'auto',
    maxHeight: '95vh',
    '&:focus': {
        outline: 'none',
    },
    '&::-webkit-scrollbar': {
        width: 0,
    },
};

export const StyledModal = (props) => {
    const { open, onClose, children, isSticky = false, isCloseIconHidden = false, ...prop } = props;
    const theme = useTheme();

    return (
        <Modal {...prop} open={open} onClose={onClose}>
            <Card sx={{
                pt: isSticky ? 0 : 2,
                ...style,
            }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        cursor: 'pointer',
                        right: 16,
                        top: 16,
                        zIndex: theme.zIndex.modal + 1,
                    }}
                >
                    {!isCloseIconHidden && <CloseIcon onClick={onClose} />}
                </Box>
                {children}
            </Card>
        </Modal>
    );
};

StyledModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    isSticky: PropTypes.bool,
};
