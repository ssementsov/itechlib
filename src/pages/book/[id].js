import Head from "next/head";
import Link from "next/link";
import { Box, Container, Grid, Card, Button, Typography } from "@mui/material";
import { BookDetails } from "../../components/book/book-details";
import { DashboardLayout } from "../../components/dashboard-layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MAIN_CATALOGUE_PATH } from "../../common/constants/route-constants";
import { useRouter } from "next/router";
import useSWR from "swr";

const getItem = (url) => fetch(url).then((res) => res.json());

function useBook(id) {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_BOOKS_ENDPOINT}/${id}`,
    getItem
  );

  return {
    book: data,
    loading: !error && !data,
    error: error,
  };
}

export default function BookPreviewPage() {
  let router = useRouter();
  const { book, loading, error } = useBook(router.query.id);
  if (error)
    return (
      <Typography sx={{ my: 8, mx: 4 }} variant="h4">
        There is no book in catalogue
      </Typography>
    );
  if (loading)
    return (
      <Typography sx={{ my: 8, mx: 4 }} variant="h4">
        Loading...
      </Typography>
    );

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
                  background: "white",
                  margin: "0 auto",
                  width: "250px",
                  height: "258px",
                }}
              />
            </Grid>
            <Grid item lg={8} md={9} xs={12}>
              <BookDetails book={book} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

BookPreviewPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};
