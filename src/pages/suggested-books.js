import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import BooksCatalogue from '../components/books-catalogue';
import { SuggestionAPI } from './../api/suggested-books-api';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';
import { LOGIN_PATH } from '../common/constants/route-constants';

const SuggestedBooksCatalogue = () => {
    const router = useRouter();
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isEdited, setIsEdited] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    const updateBooks = (booksList) => {
        setSuggestedBooks(booksList);
    };

    const updateLoadingStatus = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        SuggestionAPI.getSuggestedBooksList(1, 10)
            .then((res) => {
                setSuggestedBooks(res.data);
                setIsLoaded(true);
                setIsEdited(false);
                setIsDeleted(false);
            })
            .catch((err) => {
                if (err.response.status === 403) {
                    router.replace(LOGIN_PATH);
                    localStorage.removeItem('token');
                } else {
                    defaultErrorSnackbar();
                }
            });
    }, [defaultErrorSnackbar, enqueueSnackbar, router, isEdited, isDeleted]);

    if (!isLoaded) {
        return (
            <Typography sx={{ my: 8, mx: 4 }} variant="h4">
                Loading...
            </Typography>
        );
    } else {
        return (
            <BooksCatalogue
                isSuggestedBooksList={true}
                suggestedBooks={suggestedBooks}
                title={'Suggested books'}
                onUpdateSuggestedBooks={updateBooks}
                onUpdateLoadingStatus={updateLoadingStatus}
                setIsEdited={setIsEdited}
                setIsDeleted={setIsDeleted}
            />
        );
    }
};
SuggestedBooksCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default SuggestedBooksCatalogue;
