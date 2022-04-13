import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import { LightDeleteIcon } from '../../icons/light-delete-icon';
import StyledCard from './styled-card';
import { useSelector } from 'react-redux';

const HiddenBookCoverTools = (props) => {
    const { onUploadButtonOpen, visible, onOpen } = props;
    const isUploadedAvatar = useSelector((state) => state.avatar.isUploadedAvatar);

    return (
        <StyledCard
            sx={{
                display: visible && isUploadedAvatar ? 'block' : 'none',
                background: 'rgba(0, 0, 0, 0.6)',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    height: '100%',
                }}
            >
                <IconButton
                    onClick={onOpen}
                    aria-label="delete"
                    sx={{ position: 'absolute', top: 0, right: 0 }}
                >
                    <LightDeleteIcon fontSize="larg" />
                </IconButton>
                <Button onClick={onUploadButtonOpen} sx={{ mr: 1, color: 'white' }}>
                    Upload image
                </Button>
            </div>
        </StyledCard>
    );
};

HiddenBookCoverTools.propTypes = {
    onUploadButtonOpen: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
};

export default HiddenBookCoverTools;
