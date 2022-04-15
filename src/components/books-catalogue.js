import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Container } from '@mui/material';
import BooksListResults from '../components/books-list/books-list-results';
import BooksListToolbar from '../components/books-list/books-list-toolbar';
import { useState, useMemo } from 'react';
import { bookStatus } from '../common/constants/book-status-constants';
import { Book } from '../models/book-model';
import { SuggestedBook } from '../models/suggested-book-model';
import { BooksAPI } from '../api/books-api';
import { SuggestionAPI } from '../api/suggested-books-api';
import { category } from '../common/constants/category-constants';
import { language } from '../common/constants/language-constants';
import { suggestedBookStatus } from './../common/constants/suggested-book-status-constants';
import { useBoolean } from '../utils/boolean-hook';
import { PropTypes } from 'prop-types';
import { types } from '../types';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';
import SuggestedBooksListResults from './suggested-books-list/suggested-books-list-result';
import { SUGGESTED_BOOKS_PATH } from '../common/constants/route-constants';
import { useSelector } from 'react-redux';
import BooksInUseListResults from './books-in-use/books-in-use-list-results';

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
    } = props;
    const router = useRouter();
    const isNotSuggestedBooksPage = router.pathname !== SUGGESTED_BOOKS_PATH;
    const [search, setSearch] = useState('');
    const [isStartedSearch, setIsStartedSearch] = useState(false);
    const [isAddButtonOpen, setAddButtonOpen, setAddButtonClose] = useBoolean();
    const [isSuggestButtonOpen, setSuggestButtonOpen, setSuggestButtonClose] = useBoolean();
    const booksInUse = useSelector((state) => state.booksInUse.booksInUse);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    const searchedBooks = useMemo(() => {
        if (search.length > 1 && books) {
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

    const searchedSuggestedBooks = useMemo(() => {
        if (search.length > 1 && suggestedBooks) {
            setIsStartedSearch(true);
            return suggestedBooks.filter((book) => {
                return (
                    book.author.toLowerCase().includes(search.toLowerCase()) ||
                    book.title.toLowerCase().includes(search.toLowerCase())
                );
            });
        }
        return suggestedBooks;
    }, [search, suggestedBooks]);

    const searchedBooksInUse = useMemo(() => {
        if (search.length > 1 && booksInUse) {
            setIsStartedSearch(true);
            return booksInUse.filter((book) => {
                return (
                    book.author.toLowerCase().includes(search.toLowerCase()) ||
                    book.title.toLowerCase().includes(search.toLowerCase())
                );
            });
        }
        return booksInUse;
    }, [search, booksInUse]);

    const createBook = (newBook) => {
        let idCategory =
            newBook.category === category.professional.name
                ? category.professional.id
                : category.fiction.id;
        let idLanguage =
            newBook.language === language.english.name ? language.english.id : language.russian.id;
        let idStatus;
        switch (newBook.status) {
            case bookStatus.notAvailable.name:
                idStatus = bookStatus.notAvailable.id;
                break;
            case bookStatus.inUse.name:
                idStatus = bookStatus.inUse.id;
                break;
            default:
                idStatus = bookStatus.available.id;
        }
        const createdBook = new Book(
            0,
            newBook.title,
            newBook.author,
            idCategory,
            newBook.category,
            idLanguage,
            newBook.language,
            newBook.link,
            idStatus,
            newBook.status,
            newBook.description
        );

        BooksAPI.addBook(createdBook)
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
        let idCategory;
        switch (suggestedBook.category) {
            case category.professional.name:
                idCategory = category.professional.id;
                break;
            case category.fiction.name:
                idCategory = category.fiction.id;
                break;
            default:
                idCategory = 0;
        }
        let idLanguage;
        switch (suggestedBook.language) {
            case language.english.name:
                idLanguage = language.english.id;
                break;
            case language.russian.name:
                idLanguage = language.russian.id;
                break;
            default:
                idLanguage = 0;
        }

        const newSuggestedBook = new SuggestedBook(
            0,
            suggestedBook.title,
            suggestedBook.author,
            idCategory,
            suggestedBook.category,
            idLanguage,
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
};

export default BooksCatalogue;
