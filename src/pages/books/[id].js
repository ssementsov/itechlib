import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Container, Grid, Card, Button, Typography } from '@mui/material';
import BookDetails from '../../components/book/book-details';
import { DashboardLayout } from '../../components/dashboard-layout';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { MAIN_CATALOGUE_PATH } from '../../common/constants/route-constants';
import { useState, useEffect } from 'react';
import { withSnackbar } from 'notistack';
import { apiBooks } from '../../api/books';

function BookPreviewPage({ enqueueSnackbar, isAssigned, assignHandler }) {
  const router = useRouter();
  const [book, setBook] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const id = router.query.id;

  const updateInfo = (newInfo) => {
    setBook(newInfo);
  };

  useEffect(() => {
    if (router.isReady) {
      const assigned = localStorage.getItem('assigned');
      if (assigned) {
        assignHandler(true);
      }
      const token = localStorage.getItem('token');
      apiBooks
        .getSingle(id, token)
        .then(function (res) {
          setBook(res.data);
          setIsLoaded(true);
        })
        .catch(function () {
          enqueueSnackbar('Something went wrong... Please retry.', {
            variant: 'error',
          });
        });
    }
  }, [assignHandler, enqueueSnackbar, id, router.isReady]);

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
          <Link href={MAIN_CATALOGUE_PATH} passHref>
            <Button
              component="a"
              startIcon={<ArrowBackIcon fontSize="small" />}
              sx={{
                ml: 2,
              }}
            >
              Back to main catalogue
            </Button>
          </Link>
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
                  updateInfo={updateInfo}
                  book={book}
                  isAssigned={isAssigned}
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

export default withSnackbar(BookPreviewPage);
