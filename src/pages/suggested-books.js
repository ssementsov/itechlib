import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import BooksCatalogue from '../components/books-catalogue';
import { SuggestionAPI } from './../api/suggested-books-api';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';

const SuggestedBooksCatalogue = () => {
    const router = useRouter();
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const { defaultErrorSnackbar } = useCustomSnackbar();

    const [isFetchingWhileScrolling, setIsFetchingWhileScrolling] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [emptyPage, setEmptyPage] = useState(false);

    useEffect(() => {
        const scrollHandler = (e) => {
            if (
                e.target.documentElement.scrollHeight -
                    (e.target.documentElement.scrollTop + window.innerHeight) <
                    100 &&
                !emptyPage
            ) {
                setIsFetchingWhileScrolling(true);
            }
        };

        document.addEventListener('scroll', scrollHandler);
        return () => {
            document.removeEventListener('scroll', scrollHandler);
        };
    }, [emptyPage]);

    useEffect(() => {
        if (isFetchingWhileScrolling) {
            SuggestionAPI.getSuggestedBooksList(currentPage, 9)
                .then((res) => {
                    if (res.data.length === 0 && currentPage > 0) {
                        setEmptyPage(true);
                    } else {
                        setSuggestedBooks([...suggestedBooks, ...res.data]);
                        setCurrentPage((prev) => prev + 1);
                        setIsLoaded(true);
                    }
                })
                .catch(() => {
                    defaultErrorSnackbar();
                })
                .finally(() => {
                    setIsFetchingWhileScrolling(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultErrorSnackbar, router, isFetchingWhileScrolling]);

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
                onUpdateSuggestedBooks={setSuggestedBooks}
                onUpdateLoadingStatus={setIsLoaded}
            />
        );
    }
};
SuggestedBooksCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default SuggestedBooksCatalogue;
