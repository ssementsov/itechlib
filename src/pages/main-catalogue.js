import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { BooksListResults } from "../components/books-list/books-list-results";
import { BooksListToolbar } from "../components/books-list/books-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { withSnackbar } from "notistack";
import { status } from "../common/constants/status-constants";
import { Book } from "../models/book-model";
import { apiBooks } from "../api/books/books";

const MainCatalogue = ({ enqueueSnackbar }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState();
  useEffect(() => {
    apiBooks
      .getAll()
      .then((res) => {
        setBooks(res.data);
        setIsLoaded(true);
      })
      .catch(function () {
        enqueueSnackbar("Something went wrong... Please retry.", {
          variant: "error",
        });
      });
  }, [enqueueSnackbar]);

  const createBook = (values) => {
    let idCategory = values.category === "PROFESSIONAL" ? 1 : 2;
    let idLanguage = values.language === "ENGLISH" ? 1 : 2;
    let idStatus;
    switch (values.status) {
      case status.notAvailable:
        idStatus = 2;
        break;
      case status.inUse:
        idStatus = 3;
        break;
      default:
        idStatus = 1;
    }
    const newBook = new Book(
      0,
      values.title,
      values.author,
      idCategory,
      values.category,
      idLanguage,
      values.language,
      values.link,
      idStatus,
      values.status,
      values.description
    );
    apiBooks
      .post(newBook)
      .then(function (res) {
        enqueueSnackbar("Your book has been added successfully!", {
          variant: "success",
        });
        const newBooksList = [res.data, ...books];
        setBooks(newBooksList);
        setIsLoaded(true);
      })
      .catch(function () {
        enqueueSnackbar("Something went wrong... Please retry.", {
          variant: "error",
        });
        setIsLoaded(true);
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
