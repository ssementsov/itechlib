import * as React from 'react'
import PropTypes from 'prop-types'
import { Box, Modal, Button, IconButton } from '@mui/material'
import AddNewBookFormBox from './add-new-book/add-new-book-form-box'
import { DeleteIcon } from './../icons/delete-icon'
import { EditIcon } from './../icons/edit-icon'
import DeleteBookModal from './delete-book/delete-book-modal'
import { typeModal } from '../common/constants/modal-type-constants'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #838E9F',
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.35)',
  borderRadius: '25px',
  pt: 2,
  px: 4,
  pb: 3,
  maxWidth: 580,
  overflowY: 'auto',
  maxHeight: '95vh',
  '&:focus': {
    outline: 'none',
  },
}

export default function CustomModal({
  createBook,
  type,
  deleteBook,
  editBook,
  book,
}) {
  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  // eslint-disable-next-line default-case
  switch (type) {
    case typeModal.add:
      return (
        <div>
          <Button onClick={handleOpen} color="primary" variant="contained">
            Add a book
          </Button>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <AddNewBookFormBox
                title={'Add New Book'}
                buttonName={'Add'}
                createBook={createBook}
                handleClose={handleClose}
              />
            </Box>
          </Modal>
        </div>
      )
    case typeModal.delete:
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
      )
    case typeModal.edit:
      return (
        <>
          <IconButton onClick={handleOpen} aria-label="edit">
            <EditIcon fontSize="small" />
          </IconButton>
          <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
              <AddNewBookFormBox
                title={'Edit Book Information'}
                buttonName={'Save'}
                handleClose={handleClose}
                createBook={createBook}
                editBook={editBook}
                book={book}
              />
            </Box>
          </Modal>
        </>
      )
  }
}

CustomModal.propTypes = {
  createBook: PropTypes.func,
  editBook: PropTypes.func,
  deleteBook: PropTypes.func,
  type: PropTypes.oneOf(['ADD BOOK', 'DELETE BOOK', 'EDIT BOOK']),
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
  }),
}
