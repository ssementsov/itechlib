import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Book } from "../../services/book";

export const BooksListResults = ({ books, ...rest }) => {
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const pages = [5, 10, 25];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

  const handleSelectAll = (event) => {
    let newSelectedBookIds;

    if (event.target.checked) {
      newSelectedBookIds = books.map((book) => book.id);
    } else {
      newSelectedBookIds = [];
    }

    setSelectedBookIds(newSelectedBookIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedBookIds.indexOf(id);
    let newSelectedBookIds = [];

    if (selectedIndex === -1) {
      newSelectedBookIds = newSelectedBookIds.concat(selectedBookIds, id);
    } else if (selectedIndex === 0) {
      newSelectedBookIds = newSelectedBookIds.concat(selectedBookIds.slice(1));
    } else if (selectedIndex === selectedBookIds.length - 1) {
      newSelectedBookIds = newSelectedBookIds.concat(
        selectedBookIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedBookIds = newSelectedBookIds.concat(
        selectedBookIds.slice(0, selectedIndex),
        selectedBookIds.slice(selectedIndex + 1)
      );
    }

    setSelectedBookIds(newSelectedBookIds);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedBookIds.length === books.length}
                    color="primary"
                    indeterminate={
                      selectedBookIds.length > 0 &&
                      selectedBookIds.length < books.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>TITLE</TableCell>
                <TableCell>AUTHOR</TableCell>
                <TableCell>CATHEGORY</TableCell>
                <TableCell>LANGUAGE</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>RATING</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book) => (
                  <TableRow
                    hover
                    key={book.id}
                    selected={selectedBookIds.includes(book.id)}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedBookIds.includes(book.id)}
                        onChange={(event) => handleSelectOne(event, book.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary" variant="body1">
                          {book.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.cathegory}</TableCell>
                    <TableCell>{book.language}</TableCell>
                    <TableCell>{book.description}</TableCell>
                    <TableCell>{book.rating}</TableCell>
                    <TableCell>{book.status}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={books.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={pages}
      />
    </Card>
  );
};

BooksListResults.propTypes = {
  books: PropTypes.arrayOf(PropTypes.instanceOf(Book)),
};
