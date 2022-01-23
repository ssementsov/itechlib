import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Box, Container, Grid, Card, Button, Typography } from '@mui/material';
import BookDetails from '../../../components/book/book-details';
import { DashboardLayout } from '../../../components/dashboard-layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import { BooksAPI } from '../../../api/books-api';
import { useBoolean } from './../../../utils/boolean-hook';
import SelectImageModal from '../../../components/book-cover-image/select-image-modal';
import { extension } from '../../../common/constants/img-extension-constants';
import { useCustomSnackbar } from './../../../utils/custom-snackbar-hook';

function BookPreviewPage({ isAssigned, assignHandler }) {
    const router = useRouter();
    const id = router.query.id;
    const [book, setBook] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const [enqueueSnackbar, defaultErrorSnackbar] = useCustomSnackbar();
    const [isUploadButtonOpen, setUploadButtonOpen, setUploadButtonClose] =
        useBoolean();
    const [isUrlBookCover, setIsUrlBookCover] = useState(null);
    const [isError, setIsError] = useState(false);

    const updateBook = (newInfo) => {
        setBook(newInfo);
    };

    const imageSelectedHandler = (e) => {
        const imgInfo = e.target.files[0];
        const imgExtensions = [
            extension.jpg,
            extension.jpeg,
            extension.png,
            extension.gif,
        ];
        let imgExtension = imgInfo.type.slice(6);

        if (imgInfo.size > 400000 || !imgExtensions.includes(imgExtension)) {
            setIsUrlBookCover(null);
            setIsError(true);
            return;
        } else {
            let urlImg = URL.createObjectURL(imgInfo);
            setIsUrlBookCover(urlImg);
            setIsError(false);
        }
    };

    const onCloseHandler = () => {
        setUploadButtonClose();
        setIsUrlBookCover(null);
        setIsError(false);
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
                    res.data.reader
                        ? assignHandler(true)
                        : assignHandler(false);
                    updateBook(res.data);
                    setIsLoaded(true);
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
                <SelectImageModal
                    open={isUploadButtonOpen}
                    onClose={onCloseHandler}
                    onSelect={imageSelectedHandler}
                    urlBookCover={isUrlBookCover}
                    error={isError}
                />

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
                            <Grid item lg={3} md={3} xs={12}>
                                <Card
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        margin: '0 auto',
                                        background: 'white',
                                        width: '250px',
                                        height: '258px',
                                    }}
                                >
                                    {isOwner && (
                                        <Button
                                            onClick={setUploadButtonOpen}
                                            sx={{ mr: 1 }}
                                        >
                                            Upload image
                                        </Button>
                                    )}
                                </Card>
                            </Grid>
                            <Grid item lg={8} md={9} xs={12}>
                                <BookDetails
                                    onUpdate={updateBook}
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
