import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DashboardLayout } from '../components/dashboard-layout';
import { useCustomSnackbar } from '../utils/hooks/custom-snackbar-hook';
import { fetchBooksInUse } from '../store/reducers/BooksInUseSlice';
import BooksCatalogue from './../components/books-catalogue';
import { ProgressLinear } from '../common/UI/progressLinear';

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
        return <ProgressLinear/>;
    } else {
        return <BooksCatalogue title={'Books in use'} isBooksInUseList={true} />;
    }
};
BooksInUseCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default BooksInUseCatalogue;
