import PropTypes from 'prop-types';
import { Button, Card, Divider, Grid, Stack, Typography } from '@mui/material';
import { category } from './../../common/constants/category-constants';
import { SuggestedBookCard } from './suggested-book-card';
import { types } from '../../types/index.js';

const SuggestedBooksListResults = ({ books, isStartedSearch }) => {
    const sortedBooks = books.sort((a, b) => (a.id < b.id ? 1 : -1));
    const filters = ['CATEGORY', 'LANGUAGE', 'POPULARITY'];
    return (
        <Card
            sx={{
                padding: '15px',
            }}
        >
            <Stack
                spacing={2}
                direction="row"
                sx={{ justifyContent: 'space-evenly', padding: '5px 0 10px' }}
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
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {sortedBooks.map((book) => {
                        const fiction =
                            category.fiction.name === book.category.name;
                        return (
                            <Grid item xs={4} sm={4} md={4} key={book.id}>
                                <SuggestedBookCard
                                    isFiction={fiction}
                                    book={book}
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
                    {isStartedSearch
                        ? 'No books found'
                        : 'No suggested books yet!'}
                </Typography>
            )}
        </Card>
    );
};

SuggestedBooksListResults.propTypes = {
    isStartedSearch: PropTypes.bool,
    books: PropTypes.arrayOf(types.suggestedBookTypes),
};

export default SuggestedBooksListResults;
