import * as React from "react";
import PropTypes from "prop-types";
import AddEditBookFormBox from "./add-edit-book-form-box";
import StyledModal from "../../styled-modal";

export default function EditBookModal(props) {
   const { onEdit, book, open, onClose } = props;
   return (
      <StyledModal open={open} onClose={onClose}>
         <AddEditBookFormBox
            title={"Edit Book Information"}
            buttonName={"Save"}
            onEdit={onEdit}
            book={book}
            onClose={onClose}
         />
      </StyledModal>
   );
}

EditBookModal.propTypes = {
   open: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   onEdit: PropTypes.func.isRequired,
   book: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      fileInfo: PropTypes.object,
      category: PropTypes.shape({
         id: PropTypes.number,
         name: PropTypes.string,
      }).isRequired,
      language: PropTypes.shape({
         id: PropTypes.number,
         name: PropTypes.string,
      }).isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string,
      status: PropTypes.shape({
         id: PropTypes.number,
         name: PropTypes.string,
      }).isRequired,
      rate: PropTypes.number.isRequired,
      reader: PropTypes.bool.isRequired,
      owner: PropTypes.object,
   }),
};
