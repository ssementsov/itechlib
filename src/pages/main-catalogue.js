import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { BooksAPI } from '../api/books-api';
import BooksCatalogue from '../components/books-catalogue';
import { useCustomSnackbar } from '../utils/custom-snackbar-hook';

const MainCatalogue = () => {
   const [books, setBooks] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [, defaultErrorSnackbar] = useCustomSnackbar();

    useEffect(() => {
        BooksAPI.getAllBooks()
            .then((res) => {
                setBooks(res.data);
                setIsLoaded(true);
            })
            .catch(function () {
                defaultErrorSnackbar();
            });
    }, [defaultErrorSnackbar]);

   if (!isLoaded) {
      return (
         <Typography sx={{ my: 8, mx: 4 }} variant="h4">
            Loading...
         </Typography>
      );
   } else {
      return (
         <BooksCatalogue
            books={books}
            title={"Main catalogue"}
            onUpdateBooks={setBooks}
            onUpdateLoadingStatus={setIsLoaded}
         />
      );
   }
};
MainCatalogue.getLayout = (page) => {
   return <DashboardLayout>{page}</DashboardLayout>;
};

export default MainCatalogue;
