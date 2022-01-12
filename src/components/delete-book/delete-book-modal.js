import React from "react";
import PropTypes from "prop-types";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { DeleteIcon } from "../../icons/delete-icon";

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

const DeleteBookModal = ({ deleteBook }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deleteAndClose = () => {
    deleteBook();
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleOpen} aria-label="delete">
        <DeleteIcon fontSize="small" />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
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
        </Box>
      </Modal>
    </>
  );
};

DeleteBookModal.propTypes = {
  deleteBook: PropTypes.func,
};

export default DeleteBookModal;
