import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

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
            <Button
                variant={isLight ? 'outlined' : 'contained'}
                component="span"
                color="primary"
                fullWidth
                size="large"
            >
                {uploadButton ? 'Upload image' : 'Select image'}
            </Button>
        </label>
    );
};

SelectFileButton.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default SelectFileButton;
