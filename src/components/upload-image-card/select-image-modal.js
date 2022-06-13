import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import StyledModal from '../styled-modal';
import SelectFileButton from '../common/select-file-button';
import { theme } from '../../theme/index';
import { PrimaryButton } from '../../common/UI/buttons/primary-button';
import { SecondaryButton } from '../../common/UI/buttons/secondary-button';

const SelectImageModal = (props) => {
    const { onClose, open, onSelect, urlImage, isAllowedImage, onUpload, title, description } =
        props;

    return (
        <StyledModal open={open} onClose={onClose}>
            <Box sx={{ my: 3 }}>
                <Typography color="textPrimary" variant="h4" textAlign="center">
                    Please select image for {title}
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
                            <img height="200px" src={urlImage} alt="book cover" />
                        </Box>
                        <PrimaryButton
                            title='Upload image'
                            component="span"
                            onClick={onUpload}
                        />
                    </>
                ) : (
                    <>
                        <Typography
                            variant="body1"
                            color={isAllowedImage ? theme.palette.error.main : 'textSecondary'}
                            textAlign="center"
                            sx={{
                                mb: '20px',
                            }}
                        >
                            {description}
                        </Typography>
                        <SelectFileButton onSelect={onSelect} />
                    </>
                )}

                <SecondaryButton
                    title='Cancel'
                    onClick={onClose}
                />
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
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default SelectImageModal;
