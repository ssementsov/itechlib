import Head from 'next/head'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Box, Container } from '@mui/material'
import { CloseIcon } from '../../icons/close-icon'
import AddNewBookForm from './AddNewBookForm'

const AddNewBookFormBox = ({ handleClose }) => {
  const router = useRouter()

  function validate(value) {
    let error = {}
    if (
      value.linkToWeb &&
      !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[-A-Z0-9+&@#%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[A-Z0-9+&@#%=~_|$])/i.test(
        value.linkToWeb
      )
    ) {
      error.linkToWeb = 'Please enter correct link'
    }
    return error
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      author: '',
      сathegory: '',
      languages: '',
      description: '',
      linkToWeb: '',
      status: '',
      reader: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required('Title is required'),
      author: Yup.string().max(255).required('Author is required'),
      сathegory: Yup.string().required('Cathegory is required'),
      languages: Yup.string().required('Language is required'),
      description: Yup.string().max(255).required('Description is required'),
      status: Yup.string().required('Status is required'),
      reader: Yup.string().required('Reader is required'),
    }),
    validate,
    onSubmit: () => {
      router.push('/home')
    },
  })

  return (
    <>
      <Head>
        <title>Add a book</title>
      </Head>
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
