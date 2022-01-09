import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { titles } from '../../common/constants/titles-constants';
import router from 'next/router';
import { BOOK_PREVIEW_PAGE_PATH } from '../../common/constants/route-constants';
import { apiBookings } from './../../api/bookings';
import { withSnackbar } from 'notistack';

function toLowerCaseExeptFirstLetter(string) {
  return string[0] + string.slice(1).toLowerCase();
}

const BooksListResults = ({
  enqueueSnackbar,
  books,
  startSearch,
  assignHandler,
}) => {
  const handleOpenPreviewPage = (bookId) => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    apiBookings
      .getCurrentBookingsOfReader(userId, token)
      .then((res) => {
        for (let booking of res.data) {
          if (booking.book.id === bookId) {
            localStorage.setItem('assigned', true);
            assignHandler(true);
            break;
          } else {
            localStorage.removeItem('assigned');
            assignHandler(false);
          }
        }
        router.push(`${BOOK_PREVIEW_PAGE_PATH}/${bookId}`);
      })
      .catch(() =>
        enqueueSnackbar('Something went wrong... Please retry.', {
          variant: 'error',
        })
      );
  };

  return (
    <Card>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>{titles.title}</TableCell>
                <TableCell>{titles.author}</TableCell>
                <TableCell>{titles.category}</TableCell>
                <TableCell>{titles.language}</TableCell>
                <TableCell>{titles.description}</TableCell>
                <TableCell>{titles.rating}</TableCell>
                <TableCell>{titles.status}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.length ? (
                books.map((book) => {
                  return (
                    <TableRow
                      onClick={() => handleOpenPreviewPage(book.id)}
                      key={book.id}
                      hover
                    >
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        {toLowerCaseExeptFirstLetter(book.category.name)}
                      </TableCell>
                      <TableCell>
                        {toLowerCaseExeptFirstLetter(book.language.name)}
                      </TableCell>
                      <TableCell>{book.description}</TableCell>
                      <TableCell>
                        <Rating
                          name="read-only"
                          value={book.rating}
                          size="small"
                          readOnly
                        />
                      </TableCell>
                      <TableCell>
                        {toLowerCaseExeptFirstLetter(book.status.name)}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography
                      sx={{ textAlign: 'center', color: 'action.active' }}
                    >
                      {startSearch
                        ? 'No books found'
                        : 'No books have been added yet!'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default withSnackbar(BooksListResults);
