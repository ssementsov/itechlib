import PropTypes from 'prop-types';
import {styled} from '@mui/material/styles';
import {Box, Card, Table, TableBody, TableCell, TableHead, TableRow, Typography,} from '@mui/material';
import {BOOK_PREVIEW_PAGE_PATH, titles} from '../../common/constants';
import router from 'next/router';
import {toLowerCaseExceptFirstLetter} from '../../utils/functions/transform-words';
import {trimmedString} from '../../utils/functions/trim-long-string';
import {getFormatedDate} from '../../utils/functions/get-formated-date';
import {ReadOnlyRating} from "../../common/UI";

const StyledTableCell = styled(TableCell)(() => ({width: 115, textAlign: 'center'}));

const BooksInUseListResults = ({books, isStartedSearch}) => {
   return (
      <Card>
         <Box sx={{minWidth: 1050}}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>{titles.title}</TableCell>
                     <TableCell>{titles.author}</TableCell>
                     <TableCell>{titles.description}</TableCell>
                     <StyledTableCell>{titles.category}</StyledTableCell>
                     <StyledTableCell>{titles.language}</StyledTableCell>
                     <StyledTableCell>{titles.rate}</StyledTableCell>
                     <StyledTableCell>{titles.dueDate}</StyledTableCell>
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
                              <StyledTableCell>
                                 {toLowerCaseExceptFirstLetter(book.category.name)}
                              </StyledTableCell>
                              <StyledTableCell>
                                 {toLowerCaseExceptFirstLetter(book.language.name)}
                              </StyledTableCell>
                              <StyledTableCell>
                                 <ReadOnlyRating rate={book.rate}/>
                              </StyledTableCell>
                              <StyledTableCell>
                                 {getFormatedDate(book.baseBookingInfo.bookingEndDate)}
                              </StyledTableCell>
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
      </Card>
   );
};

BooksInUseListResults.propTypes = {
   isStartedSearch: PropTypes.bool,
};

export default BooksInUseListResults;
