import React from 'react';
import { Card, Modal } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #838E9F',
    boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.35)',
    borderRadius: '25px',
    pt: 2,
    px: 4,
    pb: 3,
    maxWidth: 580,
    minWidth: 320,
    overflowY: 'auto',
    maxHeight: '95vh',
    '&:focus': {
        outline: 'none',
    },
    '&::-webkit-scrollbar': {
        width: 0,
    },
};

const StyledModal = (props) => {
    const { open, onClose, children, ...prop } = props;

    return (
        <Modal {...prop} open={open} onClose={onClose}>
            <Card sx={style}>{children}</Card>
        </Modal>
    );
};

export default StyledModal;
