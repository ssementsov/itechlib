import Head from "next/head";
import {
  onSnapshot,
  collection,
  orderBy,
  query,
  addDoc,
  serverTimestamp,
} from "@firebase/firestore";
import { db } from "../../firebase";
import { Box, Container, Typography } from "@mui/material";
import { BooksListResults } from "../components/booksTable/books-list-results";
import { BooksListToolbar } from "../components/booksTable/books-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";
import { useState, useEffect } from "react";
import { withSnackbar } from "notistack";

const MainCatalogue = ({ enqueueSnackbar }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, "books");
    const q = query(collectionRef, orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setBooks(
        querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
      setIsLoaded(true);
    });
    return unsub;
  }, []);

  const createBook = async (body) => {
    try {
      const collectionRef = collection(db, "books");
      await addDoc(collectionRef, {
        ...body,
        timestamp: serverTimestamp(),
      });
      enqueueSnackbar("Your book has been added successfully!", {
        variant: "success",
      });
      setIsLoaded(true);
    } catch (e) {
      enqueueSnackbar("Something went wrong... Please retry.", {
        variant: "error",
      });
      setIsLoaded(true);
    }
  };
  console.log(books);
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
          <title>Main catalogue</title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <BooksListToolbar createBook={createBook} />
            <Box sx={{ mt: 3 }}>
              <BooksListResults books={books} />
            </Box>
          </Container>
        </Box>
      </>
    );
  }
};
MainCatalogue.getLayout = (page) => {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withSnackbar(MainCatalogue);
