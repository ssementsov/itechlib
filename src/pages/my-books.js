import { useState, useEffect } from "react";
import { withSnackbar } from "notistack";
import { Typography } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import BooksCatalogue from "../components/books-catalogue";
import { api } from "../api/api";
import { BooksAPI } from "../api/books-api";
import { useErrorNotice } from "../utils/error-notice-hook";

const OwnerCatalogue = ({ enqueueSnackbar }) => {
   const [books, setBooks] = useState([]);
   const [isLoaded, setIsLoaded] = useState(false);
   const [setMainError] = useErrorNotice();

   const updateBooks = (booksList) => {
      setBooks(booksList);
   };

   const updateLoadingStatus = () => {
      setIsLoaded(true);
   };

   useEffect(() => {
      const token = localStorage.getItem("token");
      api.setupAuth(token);

      BooksAPI.getOwnerBooks()
         .then((res) => {
            setBooks(res.data);
            setIsLoaded(true);
         })
         .catch(function () {
            setMainError();
         });
   }, [enqueueSnackbar, setMainError]);

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
            title={"My books"}
            onUpdateBooks={updateBooks}
            onUpdateLoadingStatus={updateLoadingStatus}
         />
      );
   }
};
OwnerCatalogue.getLayout = (page) => {
   return <DashboardLayout>{page}</DashboardLayout>;
};

export default withSnackbar(OwnerCatalogue);
