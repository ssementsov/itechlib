import Head from 'next/head';
import { useRouter } from 'next/router';
import { PropTypes } from 'prop-types';
import { Box, Container, Grid, Card, Button, Typography } from '@mui/material';
import BookDetails from '../../../components/book/book-details';
import { DashboardLayout } from '../../../components/dashboard-layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useState, useEffect } from 'react';
import { BooksAPI } from '../../../api/books-api';
import { api } from '../../../api/api';
import { useCustomSnackbar } from './../../../utils/custom-snackbar-hook';

function BookPreviewPage({ isAssigned, assignHandler }) {
    const router = useRouter();
    const [book, setBook] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [enqueueSnackbar, defaultErrorSnackbar] = useCustomSnackbar();
    const id = router.query.id;

    const updateBook = (newInfo) => {
        setBook(newInfo);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        api.setupAuth(token);

        if (router.isReady) {
            BooksAPI.getBookInfo(id)
                .then((res) => {
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
                                        background: 'white',
                                        margin: '0 auto',
                                        width: '250px',
                                        height: '258px',
                                    }}
                                />
                            </Grid>
                            <Grid item lg={8} md={9} xs={12}>
                                <BookDetails
                                    onUpdate={updateBook}
                                    book={book}
                                    isAssigned={isAssigned}
                                    assignHandler={assignHandler}
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
