import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import StyledModal from '../../styled-modal';
import { PrimaryButton, SecondaryButton } from '../../../common/UI';
import { useSelector } from 'react-redux';

const DeleteModal = (props) => {
    const { onDelete, onClose, open, title } = props;
    const isLoadingButton = useSelector(state => state.loadingStatus.isLoadingButton);

    return (
        <StyledModal open={open} onClose={onClose}>
            <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" textAlign="center">
                    Are you sure you want to delete the {title}?
                </Typography>
            </Box>
            <Box sx={{ py: 2 }}>
                <PrimaryButton
                    loadingButton
                    loading={isLoadingButton}
                    title='Yes'
                    onClick={onDelete}
                />
                <SecondaryButton
                    title='Cancel'
                    onClick={onClose}
                />
            </Box>
        </StyledModal>
    );
};

DeleteModal.propTypes = {
    onDelete: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
};

export default DeleteModal;
