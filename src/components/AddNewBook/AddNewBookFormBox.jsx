import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Container } from '@mui/material'
import { CloseIcon } from '../../icons/close-icon'
import AddNewBookForm from './AddNewBookForm'
import { status } from '../../common/constants/status-constants'
import { useSnackbar } from 'notistack'

const AddNewBookFormBox = ({ handleClose }) => {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()

  const handleClick = () => {
    enqueueSnackbar('Your book has been added successfully!', {
      variant: 'success',
      autoHideDuration: 5000,
    })
  }

  function validate(value) {
    let error = {}
    if (
      value.linkToWeb &&
      !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[-A-Z0-9+&@#%=~_|$?!:,.])/i.test(
        value.linkToWeb
      )
    ) {
      error.linkToWeb = 'Please enter correct link'
    } else if (value.status === status.inUse) {
      if (!value.reader) {
        error.reader = 'Reader is required'
      }
      if (!value.dateFrom) {
        error.dateFrom = 'Date is required'
      }
      if (!value.dateTo) {
        error.dateTo = 'Date is required'
      }
    }

    return error
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      category: '',
      languages: '',
      description: '',
      linkToWeb: '',
      status: '',
      reader: '',
      dateFrom: null,
      dateTo: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().min(2).max(255).required('Title is required'),
      author: Yup.string().min(2).max(255).required('Author is required'),
      category: Yup.string().required('Category is required'),
      languages: Yup.string().required('Language is required'),
      description: Yup.string()
        .min(3)
        .max(100)
        .required('Description is required'),
      status: Yup.string().required('Status is required'),
    }),
    validate,
    onSubmit: () => {
      handleClick()
      router.push('/home')
    },
  })

  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%',
        }}
      >
        <Container maxWidth="sm">
          <Box
            sx={{
              position: 'absolute',
              right: 22,
              top: 22,
              cursor: 'pointer',
            }}
          >
            <CloseIcon
              onClick={handleClose}
              sx={{
                justifySelf: 'flex-end',
              }}
            />
          </Box>
          <AddNewBookForm formik={formik} />
        </Container>
      </Box>
    </>
  )
}

export default AddNewBookFormBox
