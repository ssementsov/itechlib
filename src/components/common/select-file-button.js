import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { PrimaryButton } from '../../common/UI/buttons/primary-button';

const Input = styled('input')({
    display: 'none',
});

const SelectFileButton = (props) => {
    const { onSelect, isLight = false, uploadButton = false, multipal = false } = props;
    return (
        <label htmlFor="contained-button-file">
            <Input
                accept="image/jpeg, image/jpg, image/png, image/gif"
                id="contained-button-file"
                multiple={multipal}
                type="file"
                onChange={onSelect}
            />
            <PrimaryButton
                title={uploadButton ? 'Upload image' : 'Select image'}
                variant={isLight ? 'outlined' : 'contained'}
                component="span"
            />
        </label>
    );
};

SelectFileButton.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default SelectFileButton;
