import { useCallback, useEffect, useState } from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import BooksCatalogue from '../components/books-catalogue';
import { SuggestionAPI } from '../api/suggested-books-api';
import { useInfiniteScroll } from '../utils/hooks/infinite-scroll-hook';
import { ProgressLinear } from '../common/UI/progressLinear';
import { SortDirection, SortFields } from '../common/constants';

const SuggestedBooksCatalogue = () => {
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const [filters, setFilters] = useState([]);
    const [sortings, setSortings] = useState({ sortDirection: SortDirection.desc, sortField: SortFields.createDate });
    const requestApi = (currentPage) => SuggestionAPI.getSuggestedBooksList(filters, sortings, currentPage);
    const {
        isLoaded,
        setIsLoaded,
        setEmptyPage,
        setCurrentPage,
    } = useInfiniteScroll(requestApi, suggestedBooks, setSuggestedBooks);

    const getSuggestedBooksListHandler = useCallback((data) => {
        setEmptyPage(false);
        setCurrentPage(1);
        setSuggestedBooks([...data]);
    }, [setCurrentPage, setEmptyPage]);

    useEffect(() => {
        SuggestionAPI.getSuggestedBooksList(filters, sortings)
            .then(res => {
                getSuggestedBooksListHandler(res.data);
            });
    }, [filters, getSuggestedBooksListHandler, sortings]);

    const generateFilters = (value, name) => {
        const newFilter = {
            field: `${name}.name`,
            value: value,
        };
        setFilters(prevFilterList => {
            if (prevFilterList.length === 0) {
                if (!value) {
                    return prevFilterList;
                } else {
                    return [...prevFilterList, newFilter];
                }
            } else {
                const isExistedFilterType = prevFilterList.some(filter => filter.field === `${name}.name`);
                if (isExistedFilterType) {
                    return prevFilterList.map(filter => {
                        if (filter.field === `${name}.name`) {
                            return {
                                ...filter,
                                value: value,
                            };
                        } else {
                            return filter;
                        }
                    }).filter(filter => filter.value !== '');
                } else {
                    if (!value) {
                        return prevFilterList;
                    } else {
                        return [...prevFilterList, newFilter];
                    }
                }
            }
        });
    };

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
                onFiltering={generateFilters}
                onSorting={setSortings}
            />
        );
    }
};
SuggestedBooksCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default SuggestedBooksCatalogue;
