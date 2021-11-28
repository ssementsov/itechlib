import * as React from 'react'
import { Box, Modal, Button } from '@mui/material'
import AddNewBookFormBox from './AddNewBookFormBox'

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

export default function AddNewBookModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button onClick={handleOpen} color="primary" variant="contained">
        Add a book
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <AddNewBookFormBox handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  )
}
