import React from 'react';
import PropTypes from 'prop-types';
import { Button, IconButton } from '@mui/material';
import { LightDeleteIcon } from '../../icons/light-delete-icon';
import StyledCard from './styled-card';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { PROFILE_PATH } from '../../common/constants/route-constants';

const HiddenBookCoverTools = (props) => {
    const { onUploadButtonOpen, visible, onOpen, isImage } = props;
    const router = useRouter();
    const isProfilePage = router.pathname === PROFILE_PATH;
    const isUploadedAvatar = useSelector((state) => state.avatar.isUploadedAvatar);
    const isVisibleTools = isProfilePage ? visible && isUploadedAvatar : visible && isImage;

    return (
        <StyledCard
            sx={{
                display: isVisibleTools ? 'block' : 'none',
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
    isImage: PropTypes.object,
};

export default HiddenBookCoverTools;
