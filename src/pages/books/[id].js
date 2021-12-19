import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Box, Container, Grid, Card, Button } from '@mui/material'
import BookDetails from '../../components/book/book-details'
import { DashboardLayout } from '../../components/dashboard-layout'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { MAIN_CATALOGUE_PATH } from '../../common/constants/route-constants'
import { useState, useEffect } from 'react'
import api from '../../api/books'
import { withSnackbar } from 'notistack'

function BookPreviewPage({ initialeBook, enqueueSnackbar }) {
  const router = useRouter()
  const [book, setBook] = useState(initialeBook)
  const id = router.query.id

  useEffect(() => {
    api
      .get(`/api/books/${id}`)
      .then(function (res) {
        setBook(res.data)
      })
      .catch(function () {
        enqueueSnackbar('Something went wrong... Please retry.', {
          variant: 'error',
        })
      })
  }, [enqueueSnackbar, id, router.query])

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
              <BookDetails book={book} />
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

export default withSnackbar(BookPreviewPage)

export async function getServerSideProps({ params }) {
  const res = await api.get(`/api/books/${params.id}`)

  const initialeBook = await res.data
  if (!initialeBook) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      initialeBook,
    },
  }
}
