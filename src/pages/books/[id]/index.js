import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container, Grid, Button } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import BookDetails from '../../../components/book/book-details';
import UploadImageCard from '../../../components/upload-image-card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BooksAPI } from '../../../api/books-api';
import { useCustomSnackbar } from './../../../utils/custom-snackbar-hook';
import { LOGIN_PATH } from '../../../common/constants/route-constants';
import { YOU_CAN_UPLOAD_IMAGE } from './../../../common/constants/warning-messages';
import { ProgressLinear } from '../../../common/UI/progressLinear';

function BookPreviewPage({ isAssigned, assignHandler }) {
    const router = useRouter();
    const id = router.query.id;
    const [book, setBook] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
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
                    setIsLoaded(true);
                    const bookCover = res.data.fileInfo;
                    if (bookCover) {
                        setIsUploadedBookCover(true);
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

    if (!isLoaded) {
        return <ProgressLinear/>;
    } else {
        return (
            <>
                <Head>
                    <title>Book preview page</title>
                </Head>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: 3,
                        pb: 8,
                    }}
                >
                    <Button
                        onClick={() => router.back()}
                        component="a"
                        startIcon={<ArrowBackIcon fontSize="small" />}
                        sx={{
                            ml: 2,
                        }}
                    >
                        Back
                    </Button>
                    <Container
                        maxWidth="lg"
                        sx={{
                            pt: 11,
                        }}
                    >
                        <Grid container spacing={12}>
                            <Grid item lg={4} md={4} xs={12}>
                                <UploadImageCard
                                    isUploadedImage={isUploadedBookCover}
                                    onUpdate={setIsUpdatedBookCover}
                                    onUpload={setIsUploadedBookCover}
                                    data={book}
                                    isOwner={isOwner}
                                    onAdd={addBookCover}
                                    onDelete={deleteBookCover}
                                    title={'book cover'}
                                    description={YOU_CAN_UPLOAD_IMAGE}
                                />
                            </Grid>
                            <Grid item lg={8} md={8} xs={12}>
                                <BookDetails
                                    onUpdate={setBook}
                                    book={book}
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
