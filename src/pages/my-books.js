import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { BooksAPI } from '../api/books-api';
import { useInfiniteScroll } from '../utils/hooks/infinite-scroll-hook';
import { ProgressLinear } from '../common/UI/progressLinear';
import React from 'react';

const BooksCatalogue = React.lazy(() => import('../components/books-catalogue'));

const OwnerCatalogue = () => {
    const [books, setBooks] = useState([]);
    const requestApi = (currentPage) => BooksAPI.getOwnerBooks(currentPage);
    const { isLoaded, setIsLoaded } = useInfiniteScroll(requestApi, books, setBooks);

    if (!isLoaded) {
        return <ProgressLinear />;
    } else {
        return (
            <React.Suspense fallback={<ProgressLinear />}>
                <BooksCatalogue
                    books={books}
                    title={'My books'}
                    onUpdateBooks={setBooks}
                    onUpdateLoadingStatus={setIsLoaded}
                    isMyBooks={true}
                />
            </React.Suspense>
        );
    }
};
OwnerCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default OwnerCatalogue;
