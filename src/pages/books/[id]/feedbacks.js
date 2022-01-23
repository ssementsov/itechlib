import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Box, Container, Divider, Button, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Feedback from '../../../components/feedback';
import { BookingsAPI } from './../../../api/bookings-api';
import { theme } from './../../../theme/index';

function FeedbacksPage() {
    const router = useRouter();
    const [feedbacks, setFeedbacks] = useState([]);
    const [isLoadedData, setIsLoadedData] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            const bookId = router.query.id;

            BookingsAPI.getFeedbacks(bookId).then((res) => {
                setFeedbacks(res.data);
                setIsLoadedData(true);
            });
        }
    }, [router.isReady, router.query.id]);

    if (!isLoadedData) {
        return (
            <Typography sx={{ my: 8, mx: 4 }} variant="h4">
                Loading...
            </Typography>
        );
    }

    return (
        <>
            <Head>
                <title>Feedbacks</title>
            </Head>
            <Box
                component="main"
                sx={{
                    pt: 3,
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
            </Box>
            <Container
                maxWidth="lg"
                sx={{
                    mt: 9,
                    py: 5,
                    minHeight: '300px',
                    boxShadow: theme.shadows[4],
                    backgroundColor: 'white',
                    borderRadius: theme.shape,
                }}
            >
                <Typography color="textPrimary" variant="h4" textAlign="center">
                    Feedbacks
                </Typography>
                <Divider
                    sx={{
                        mt: 4,
                    }}
                />
                {feedbacks.length ? (
                    <>
                        {feedbacks.map((feedback) => (
                            <Feedback
                                key={feedback.id}
                                author={feedback.userFullName}
                                text={feedback.feedback}
                                date={feedback.date}
                            />
                        ))}
                    </>
                ) : (
                    <Typography
                        varian="body1"
                        color="textSecondary"
                        textAlign="center"
                        sx={{
                            mt: 9,
                        }}
                    >
                        This book has no feedbacks yet
                    </Typography>
                )}
            </Container>
        </>
    );
}

FeedbacksPage.getLayout = (page) => {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default FeedbacksPage;
