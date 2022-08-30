import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';
import BooksListResults from '../components/books-list/books-list-results';
import BooksListToolbar from '../components/books-list/books-list-toolbar';
import { useMemo, useState } from 'react';
import { Book } from '../models/book-model';
import { SuggestedBook } from '../models/suggested-book-model';
import { BooksAPI } from '../api/books-api';
import { SuggestionAPI } from '../api/suggested-books-api';
import { suggestedBookStatus } from '../common/constants/suggested-book-status-constants';
import { useBoolean } from '../utils/hooks/boolean-hook';
import { PropTypes } from 'prop-types';
import { types } from '../types';
import { useCustomSnackbar } from '../utils/hooks/custom-snackbar-hook';
import SuggestedBooksListResults from './suggested-books-list/suggested-books-list-result';
import { SUGGESTED_BOOKS_PATH } from '../common/constants/route-constants';
import { useSelector } from 'react-redux';
import BooksInUseListResults from './books-in-use/books-in-use-list-results';
import {
    getBookCategoryId,
    getBookLanguageId,
    getBookStatusId,
} from './books-catalogue-helpers/get-properties-for-payload';
import { getFilteredBooksList } from './books-catalogue-helpers/get-filtered-books-list';

const BooksCatalogue = (props) => {
    const {
        books,
        suggestedBooks,
        title,
        onUpdateBooks,
        onUpdateSuggestedBooks,
        onUpdateLoadingStatus,
        isAllBooks,
        isMyBooks,
        isSuggestedBooksList,
        isBooksInUseList,
        onFiltering,
        onSorting,
    } = props;
    const router = useRouter();
    const isNotSuggestedBooksPage = router.pathname !== SUGGESTED_BOOKS_PATH;
    const [search, setSearch] = useState('');
    const [isStartedSearch, setIsStartedSearch] = useState(false);
    const [isAddButtonOpen, setAddButtonOpen, setAddButtonClose] = useBoolean();
    const [isSuggestButtonOpen, setSuggestButtonOpen, setSuggestButtonClose] = useBoolean();
    const booksInUse = useSelector((state) => state.booksInUse.booksInUse);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    const searchedBooks = useMemo(() => getFilteredBooksList(search, books, setIsStartedSearch), [books, search]);
    const searchedSuggestedBooks = useMemo(() => getFilteredBooksList(search, suggestedBooks, setIsStartedSearch), [search, suggestedBooks]);
    const searchedBooksInUse = useMemo(() => getFilteredBooksList(search, booksInUse, setIsStartedSearch), [search, booksInUse]);

    const createBook = (newBook) => {
        const categoryId = getBookCategoryId(newBook);
        const languageId = getBookLanguageId(newBook);
        const idStatus = getBookStatusId(newBook);

        const createdBook = new Book(
            0,
            newBook.title,
            newBook.author,
            categoryId,
            newBook.category,
            languageId,
            newBook.language,
            newBook.link,
            idStatus,
            newBook.status,
            newBook.description
        );

        const newBookFormData = new FormData();
        newBookFormData.append('withOwnerBookDto', JSON.stringify(createdBook));
        newBookFormData.append('file', newBook.file);

        BooksAPI.addBook(newBookFormData)
            .then((res) => {
                setAddButtonClose();
                if (books) {
                    const newBooksList = [res.data, ...books];
                    onUpdateBooks(newBooksList);
                    onUpdateLoadingStatus(true);
                }
                enqueueSnackbar('Your book has been added successfully!', {
                    variant: 'success',
                });
            })
            .catch(() => {
                defaultErrorSnackbar();
                onUpdateLoadingStatus(true);
            });
    };

    const createSuggestedBook = (suggestedBook) => {
        const categoryId = getBookCategoryId(suggestedBook);
        const languageId = getBookLanguageId(suggestedBook);

        const newSuggestedBook = new SuggestedBook(
            0,
            suggestedBook.title,
            suggestedBook.author,
            categoryId,
            suggestedBook.category,
            languageId,
            suggestedBook.language,
            suggestedBookStatus.active.id,
            suggestedBookStatus.active.name,
            suggestedBook.link,
            suggestedBook.comment
        );

        SuggestionAPI.createSuggestedBook(newSuggestedBook)
            .then((res) => {
                setSuggestButtonClose();
                if (suggestedBooks) {
                    const previousBooksList =
                        suggestedBooks.length > 8
                            ? suggestedBooks.filter(
                                  (item) => item.id !== suggestedBooks[suggestedBooks.length - 1].id
                              )
                            : suggestedBooks;
                    const newBooksList = [res.data, ...previousBooksList];
                    onUpdateSuggestedBooks(newBooksList);
                    onUpdateLoadingStatus(true);
                }
                if (isNotSuggestedBooksPage) {
                    router.replace(SUGGESTED_BOOKS_PATH);
                }
                enqueueSnackbar('Book suggestion has been added successfully!', {
                    variant: 'success',
                });
            })
            .catch(() => {
                defaultErrorSnackbar();
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
                        onCreate={{
                            add: createBook,
                            suggest: createSuggestedBook,
                        }}
                        open={{
                            add: isAddButtonOpen,
                            suggest: isSuggestButtonOpen,
                        }}
                        onOpen={{
                            add: setAddButtonOpen,
                            suggest: setSuggestButtonOpen,
                        }}
                        onClose={{
                            add: setAddButtonClose,
                            suggest: setSuggestButtonClose,
                        }}
                        title={title}
                    />
                    <Box sx={{ mt: 3 }}>
                        {isSuggestedBooksList && (
                            <SuggestedBooksListResults
                                books={searchedSuggestedBooks}
                                isStartedSearch={isStartedSearch}
                                suggestedBooks={suggestedBooks}
                                onUpdateSuggestedBooks={onUpdateSuggestedBooks}
                                onFiltering={onFiltering}
                                onSorting={onSorting}
                            />
                        )}
                        {isBooksInUseList && <BooksInUseListResults books={searchedBooksInUse} />}
                        {(isAllBooks || isMyBooks) && (
                            <BooksListResults
                                books={searchedBooks}
                                isStartedSearch={isStartedSearch}
                            />
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    );
};

BooksCatalogue.propTypes = {
    books: PropTypes.arrayOf(types.bookTypes),
    title: PropTypes.string,
    onUpdateBooks: PropTypes.func,
    onUpdateSuggestedBooks: PropTypes.func,
    onUpdateLoadingStatus: PropTypes.func,
    isSuggestedBooksList: PropTypes.bool,
    onFiltering: PropTypes.func,
};

export default BooksCatalogue;
