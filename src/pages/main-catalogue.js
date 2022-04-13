import { useState } from 'react';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { BooksAPI } from '../api/books-api';
import BooksCatalogue from '../components/books-catalogue';
import { useInfiniteScroll } from '../utils/infinite-scroll-hook';

const MainCatalogue = () => {
    const [books, setBooks] = useState([]);
    const { isLoaded, setIsLoaded } = useInfiniteScroll(BooksAPI.getAllBooks, books, setBooks, 15);

    if (!isLoaded) {
        return (
            <Typography sx={{ my: 8, mx: 4 }} variant="h4">
                Loading...
            </Typography>
        );
    } else {
        return (
            <BooksCatalogue
                books={books}
                title={'Main catalogue'}
                onUpdateBooks={setBooks}
                onUpdateLoadingStatus={setIsLoaded}
                isAllBooks={true}
            />
        );
    }
};
MainCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default MainCatalogue;
