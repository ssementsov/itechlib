import * as React from "react";
import PropTypes from "prop-types";
import AddEditBookFormBox from "./add-edit-book-form-box";
import StyledModal from "../../styled-modal";

export default function AddBookModal(props) {
  const { onCreate, open, onClose } = props;
  return (
    <StyledModal open={open} onClose={onClose}>
      <AddEditBookFormBox
        title={"Add New Book"}
        buttonName={"Add"}
        onCreate={onCreate}
        onClose={onClose}
      />
    </StyledModal>
  );
}

AddBookModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};
