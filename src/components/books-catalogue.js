import Head from 'next/head';
import { Box, Container } from '@mui/material';
import BooksListResults from '../components/books-list/books-list-results';
import BooksListToolbar from '../components/books-list/books-list-toolbar';
import { useState, useMemo } from 'react';
import { status } from '../common/constants/status-constants';
import { Book } from '../models/book-model';
import { BooksAPI } from '../api/books-api';
import { category } from '../common/constants/category-constants';
import { language } from '../common/constants/language-constants';
import { useBoolean } from '../utils/boolean-hook';
import { PropTypes } from 'prop-types';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';

const BooksCatalogue = (props) => {
    const { books, title, onUpdateBooks, onUpdateLoadingStatus } = props;
    const [search, setSearch] = useState('');
    const [isStartedSearch, setIsStartedSearch] = useState(false);
    const [isAddButtonOpen, setAddButtonOpen, setAddButtonClose] = useBoolean();
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

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

    const createBook = (newBook) => {
        let idCategory =
            newBook.category === category.professional.name
                ? category.professional.id
                : category.fiction.id;
        let idLanguage =
            newBook.language === language.english.name
                ? language.english.id
                : language.russian.id;
        let idStatus;
        switch (newBook.status) {
            case status.notAvailable.name:
                idStatus = status.notAvailable.id;
                break;
            case status.inUse.name:
                idStatus = status.inUse.id;
                break;
            default:
                idStatus = status.available.id;
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
                enqueueSnackbar('Your book has been added successfully!', {
                    variant: 'success',
                });
                const newBooksList = [res.data, ...books];
                onUpdateBooks(newBooksList);
                onUpdateLoadingStatus(true);
            })
            .catch(() => {
                defaultErrorSnackbar();
                onUpdateLoadingStatus(true);
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
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        fileInfo: PropTypes.object,
        category: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }).isRequired,
        language: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }).isRequired,
        description: PropTypes.string.isRequired,
        link: PropTypes.string,
        status: PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string,
        }).isRequired,
        rate: PropTypes.number.isRequired,
        reader: PropTypes.bool.isRequired,
        owner: PropTypes.object,
    }),
    title: PropTypes.string,
    onUpdateBooks: PropTypes.func,
    onUpdateLoadingStatus: PropTypes.func,
};

export default BooksCatalogue;
