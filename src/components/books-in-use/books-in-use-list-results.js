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
import { calculateRate } from '../../utils/functions/calculate-rate';
import { toLowerCaseExceptFirstLetter } from '../../utils/functions/transform-words';
import { trimmedString } from '../../utils/functions/trim-long-string';
import { getDate } from '../../utils/functions/get-date';

const BooksInUseListResults = ({ books, isStartedSearch }) => {
    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{titles.title}</TableCell>
                                <TableCell>{titles.author}</TableCell>
                                <TableCell sx={{ width: '35%' }}>{titles.description}</TableCell>
                                <TableCell style={{ width: 115 }}>{titles.category}</TableCell>
                                <TableCell style={{ width: 115 }}>{titles.language}</TableCell>
                                <TableCell style={{ width: 115, textAlign: 'center' }}>
                                    {titles.rate}
                                </TableCell>
                                <TableCell style={{ width: 115 }}>{titles.dueDate}</TableCell>
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
                                                {getDate(book.baseBookingInfo.bookingEndDate)}
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
                                                : 'No books assigned to you yet!'}
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

BooksInUseListResults.propTypes = {
    isStartedSearch: PropTypes.bool,
};

export default BooksInUseListResults;
