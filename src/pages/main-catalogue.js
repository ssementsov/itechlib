import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { BooksAPI } from '../api/books-api';
import { api } from '../api/api';
import BooksCatalogue from '../components/books-catalogue';
import { useErrorNotice } from '../utils/error-notice-hook';

const MainCatalogue = () => {
    const [books, setBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [setMainError] = useErrorNotice();

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.setupAuth(token);

        BooksAPI.getAllBooks()
            .then((res) => {
                setBooks(res.data);
                setIsLoaded(true);
            })
            .catch(function () {
                setMainError();
            });
    }, [setMainError]);

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
            />
        );
    }
};
MainCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default MainCatalogue;
