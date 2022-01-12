import React from "react";
import PropTypes from "prop-types";
import { Box, Button, Modal, Typography } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #838E9F",
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.35)",
  borderRadius: "25px",
  pt: 2,
  px: 4,
  pb: 3,
  maxWidth: 580,
  overflowY: "auto",
  maxHeight: "95vh",
  "&:focus": {
    outline: "none",
  },
};

const DeleteBookModal = ({ deleteBook, isOpenDelete, toggleDelete }) => {
  const deleteAndClose = () => {
    deleteBook();
    toggleDelete();
  };

  return (
    <>
      <Modal open={isOpenDelete} onClose={toggleDelete}>
        <Box sx={style}>
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
              onClick={toggleDelete}
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
        </Box>
      </Modal>
    </>
  );
};

DeleteBookModal.propTypes = {
  deleteBook: PropTypes.func,
  isOpenDelete: PropTypes.bool,
  toggleDelete: PropTypes.func,
};

export default DeleteBookModal;
