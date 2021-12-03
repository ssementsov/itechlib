import Head from 'next/head'
import { Box, Container, Grid, Card, Button } from '@mui/material'
import { BookDetails } from '../../components/book/book-details'
import { DashboardLayout } from '../../components/dashboard-layout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import router from 'next/router'

export default function BookPreviewPage() {
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
          onClick={() => router.push('/main-catalogue')}
          component="a"
          startIcon={<ArrowBackIcon fontSize="small" />}
          sx={{
            ml: 2,
          }}
        >
          Back to main catalogue
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
              <BookDetails />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  )
}

BookPreviewPage.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>
}
