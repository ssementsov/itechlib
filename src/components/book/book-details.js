import PropTypes from "prop-types";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { titles } from "./../../common/constants/titles-constants";
import { styled } from "@mui/material/styles";
import { withSnackbar } from "notistack";
import { useRouter } from "next/router";
import { MAIN_CATALOGUE_PATH } from "../../common/constants/route-constants";
import CustomModal from "./../custom-modal";
import { status } from "../../common/constants/status-constants";
import { language } from "../../common/constants/language-constants";
import { category } from "../../common/constants/category-constants";
import { typeModal } from "../../common/constants/modal-type-constants";
import { Book } from "../../models/book-model";
import api from "../../api/books";

function toLowerCaseExeptFirstLetter(string) {
  return string[0] + string.slice(1).toLowerCase();
}

const TblCell = styled(TableCell)(() => ({
  textAlign: "left",
  cursor: "auto",
  borderBottom: "1px solid #E7E8EF",
  borderTop: "1px solid #E7E8EF",
  padding: "5px 35px",
}));

const BookDetails = ({ book, enqueueSnackbar, fetchBook }) => {
  const router = useRouter();

  const deleteBook = async () => {
    if (book.status.name === status.available) {
      try {
        await api.delete(`/api/books/${book.id}`);
        router.replace(MAIN_CATALOGUE_PATH);
        enqueueSnackbar("Your book has been deleted successfully!", {
          variant: "success",
        });
      } catch (e) {
        enqueueSnackbar("Something went wrong... Please retry.", {
          variant: "error",
        });
      }
    } else {
      enqueueSnackbar(
        "You can only delete books which are currently in “Available” status",
        {
          variant: "error",
        }
      );
    }
  };

  const editBook = async (values) => {
    try {
      let idCategory = values.category === category.professional ? 1 : 2;
      let idLanguage = values.language === language.english ? 1 : 2;
      let idStatus;
      switch (values.status) {
        case status.notAvailable:
          idStatus = 2;
          break;
        case status.inUse:
          idStatus = 3;
          break;
        default:
          idStatus = 1;
      }
      const editBook = new Book(
        values.id,
        values.title,
        values.author,
        idCategory,
        values.category,
        idLanguage,
        values.language,
        values.link,
        idStatus,
        values.status,
        values.description
      );
      await api.put("/api/books/", editBook);
      fetchBook();
      enqueueSnackbar("Your book has been updated successfully!", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar("Something went wrong... Please retry.", {
        variant: "error",
      });
    }
  };

  return (
    <Card>
      <CardHeader
        title={book.title}
        action={
          <>
            <CustomModal type={typeModal.delete} deleteBook={deleteBook} />
            <CustomModal
              type={typeModal.edit}
              editBook={editBook}
              book={book}
            />
          </>
        }
      />
      <CardContent
        sx={{
          p: 0,
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Table>
              <TableBody>
                <TableRow>
                  <TblCell>{titles.author}</TblCell>
                  <TblCell>{book.author}</TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.category}</TblCell>
                  <TblCell>
                    {toLowerCaseExeptFirstLetter(book.category.name)}
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.language}</TblCell>
                  <TblCell>
                    {toLowerCaseExeptFirstLetter(book.language.name)}
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.link}</TblCell>
                  <TblCell>
                    <Link
                      href={book.link}
                      underline="hover"
                      target="_blank"
                      rel="noopener"
                    >
                      {"Open site"}
                    </Link>
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.rating}</TblCell>
                  <TblCell>
                    <Rating
                      name="read-only"
                      value={book.rating}
                      size="small"
                      readOnly
                      sx={{
                        marginLeft: "-3px",
                      }}
                    />
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.status}</TblCell>
                  <TblCell>
                    {toLowerCaseExeptFirstLetter(book.status.name)}
                  </TblCell>
                </TableRow>
                <TableRow>
                  <TblCell>{titles.description}</TblCell>
                  <TblCell>{book.description}</TblCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Button color="primary" variant="contained">
          Assign to me
        </Button>
      </Box>
    </Card>
  );
};

BookDetails.propTypes = {
  fetchBook: PropTypes.func,
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    author: PropTypes.string,
    category: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    language: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
    description: PropTypes.string,
    link: PropTypes.string,
    status: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  }),
};

export default withSnackbar(BookDetails);
