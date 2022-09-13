import React, { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { BooksAPI } from '../api/books-api';
import { useInfiniteScroll } from '../utils/hooks/infinite-scroll-hook';
import { ProgressLinear } from '../common/UI/progressLinear';

const BooksCatalogue = React.lazy(() => import('../components/books-catalogue'));

const MainCatalogue = () => {
    const [books, setBooks] = useState([]);
    const requestApi = (currentPage) => BooksAPI.getAllBooks(currentPage);
    const { isLoaded, setIsLoaded } = useInfiniteScroll(requestApi, books, setBooks);

    if (!isLoaded) {
        return <ProgressLinear />;
    } else {
        return (
            <React.Suspense fallback={<ProgressLinear />}>
                <BooksCatalogue
                    books={books}
                    title={'Main catalogue'}
                    onUpdateBooks={setBooks}
                    onUpdateLoadingStatus={setIsLoaded}
                    isAllBooks={true}
                />
            </React.Suspense>
        );
    }
};
MainCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default MainCatalogue;
