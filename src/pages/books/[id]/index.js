import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { Box, Container, Grid, Button, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import BookDetails from '../../../components/book/book-details';
import UploadImageCard from '../../../components/upload-image-card';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BooksAPI } from '../../../api/books-api';
import { useCustomSnackbar } from './../../../utils/custom-snackbar-hook';

function BookPreviewPage({ isAssigned, assignHandler }) {
    const router = useRouter();
    const id = router.query.id;
    const [book, setBook] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [isUploadedImage, setIsUploadedImage] = useState(false);
    const [isUpdatedImage, setIsUpdatedImage] = useState(false);
    const [enqueueSnackbar, defaultErrorSnackbar] = useCustomSnackbar();

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
                    res.data.reader
                        ? assignHandler(true)
                        : assignHandler(false);
                    setBook(res.data);
                    setIsLoaded(true);
                    const bookCover = res.data.fileInfo;
                    if (bookCover) {
                        setIsUploadedImage(true);
                    }
                })
                .catch(() => {
                    defaultErrorSnackbar();
                });
        }
    }, [
        isAssigned,
        assignHandler,
        enqueueSnackbar,
        id,
        router.isReady,
        defaultErrorSnackbar,
        isUploadedImage,
        isUpdatedImage,
    ]);

    if (!isLoaded) {
        return (
            <Typography sx={{ my: 8, mx: 4 }} variant="h4">
                Loading...
            </Typography>
        );
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
                                    onUpdateImage={setIsUpdatedImage}
                                    onUploadImage={setIsUploadedImage}
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
