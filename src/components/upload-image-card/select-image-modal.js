import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import StyledModal from '../styled-modal';
import SelectFileButton from './select-image-button';
import { theme } from '../../theme/index';

const SelectImageModal = (props) => {
    const { onClose, open, onSelect, urlImage, isAllowedImage, onUpload } =
        props;

    return (
        <StyledModal open={open} onClose={onClose}>
            <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" textAlign="center">
                    Please select image for book cover
                </Typography>
            </Box>
            <Box sx={{ pb: 2 }}>
                {urlImage ? (
                    <>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginBottom: '20px',
                            }}
                        >
                            <img
                                height="200px"
                                src={urlImage}
                                alt="book cover"
                            />
                        </Box>
                        <Button
                            onClick={onUpload}
                            variant="contained"
                            component="span"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Upload image
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography
                            variant="body1"
                            color={
                                isAllowedImage
                                    ? theme.palette.error.main
                                    : 'textSecondary'
                            }
                            textAlign="center"
                            sx={{
                                mb: '20px',
                            }}
                        >
                            You can upload an image in JPG, GIF or PNG format.
                            Maximum size 5MB.
                        </Typography>
                        <SelectFileButton onSelect={onSelect} />
                    </>
                )}

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
    onSelect: PropTypes.func.isRequired,
    urlBookCover: PropTypes.string,
    isAllowedImage: PropTypes.bool.isRequired,
    onUpload: PropTypes.func.isRequired,
};

export default SelectImageModal;
