import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Book } from '../../services/book'

export const BooksListResults = ({ ...rest }) => {
  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TITLE</TableCell>
                <TableCell>AUTHOR</TableCell>
                <TableCell>CATEGORY</TableCell>
                <TableCell>LANGUAGE</TableCell>
                <TableCell>DESCRIPTION</TableCell>
                <TableCell>RATING</TableCell>
                <TableCell>STATUS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell colSpan={8}>
                  <Typography
                    sx={{ textAlign: 'center', color: 'action.active' }}
                  >
                    No books have been added yet!
                  </Typography>
                </TableCell>
              </TableRow>
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
