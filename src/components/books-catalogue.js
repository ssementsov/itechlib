import Head from "next/head";
import { Box, Container } from "@mui/material";
import BooksListResults from "../components/books-list/books-list-results";
import BooksListToolbar from "../components/books-list/books-list-toolbar";
import { useState, useMemo } from "react";
import { withSnackbar } from "notistack";
import { status } from "../common/constants/status-constants";
import { Book } from "../models/book-model";
import { BooksAPI } from "../api/books-api";
import { category } from "../common/constants/category-constants";
import { language } from "../common/constants/language-constants";
import { useBoolean } from "../utils/boolean-hook";
import { PropTypes } from "prop-types";

const BooksCatalogue = (props) => {
  const {
    enqueueSnackbar,
    books,
    title,
    onUpdateBooks,
    onUpdateLoadingStatus,
  } = props;
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
      .then((res) => {
        setAddButtonClose();
        enqueueSnackbar("Your book has been added successfully!", {
          variant: "success",
        });
        const newBooksList = [res.data, ...books];
        onUpdateBooks(newBooksList);
        onUpdateLoadingStatus();
      })
      .catch(() => {
        enqueueSnackbar("Something went wrong... Please retry.", {
          variant: "error",
        });
        onUpdateLoadingStatus();
      });
  };

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
            title={title}
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
};

BooksCatalogue.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    language: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    link: PropTypes.string,
    status: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
  title: PropTypes.string,
  onUpdateBooks: PropTypes.func,
  onUpdateLoadingStatus: PropTypes.func,
  enqueueSnackbar: PropTypes.func,
};

export default withSnackbar(BooksCatalogue);
