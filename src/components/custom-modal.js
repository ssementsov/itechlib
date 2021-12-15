import * as React from "react";
import { Box, Modal, Button, IconButton } from "@mui/material";
import AddNewBookFormBox from "./AddNewBook/AddNewBookFormBox";
import { DeleteIcon } from "./../icons/delete-icon";
import { EditIcon } from "./../icons/edit-icon";
import DeleteBookModal from "./deleteBook/delete-book-modal";

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

export default function CustomModal({
  createBook,
  whatModal,
  deleteBook,
  editBook,
  book,
}) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  if (whatModal === "add book") {
    return (
      <div>
        <Button onClick={handleOpen} color="primary" variant="contained">
          Add a book
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <AddNewBookFormBox
              title={"Add New Book"}
              buttonName={"Add"}
              createBook={createBook}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      </div>
    );
  } else if (whatModal === "delete book") {
    return (
      <>
        <IconButton onClick={handleOpen} aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <DeleteBookModal
              deleteBook={deleteBook}
              handleClose={handleClose}
            />
          </Box>
        </Modal>
      </>
    );
  } else if (whatModal === "edit book") {
    return (
      <>
        <IconButton onClick={handleOpen} aria-label="edit">
          <EditIcon fontSize="small" />
        </IconButton>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <AddNewBookFormBox
              title={"Edit Book Information"}
              buttonName={"Save"}
              handleClose={handleClose}
              createBook={createBook}
              editBook={editBook}
              book={book}
            />
          </Box>
        </Modal>
      </>
    );
  }
}
