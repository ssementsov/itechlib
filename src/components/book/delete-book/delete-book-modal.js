import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';
import StyledContainerForModal from './../../styled-container-for-modal';

const DeleteBookModal = (props) => {
  const { onDelete, setClose, open } = props;

  return (
    <>
      <StyledContainerForModal open={open} setClose={setClose}>
        <Box sx={{ my: 3 }}>
          <Typography color="textPrimary" variant="h4" textAlign="center">
            Are you sure you want to delete the book?
          </Typography>
        </Box>
        <Box sx={{ py: 2 }}>
          <Button
            onClick={onDelete}
            color="primary"
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={setClose}
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
      </StyledContainerForModal>
    </>
  );
};

DeleteBookModal.propTypes = {
  onDelete: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
};

export default DeleteBookModal;
