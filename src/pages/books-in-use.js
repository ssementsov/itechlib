import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';
import { fetchBooksInUse } from '../store/reducers/BooksInUseSlice';
import BooksCatalogue from './../components/books-catalogue';

const BooksInUseCatalogue = () => {
    const dispatch = useDispatch();
    const { defaultErrorSnackbar } = useCustomSnackbar();
    const isLoading = useSelector((state) => state.booksInUse.isLoading);
    const isError = useSelector((state) => state.booksInUse.error);

    useEffect(() => {
        dispatch(fetchBooksInUse());
        if (isError) {
            defaultErrorSnackbar();
        }
    }, [defaultErrorSnackbar, dispatch, isError]);

    if (isLoading) {
        return (
            <Typography sx={{ my: 8, mx: 4 }} variant="h4">
                Loading...
            </Typography>
        );
    } else {
        return <BooksCatalogue title={'Books in use'} isBooksInUseList={true} />;
    }
};
BooksInUseCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default BooksInUseCatalogue;
