import Head from 'next/head'
import { Box, Container, Typography } from '@mui/material'
import { BooksListResults } from '../components/booksTable/books-list-results'
import { BooksListToolbar } from '../components/booksTable/books-list-toolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import { useState, useEffect } from 'react'

const MainCatalogue = () => {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [books, setBooks] = useState([])

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setBooks(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  const createBook = async (body) => {
    fetch(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true)
          setBooks(result)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }

  if (error) {
    return (
      <Typography sx={{ my: 8, mx: 4 }} variant="h4">
        Something wrong...
      </Typography>
    )
  } else if (!isLoaded) {
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

export default MainCatalogue
