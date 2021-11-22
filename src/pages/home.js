import Head from "next/head";
import { Box, Container } from "@mui/material";
import { BooksListResults } from "../components/books/books-list-results";
import { BooksListToolbar } from "../components/books/books-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { books } from "../__mocks__/books";

const HomePage = () => (
  <>
    <Head>
      <title>Home page</title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <BooksListToolbar />
        <Box sx={{ mt: 3 }}>
          <BooksListResults books={books} />
        </Box>
      </Container>
    </Box>
  </>
);
HomePage.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default HomePage;
