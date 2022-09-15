import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import BookDetails from '../../../components/book/book-details';
import UploadImageCard from '../../../components/upload-image-card';
import { BooksAPI } from '../../../api/books-api';
import { useCustomSnackbar } from '../../../utils/hooks/custom-snackbar-hook';
import { LOGIN_PATH, YOU_CAN_UPLOAD_IMAGE } from '../../../common/constants';
import { GoBackButton, ProgressLinear } from '../../../common/UI';
import { BookingsAPI } from '../../../api/bookings-api';
import { useDispatch, useSelector } from 'react-redux';
import { setLoadingButton, setRedirectPath } from '../../../store/reducers';

function BookPreviewPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const id = router.query.id;
    const [book, setBook] = useState([]);
    const isCurrentUserReader = book.bookingInfoDto?.currentUserReader;
    const [bookingInfo, setBookingInfo] = useState({});
    const [isLoadedBookInfo, setIsLoadedBookInfo] = useState(false);
    const [isLoadedBookingInfo, setIsLoadedBookingInfo] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isUploadedBookCover, setIsUploadedBookCover] = useState(false);
    const [isUpdatedBookCover, setIsUpdatedBookCover] = useState(false);
    const { defaultErrorSnackbar } = useCustomSnackbar();
    const redirectPath = useSelector(state => state.user.redirectPath);

    const addBookCover = (file, onClose) => {
        dispatch(setLoadingButton(true));
        BooksAPI.addBookCover(file)
            .then(() => {
                onClose();
                setIsUploadedBookCover(true);
                setIsUpdatedBookCover(true);
            })
            .catch(() => {
                defaultErrorSnackbar();
            })
            .finally(() => {
                dispatch(setLoadingButton(false));
            });
    };

    const deleteBookCover = (imageId, onDeleteButtonClose) => {
        BooksAPI.deleteBookCover(imageId)
            .then(() => {
                setIsUploadedBookCover(false);
                onDeleteButtonClose();
            })
            .catch(() => defaultErrorSnackbar());
    };

    useEffect(() => {
        const corpEmail = localStorage.getItem('corpEmail');
        if (router.isReady) {
            BooksAPI.getBookInfo(id)
                .then((res) => {
                    if (res.data.owner.corpEmail === corpEmail) {
                        setIsOwner(true);
                    } else {
                        setIsOwner(false);
                    }
                    setBook(res.data);
                    setIsLoadedBookInfo(true);
                    const bookCover = res.data.fileInfo;
                    if (bookCover) {
                        setIsUploadedBookCover(true);
                        setIsUpdatedBookCover(false);
                    }
                })
                .catch((err) => {
                    if (err.response?.status === 403) {
                        router.replace(LOGIN_PATH);
                        localStorage.removeItem('token');
                    } else {
                        defaultErrorSnackbar();
                    }
                });
        }
    }, [defaultErrorSnackbar, id, router, isUploadedBookCover, isUpdatedBookCover]);

    useEffect(() => {
        if (isCurrentUserReader && isLoadedBookInfo) {
            let bookId = {
                bookId: book.id,
            };
            BookingsAPI.getCurrentBooking(bookId).then((res) => {
                setBookingInfo(res.data);
                setIsLoadedBookingInfo(true);
            });
        }
    }, [book.id, isCurrentUserReader, isLoadedBookInfo]);

    useEffect(() => {
        if (redirectPath) dispatch(setRedirectPath(''));
    }, [dispatch, redirectPath]);

    if (
        !(isLoadedBookInfo && isLoadedBookingInfo) && isCurrentUserReader ||
        !(isLoadedBookInfo)
    ) {
        return <ProgressLinear />;
    } else {
        return (
            <>
                <Head>
                    <title>Book preview page</title>
                </Head>
                <Box
                    component='main'
                    sx={{ flexGrow: 1, pt: 3, pb: 8 }}
                >
                    <GoBackButton />
                    <Container
                        maxWidth='lg'
                        sx={{ pt: 11 }}
                    >
                        <Grid container spacing={12}>
                            <Grid item lg={4} md={4} xs={12}>
                                <UploadImageCard
                                    isUploadedImage={isUploadedBookCover}
                                    data={book}
                                    isOwner={isOwner}
                                    onAdd={addBookCover}
                                    onDelete={deleteBookCover}
                                    title={'book cover'}
                                    description={YOU_CAN_UPLOAD_IMAGE}
                                />
                            </Grid>
                            <Grid item lg={8} md={8} xs={12} sx={{ position: 'relative' }}>
                                <BookDetails
                                    onUpdate={setBook}
                                    onUpdateBookingInfo={setBookingInfo}
                                    book={book}
                                    bookingInfo={bookingInfo}
                                    isOwner={isOwner}
                                />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </>
        );
    }
}

BookPreviewPage.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default BookPreviewPage;
