import * as React from "react";
import PropTypes from "prop-types";
import { Box, Modal } from "@mui/material";
import AddEditBookFormBox from "./add-edit-book/add-edit-book-form-box";
import { typeModal } from "../common/constants/modal-type-constants";

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

export default function AddOrEditBookModal({
  createBook,
  type,
  editBook,
  book,
  open,
  handleClose,
}) {
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddEditBookFormBox
            title={
              type === typeModal.add ? "Add New Book" : "Edit Book Information"
            }
            buttonName={type === typeModal.add ? "Add" : "Save"}
            handleClose={handleClose}
            createBook={createBook}
            editBook={type === typeModal.add ? null : editBook}
            book={type === typeModal.add ? null : book}
          />
        </Box>
      </Modal>
    </>
  );
}

AddOrEditBookModal.propTypes = {
  type: PropTypes.oneOf(["ADD BOOK", "EDIT BOOK"]),
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
