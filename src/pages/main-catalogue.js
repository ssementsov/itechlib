import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { BooksListResults } from '../components/booksTable/books-list-results'
import { BooksListToolbar } from '../components/booksTable/books-list-toolbar'
import { DashboardLayout } from '../components/dashboard-layout'

const mainCatalogue = ({ books }) => {
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
          <BooksListToolbar />
          <Box sx={{ mt: 3 }}>
            <BooksListResults books={books} />
          </Box>
        </Container>
      </Box>
    </>
  )
}
mainCatalogue.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default mainCatalogue

export async function getServerSideProps() {
  const res = await fetch('https://my.backend/books')
  const books = await res.json()

  return {
    props: {
      books,
    },
  }
}
