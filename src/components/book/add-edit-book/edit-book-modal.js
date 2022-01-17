import * as React from 'react';
import PropTypes from 'prop-types';
import AddEditBookFormBox from './add-edit-book-form-box';
import StyledContainerForModal from '../../styled-container-for-modal';

export default function EditBookModal(props) {
  const { onEdit, book, open, setClose } = props;
  return (
    <>
      <StyledContainerForModal open={open} setClose={setClose}>
        <AddEditBookFormBox
          title={'Edit Book Information'}
          buttonName={'Save'}
          onEdit={onEdit}
          book={book}
          setClose={setClose}
        />
      </StyledContainerForModal>
    </>
  );
}

EditBookModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    language: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    link: PropTypes.string,
    status: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }).isRequired,
};
