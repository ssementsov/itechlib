import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
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
} from '@mui/material'
import Link from 'next/link'
import { Book } from '../../modules/book'
import { titles } from '../../common/constants/titles-constants'

export const BooksListResults = ({ books }) => {
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
              {books.length > 0 ? (
                books.map((book, id) => (
                  <Link href={`/books/${id + 1}`} key={book.id} passHref>
                    <TableRow hover>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.cathegory}</TableCell>
                      <TableCell>{book.language}</TableCell>
                      <TableCell>{book.description}</TableCell>
                      <TableCell>
                        <Rating
                          name="read-only"
                          value={book.rating}
                          size="small"
                          readOnly
                        />
                      </TableCell>
                      <TableCell>{book.status}</TableCell>
                    </TableRow>
                  </Link>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8}>
                    <Typography
                      sx={{ textAlign: 'center', color: 'action.active' }}
                    >
                      No books have been added yet!
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  )
}

BooksListResults.propTypes = {
  books: PropTypes.arrayOf(PropTypes.instanceOf(Book)),
}
