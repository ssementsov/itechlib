import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { BooksListResults } from "../components/booksTable/books-list-results";
import { BooksListToolbar } from "../components/booksTable/books-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import useSWR from "swr";

const getItem = async () => {
  const response = await fetch(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT);
  return await response.json();
};

const MainCatalogue = () => {
  const { data: book, error } = useSWR(
    process.env.NEXT_PUBLIC_BOOKS_ENDPOINT,
    () => getItem()
  );

  if (error)
    return (
      <Typography sx={{ my: 8, mx: 4 }} variant="h4">
        Error of loading
      </Typography>
    );
  if (!book)
    return (
      <Typography sx={{ my: 8, mx: 4 }} variant="h4">
        Loading...
      </Typography>
    );

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
          <BooksListToolbar
            onCreate={(newItem) => {
              book.push(newItem);
              return book;
            }}
          />
          <Box sx={{ mt: 3 }}>
            <BooksListResults books={book} />
          </Box>
        </Container>
      </Box>
    </>
  );
};
MainCatalogue.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default MainCatalogue;
