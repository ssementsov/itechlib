import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import BooksCatalogue from '../components/books-catalogue';
import { SuggestionAPI } from './../api/suggested-books-api';
import { useInfiniteScroll } from './../utils/infinite-scroll-hook';
import { ProgressLinear } from '../common/UI/progressLinear';

const SuggestedBooksCatalogue = () => {
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const { isLoaded, setIsLoaded } = useInfiniteScroll(
        SuggestionAPI.getSuggestedBooksList,
        suggestedBooks,
        setSuggestedBooks,
        9
    );

    if (!isLoaded) {
        return <ProgressLinear />;
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
