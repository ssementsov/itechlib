import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Box, Container, Divider, Typography } from '@mui/material';
import { DashboardLayout } from '../../../components/dashboard-layout';
import Feedback from '../../../components/feedback';
import { BookingsAPI } from './../../../api/bookings-api';
import { theme } from './../../../theme/index';
import { useInfiniteScroll } from './../../../utils/infinite-scroll-hook';
import { ProgressLinear } from '../../../common/UI/progressLinear';
import { GoBackButton } from './../../../common/UI/buttons/go-back-button';

function FeedbacksPage() {
    const router = useRouter();
    const [feedbacks, setFeedbacks] = useState([]);
    const bookId = router.query.id;
    const requestApi = (currentPage) => BookingsAPI.getFeedbacks(bookId, currentPage);
    const { isLoaded } = useInfiniteScroll(requestApi, feedbacks, setFeedbacks);

    if (!isLoaded) {
        return <ProgressLinear/>;
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
                <GoBackButton />
            </Box>
            <Container
                maxWidth="lg"
                sx={{
                    mt: 4,
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
