import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { LOGIN_PATH } from '../../common/constants/route-constants';
import { useCustomSnackbar } from './custom-snackbar-hook';

export const useInfiniteScroll = (api, items, setItems) => {
    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFetchingWhileScrolling, setIsFetchingWhileScrolling] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [emptyPage, setEmptyPage] = useState(false);
    const { defaultErrorSnackbar } = useCustomSnackbar();

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
        if (isFetchingWhileScrolling && router.isReady) {
            api(currentPage)
                .then((res) => {
                    if (res.data.length === 0 && currentPage > 0) {
                        setEmptyPage(true);
                    } else {
                        setItems([...items, ...res.data]);
                        setCurrentPage((prev) => prev + 1);
                        setIsLoaded(true);
                    }
                })
                .catch((err) => {
                    if (err.response.status === 403) {
                        router.replace(LOGIN_PATH);
                        localStorage.removeItem('token');
                    } else {
                        defaultErrorSnackbar();
                    }
                })
                .finally(() => {
                    setIsFetchingWhileScrolling(false);
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultErrorSnackbar, router, isFetchingWhileScrolling]);

    return {
        isLoaded: isLoaded,
        setIsLoaded: setIsLoaded,
        setEmptyPage: setEmptyPage,
        setCurrentPage: setCurrentPage,
    };
};
