import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";
import { BooksListResults } from "../components/booksTable/books-list-results";
import { BooksListToolbar } from "../components/booksTable/books-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { withSnackbar } from "notistack";

const axios = require("axios");

const MainCatalogue = ({ enqueueSnackbar }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/books")
      .then(function (res) {
        console.log(res.data);
        setBooks(res.data);
        setIsLoaded(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const createBook = (newBook) => {
    axios
      .post("http://localhost:8081/api/books", {
        author: newBook.author,
        title: newBook.title,
        description: newBook.description,
        link: newBook.linkToWeb,
        category: {
          id: 1,
          name: newBook.category,
        },
        id: 1,
        language: {
          id: 1,
          name: newBook.language,
        },
      })
      .then(function () {
        enqueueSnackbar("Your book has been added successfully!", {
          variant: "success",
        });
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
