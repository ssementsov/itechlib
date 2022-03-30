import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { SuggestedBookCard } from './suggested-book-card';
import { types } from '../../types/index.js';
import SuggestedBookModal from '../suggested-book/suggested-book-modal';
import { useBoolean } from '../../utils/boolean-hook';
import { SuggestionAPI } from '../../api/suggested-books-api';
import { useCustomSnackbar } from '../../utils/custom-snackbar-hook';
import { getLinkAndAltTextofBookIcon } from '../../utils/functions/get-link-and-alt-text-of-book-icon';
import EditSuggestedBookModal from './../suggested-book/add-edit-suggested-book/edit-suggested-book-modal';
import { SuggestedBook } from '../../models/suggested-book-model';
import { category } from '../../common/constants/category-constants';
import { language } from '../../common/constants/language-constants';
import { suggestedBookStatus } from '../../common/constants/suggested-book-status-constants';

const SuggestedBooksListResults = (props) => {
    const { books, isStartedSearch, suggestedBooks, onUpdateSuggestedBooks } = props;
    const [suggestedBook, setSuggestedBook] = useState({});
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();
    const [isSuggestBookModalOpen, setSuggestBookModalOpen, setSuggestBookModalClose] =
        useBoolean();
    const [isEditButtonOpen, setEditButtonOpen, setEditButtonClose] = useBoolean();
    const filters = ['CATEGORY', 'LANGUAGE', 'POPULARITY'];

    const viewSuggestedBookInfo = (bookId) => {
        SuggestionAPI.getSuggestedBook(bookId)
            .then((res) => {
                setSuggestedBook(res.data);
                setSuggestBookModalOpen();
            })
            .catch(() => {
                defaultErrorSnackbar();
            });
    };

    const editButtonOpenHandler = () => {
        setEditButtonOpen();
        setSuggestBookModalClose();
    };
    const editButtonCloseHandler = () => {
        setEditButtonClose();
        setSuggestBookModalOpen();
    };

    const editSuggestionBook = (newBook) => {
        let idCategory;
        switch (newBook.category) {
            case category.professional.name:
                idCategory = category.professional.id;
                break;
            case category.fiction.name:
                idCategory = category.fiction.id;
                break;
            default:
                idCategory = '';
        }
        let idLanguage;
        switch (newBook.language) {
            case language.english.name:
                idLanguage = language.english.id;
                break;
            case language.russian.name:
                idLanguage = language.russian.id;
                break;
            default:
                idLanguage = '';
        }

        const editedBook = new SuggestedBook(
            newBook.id,
            newBook.title,
            newBook.author,
            idCategory,
            newBook.category,
            idLanguage,
            newBook.language,
            suggestedBookStatus.active.id,
            suggestedBookStatus.active.name,
            newBook.link,
            newBook.comment
        );

        SuggestionAPI.changeBookInfo(editedBook)
            .then((res) => {
                editButtonCloseHandler();
                setSuggestedBook(res.data);
                onUpdateSuggestedBooks(
                    suggestedBooks.map((book) => (book.id === res.data.id ? res.data : book))
                );
                enqueueSnackbar('Book suggestion has been added successfully!', {
                    variant: 'success',
                });
            })
            .catch(() => {
                defaultErrorSnackbar();
            });
    };

    const deleteSuggestedBook = (deletedBook, closeDeleteModal) => {
        SuggestionAPI.removeBook(deletedBook.id)
            .then(() => {
                closeDeleteModal();
                setSuggestBookModalClose();
                onUpdateSuggestedBooks(suggestedBooks.filter((book) => book.id !== deletedBook.id));
                enqueueSnackbar('Book suggestion was deleted successfully!', {
                    variant: 'success',
                });
            })
            .catch(() => {
                defaultErrorSnackbar();
            });
    };

    return (
        <>
            <SuggestedBookModal
                open={isSuggestBookModalOpen}
                onClose={setSuggestBookModalClose}
                book={suggestedBook}
                onOpen={editButtonOpenHandler}
                onDelete={deleteSuggestedBook}
            />
            <EditSuggestedBookModal
                open={isEditButtonOpen}
                onClose={editButtonCloseHandler}
                onEdit={editSuggestionBook}
                book={suggestedBook}
            />

            <Card
                sx={{
                    padding: '15px',
                }}
            >
                <Stack
                    spacing={2}
                    direction="row"
                    sx={{
                        justifyContent: 'space-evenly',
                        padding: '5px 0 10px',
                    }}
                >
                    {filters.map((filter) => {
                        return (
                            <Button variant="text" color="info" key={filter}>
                                {filter}
                            </Button>
                        );
                    })}
                </Stack>
                <Divider sx={{ mb: 2 }} />
                {books.length ? (
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {books.map((book) => {
                            const { bookIconLink, altText } = getLinkAndAltTextofBookIcon(book);
                            return (
                                <Grid
                                    item
                                    xs={4}
                                    sm={4}
                                    md={4}
                                    key={book.id + Math.random()}
                                    onClick={() => viewSuggestedBookInfo(book.id)}
                                >
                                    <SuggestedBookCard
                                        link={bookIconLink}
                                        book={book}
                                        altText={altText}
                                    />
                                </Grid>
                            );
                        })}
                    </Grid>
                ) : (
                    <Typography
                        sx={{
                            textAlign: 'center',
                            color: 'action.active',
                        }}
                    >
                        {isStartedSearch ? 'No books found' : 'No suggested books yet!'}
                    </Typography>
                )}
            </Card>
        </>
    );
};

SuggestedBooksListResults.propTypes = {
    isStartedSearch: PropTypes.bool,
    books: PropTypes.arrayOf(types.suggestedBookTypes),
};

export default SuggestedBooksListResults;
