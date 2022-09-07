import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container, Grid } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import BookDetails from '../../../components/book/book-details';
import UploadImageCard from '../../../components/upload-image-card';
import { BooksAPI } from '../../../api/books-api';
import { useCustomSnackbar } from '../../../utils/hooks/custom-snackbar-hook';
import { LOGIN_PATH, YOU_CAN_UPLOAD_IMAGE } from '../../../common/constants';
import { ProgressLinear } from '../../../common/UI';
import { GoBackButton } from '../../../common/UI';
import { BookingsAPI } from '../../../api/bookings-api';

function BookPreviewPage({ isAssigned, assignHandler }) {
    const router = useRouter();
    const id = router.query.id;
    const [book, setBook] = useState([]);
    const [bookingInfo, setBookingInfo] = useState({});
    const [isLoadedBookInfo, setIsLoadedBookInfo] = useState(false);
    const [isLoadedBookingInfo, setIsLoadedBookingInfo] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isUploadedBookCover, setIsUploadedBookCover] = useState(false);
    const [isUpdatedBookCover, setIsUpdatedBookCover] = useState(false);
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();

    const addBookCover = (file, onClose) => {
        BooksAPI.addBookCover(file)
            .then(() => {
                onClose();
                setIsUploadedBookCover(true);
                setIsUpdatedBookCover(true);
            })
            .catch(() => {
                defaultErrorSnackbar();
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
                    res.data.bookingInfoDto?.currentUserReader
                        ? assignHandler(true)
                        : assignHandler(false);
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
    }, [
        isAssigned,
        assignHandler,
        enqueueSnackbar,
        id,
        router.isReady,
        defaultErrorSnackbar,
        isUploadedBookCover,
        isUpdatedBookCover,
        router,
    ]);

    useEffect(() => {
        if (isAssigned && isLoadedBookInfo) {
            let bookId = {
                bookId: book.id,
            };
            BookingsAPI.getCurrentBooking(bookId).then((res) => {
                setBookingInfo(res.data);
                setIsLoadedBookingInfo(true);
            });
        }
    }, [book.id, isAssigned, isLoadedBookInfo]);

    if (
        !(isLoadedBookInfo && isLoadedBookingInfo) && isAssigned ||
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
                                    isAssigned={isAssigned}
                                    assignHandler={assignHandler}
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

BookPreviewPage.propTypes = {
    isAssigned: PropTypes.bool,
    assignHandler: PropTypes.func,
};

export default BookPreviewPage;
