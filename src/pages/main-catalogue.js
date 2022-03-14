import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { BooksAPI } from '../api/books-api';
import BooksCatalogue from '../components/books-catalogue';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';
import { useRouter } from 'next/router';
import { LOGIN_PATH } from '../common/constants/route-constants';

const MainCatalogue = () => {
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { defaultErrorSnackbar } = useCustomSnackbar();

    const updateBooks = (booksList) => {
        setBooks(booksList);
    };

    useEffect(() => {
        BooksAPI.getAllBooks()
            .then((res) => {
                setBooks(res.data);
                setIsLoaded(true);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    router.replace(LOGIN_PATH);
                    localStorage.removeItem('token');
                } else {
                    defaultErrorSnackbar();
                }
            });
    }, [defaultErrorSnackbar, router]);

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
                onUpdateBooks={updateBooks}
                onUpdateLoadingStatus={setIsLoaded}
            />
        );
    }
};
MainCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default MainCatalogue;
