import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import BooksCatalogue from '../components/books-catalogue';
import { BooksAPI } from '../api/books-api';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';

const OwnerCatalogue = () => {
    const [books, setBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    const updateBooks = (booksList) => {
        setBooks(booksList);
    };

    const updateLoadingStatus = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        BooksAPI.getOwnerBooks()
            .then((res) => {
                setBooks(res.data);
                setIsLoaded(true);
            })
            .catch(function () {
                defaultErrorSnackbar();
            });
    }, [defaultErrorSnackbar, enqueueSnackbar]);

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
                title={'My books'}
                onUpdateBooks={updateBooks}
                onUpdateLoadingStatus={updateLoadingStatus}
            />
        );
    }
};
OwnerCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default OwnerCatalogue;
