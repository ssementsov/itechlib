import * as React from 'react';
import PropTypes from 'prop-types';
import AddEditBookFormBox from './add-edit-book-form-box';
import StyledContainerForModal from '../../styled-container-for-modal';

export default function AddBookModal(props) {
  const { onCreate, open, setClose } = props;
  return (
    <>
      <StyledContainerForModal open={open} setClose={setClose}>
        <AddEditBookFormBox
          title={'Add New Book'}
          buttonName={'Add'}
          onCreate={onCreate}
          setClose={setClose}
        />
      </StyledContainerForModal>
    </>
  );
}

AddBookModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
};
