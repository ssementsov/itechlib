import { useState } from 'react';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import BooksCatalogue from '../components/books-catalogue';
import { SuggestionAPI } from './../api/suggested-books-api';
import { useInfiniteScroll } from './../utils/infinite-scroll-hook';

const SuggestedBooksCatalogue = () => {
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const requestApi = (currentPage) => SuggestionAPI.getSuggestedBooksList([{
        field: 'language.name',
        value: 'ALL'
    }], currentPage);
    const { isLoaded, setIsLoaded } = useInfiniteScroll(requestApi, suggestedBooks, setSuggestedBooks);

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
