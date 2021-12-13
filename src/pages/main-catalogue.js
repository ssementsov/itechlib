import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { BooksListResults } from "../components/booksTable/books-list-results";
import { BooksListToolbar } from "../components/booksTable/books-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { withSnackbar } from "notistack";

const MainCatalogue = ({ enqueueSnackbar }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT)
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setBooks(result);
      });
  });

  const createBook = async (body) => {
    fetch(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setBooks(result);
        enqueueSnackbar("Your book has been added successfully!", {
          variant: "success",
        });
      })
      .catch(() => {
        setIsLoaded(true);
        enqueueSnackbar("Something went wrong. Please retry...", {
          variant: "error",
        });
      });
  };

  if (!isLoaded) {
    return (
      <Typography sx={{ my: 8, mx: 4 }} variant="h4">
        Loading...
      </Typography>
    );
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
    );
  }
};
MainCatalogue.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withSnackbar(MainCatalogue);
