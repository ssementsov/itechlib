import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import StyledModal from '../styled-modal';
import UploadButton from './upload-button';
import { theme } from './../../theme/index';

const SelectImageModal = (props) => {
    const { onClose, open, onSelect, urlBookCover, error } =
        props;

    return (
        <StyledModal open={open} onClose={onClose}>
            <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" textAlign="center">
                    Please select image for book cover
                </Typography>
            </Box>
            <Box sx={{ py: 2 }}>
                {urlBookCover ? (
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '20px',
                        }}
                    >
                        <img
                            width="200px"
                            height="200px"
                            src={urlBookCover}
                            alt="book cover"
                        />
                    </Box>
                ) : (
                    <Typography
                        variant="body1"
                        color={
                            error ? theme.palette.error.main : 'textSecondary'
                        }
                        textAlign="center"
                        sx={{
                            mb: '20px',
                        }}
                    >
                        You can upload an image in JPG, GIF or PNG format.
                        Maximum size 5MB.
                    </Typography>
                )}
                <UploadButton onSelect={onSelect} />
                <Button
                    onClick={onClose}
                    fullWidth
                    size="large"
                    sx={{
                        my: '20px',
                        borderWidth: '1px',
                        borderStyle: 'solid',
                        borderColor: 'primary',
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </StyledModal>
    );
};

SelectImageModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SelectImageModal;
