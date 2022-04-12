import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
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
    Tooltip,
} from '@mui/material';
import { titles } from '../../common/constants/book-page-titles-constants';
import router from 'next/router';
import { BOOK_PREVIEW_PAGE_PATH } from '../../common/constants/route-constants';
import { calculateRate } from './../../utils/functions/calculate-rate';
import { toLowerCaseExceptFirstLetter } from './../../utils/functions/transform-words';
import { trimmedString } from './../../utils/functions/trim-long-string';
import { types } from '../../types';

const BooksListResults = ({ books, isStartedSearch }) => {
    // const sortedBooks = books.sort((a, b) => (a.id < b.id ? 1 : -1));
    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{titles.title}</TableCell>
                                <TableCell>{titles.author}</TableCell>
                                <TableCell>{titles.description}</TableCell>
                                <TableCell style={{ width: 115 }}>{titles.category}</TableCell>
                                <TableCell style={{ width: 115 }}>{titles.language}</TableCell>
                                <TableCell style={{ width: 115, textAlign: 'center' }}>
                                    {titles.rate}
                                </TableCell>
                                <TableCell style={{ width: 115 }}>{titles.status}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {books.length ? (
                                books.map((book) => {
                                    return (
                                        <TableRow
                                            onClick={() =>
                                                router.push(`${BOOK_PREVIEW_PAGE_PATH}/${book.id}`)
                                            }
                                            key={book.id}
                                            hover
                                        >
                                            <TableCell>{trimmedString(book.title)}</TableCell>
                                            <TableCell>{trimmedString(book.author)}</TableCell>
                                            <TableCell>{trimmedString(book.description)}</TableCell>
                                            <TableCell>
                                                {toLowerCaseExceptFirstLetter(book.category.name)}
                                            </TableCell>
                                            <TableCell
                                                style={{
                                                    textAlign: 'center',
                                                }}
                                            >
                                                {toLowerCaseExceptFirstLetter(book.language.name)}
                                            </TableCell>
                                            <TableCell>
                                                <Tooltip title={book.rate} placement="right">
                                                    <span>
                                                        <Rating
                                                            precision={0.5}
                                                            name="read-only"
                                                            value={calculateRate(book.rate)}
                                                            size="small"
                                                            readOnly
                                                        />
                                                    </span>
                                                </Tooltip>
                                            </TableCell>
                                            <TableCell>
                                                {toLowerCaseExceptFirstLetter(book.status.name)}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={8}>
                                        <Typography
                                            sx={{
                                                textAlign: 'center',
                                                color: 'action.active',
                                            }}
                                        >
                                            {isStartedSearch
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

BooksListResults.propTypes = {
    books: PropTypes.arrayOf(types.bookTypes),
    isStartedSearch: PropTypes.bool,
};

export default BooksListResults;
