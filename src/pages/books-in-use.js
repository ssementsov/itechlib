import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DashboardLayout } from '../components/dashboard-layout';
import { useCustomSnackbar } from '../utils/hooks/custom-snackbar-hook';
import { fetchBooksInUse } from '../store/reducers/BooksInUseSlice';
import { ProgressLinear } from '../common/UI/progressLinear';

const BooksCatalogue = React.lazy(() => import('./../components/books-catalogue'));

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
        return <ProgressLinear />;
    } else {
        return (
            <React.Suspense fallback={<ProgressLinear />}>
                <BooksCatalogue title={'Books in use'} isBooksInUseList={true} />
            </React.Suspense>
        );
    }
};
BooksInUseCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default BooksInUseCatalogue;
