
import {useEffect, useState} from 'react';
import { DashboardLayout } from '../components/dashboard-layout';
import BooksCatalogue from '../components/books-catalogue';
import { SuggestionAPI } from './../api/suggested-books-api';
import { useInfiniteScroll } from './../utils/infinite-scroll-hook';
import { ProgressLinear } from '../common/UI/progressLinear';

const SuggestedBooksCatalogue = () => {
    const [suggestedBooks, setSuggestedBooks] = useState([]);
    const [filters, setFilters] = useState([]);
    const requestApi = (currentPage) => SuggestionAPI.getSuggestedBooksList(filters, currentPage);
    const {
        isLoaded,
        setIsLoaded,
        setEmptyPage,
        setCurrentPage
    } = useInfiniteScroll(requestApi, suggestedBooks, setSuggestedBooks);

    useEffect(() => {
        SuggestionAPI.getSuggestedBooksList(filters, 0)
            .then(res => {
                setEmptyPage(false);
                setCurrentPage(1);
                setSuggestedBooks([...res.data]);
            })
    }, [filters, setCurrentPage, setEmptyPage])

    const generateFilters = (value, name) => {
        const newFilter = {
            field: `${name}.name`,
            value: value
        }
        setFilters(prevFilterList => {
            if(prevFilterList.length === 0) {
                if(value === 'ALL') {
                    return prevFilterList;
                } else {
                    return [...prevFilterList, newFilter];
                }
            } else {
                const isExistedFilterType = prevFilterList.some(filter => filter.field === `${name}.name`);
                if(isExistedFilterType) {
                    const newFilterList = prevFilterList.map(filter => {
                        if(filter.field === `${name}.name`) {
                            return {
                                ...filter,
                                value: value
                            }
                        } else {
                            return filter
                        }
                    }).filter(filter => filter.value !== 'ALL')
                    return newFilterList
                } else {
                    if(value === 'ALL') {
                        return prevFilterList;
                    } else {
                        return [...prevFilterList, newFilter];
                    }
                }
            }
        })
    }

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
            />
        );
    }
};
SuggestedBooksCatalogue.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default SuggestedBooksCatalogue;
