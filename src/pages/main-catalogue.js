import Head from "next/head";
import { useRouter } from "next/router";
import { Box, Container, Typography } from "@mui/material";
import BooksListResults from "../components/books-list/books-list-results";
import BooksListToolbar from "../components/books-list/books-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect, useMemo } from "react";
import { withSnackbar } from "notistack";
import { status } from "../common/constants/status-constants";
import { Book } from "../models/book-model";
import { BooksAPI } from "../api/books-api";
import { category } from "./../common/constants/category-constants";
import { language } from "./../common/constants/language-constants";
import { api } from "../api/api";
import { useBoolean } from "./../utils/boolean-hook";
import { MAIN_CATALOGUE_PATH } from "../common/constants/route-constants";

const MainCatalogue = ({ enqueueSnackbar }) => {
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [isStartedSearch, setIsStartedSearch] = useState(false);
  const [isAddButtonOpen, setAddButtonOpen, setAddButtonClose] = useBoolean();

  const searchedBooks = useMemo(() => {
    if (search.length > 1) {
      setIsStartedSearch(true);
      return books.filter((book) => {
        return (
          book.author.toLowerCase().includes(search.toLowerCase()) ||
          book.title.toLowerCase().includes(search.toLowerCase())
        );
      });
    }
    return books;
  }, [books, search]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    api.setupAuth(token);

    BooksAPI.getAllBooks()
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
    let idCategory = values.category === category.professional ? 1 : 2;
    let idLanguage = values.language === language.english ? 1 : 2;
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

    BooksAPI.addBook(newBook)
      .then(function (res) {
        setAddButtonClose();
        router.push(MAIN_CATALOGUE_PATH);
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
            <BooksListToolbar
              search={search}
              setSearch={setSearch}
              onCreate={createBook}
              open={isAddButtonOpen}
              setOpen={setAddButtonOpen}
              onClose={setAddButtonClose}
            />
            <Box sx={{ mt: 3 }}>
              <BooksListResults
                books={searchedBooks}
                isStartedSearch={isStartedSearch}
              />
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
