import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Typography } from "@mui/material";

const DeleteBookModal = ({ handleClose, deleteBook }) => {
  const deleteAndClose = () => {
    deleteBook();
    handleClose();
  };
  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography color="textPrimary" variant="h4" textAlign="center">
          Are you sure you want to delete the book?
        </Typography>
      </Box>
      <Box sx={{ py: 2 }}>
        <Button
          onClick={deleteAndClose}
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Yes
        </Button>
        <Button
          onClick={handleClose}
          fullWidth
          size="large"
          sx={{
            my: "20px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "primary",
          }}
        >
          Cancel
        </Button>
      </Box>
    </>
  );
};

DeleteBookModal.propTypes = {
  handleClose: PropTypes.func,
  deleteBook: PropTypes.func,
};

export default DeleteBookModal;
