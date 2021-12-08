import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { BooksListResults } from '../components/booksTable/books-list-results'
import { BooksListToolbar } from '../components/booksTable/books-list-toolbar'
import { DashboardLayout } from '../components/dashboard-layout'
import useSWR from 'swr'

const getItem = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT);
  return await response.json();
};

const MainCatalogue = () => {
  const { data: book, error, mutate } = useSWR(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT, () => getItem());
  console.log(book, 'ffffffff')

  if (error) return <div>ошибка загрузки</div>
  if (!book) return <div>загрузка...</div>

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
          <BooksListToolbar onCreate={(newItem) => {
          mutate([...book, newItem]);
        }} />
          <Box sx={{ mt: 3 }}>
            <BooksListResults  books={book} />
          </Box>
        </Container>
      </Box>
    </>
  )
}
MainCatalogue.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}

export default MainCatalogue
