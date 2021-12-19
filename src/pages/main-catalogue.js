import Head from 'next/head'
import { Box, Container, Typography } from '@mui/material'
import { BooksListResults } from '../components/booksTable/books-list-results'
import { BooksListToolbar } from '../components/booksTable/books-list-toolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import { useState, useEffect } from 'react'
import { withSnackbar } from 'notistack'
import api from '../api/books'

const MainCatalogue = ({ enqueueSnackbar }) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [books, setBooks] = useState()

  useEffect(() => {
    api
      .get('/api/books')
      .then(function (res) {
        setBooks(res.data)
        setIsLoaded(true)
      })
      .catch(function () {
        enqueueSnackbar('Something went wrong... Please retry.', {
          variant: 'error',
        })
      })
  }, [enqueueSnackbar])

  const createBook = (newBook) => {
    let id = books.length ? books[books.length - 1].id + 1 : 1
    api
      .post('/api/books', {
        author: newBook.author,
        title: newBook.title,
        description: newBook.description,
        link: newBook.linkToWeb,
        category: {
          id: id,
          name: newBook.category,
        },
        id: id,
        language: {
          id: id,
          name: newBook.language,
        },
      })
      .then(function () {
        enqueueSnackbar('Your book has been added successfully!', {
          variant: 'success',
        })
        setIsLoaded(true)
      })
      .catch(function () {
        enqueueSnackbar('Something went wrong... Please retry.', {
          variant: 'error',
        })
        setIsLoaded(true)
      })
  }

  if (!isLoaded) {
    return (
      <Typography sx={{ my: 8, mx: 4 }} variant="h4">
        Loading...
      </Typography>
    )
  } else {
    return (
      <>
        <Head>
          <title>Main catalogue</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <BooksListToolbar createBook={createBook} />
            <Box sx={{ mt: 3 }}>
              <BooksListResults books={books} />
            </Box>
          </Container>
        </Box>
      </>
    )
  }
}
MainCatalogue.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default withSnackbar(MainCatalogue)
