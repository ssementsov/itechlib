import { useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import { BooksAPI } from '../api/books-api';
import BooksCatalogue from '../components/books-catalogue';
import { useInfiniteScroll } from '../utils/infinite-scroll-hook';
import { ProgressLinear } from '../common/UI/progressLinear';

const MainCatalogue = () => {
    const [books, setBooks] = useState([]);
    const requestApi = (currentPage) => BooksAPI.getAllBooks(currentPage);
    const { isLoaded, setIsLoaded } = useInfiniteScroll(requestApi, books, setBooks);

    if (!isLoaded) {
        return <ProgressLinear/>;
    } else {
        return (
            <BooksCatalogue
                books={books}
                title={'Main catalogue'}
                onUpdateBooks={setBooks}
                onUpdateLoadingStatus={setIsLoaded}
                isAllBooks={true}
            />
        );
    }
};
MainCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default MainCatalogue;
