import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
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
} from "@mui/material";
import { titles } from "../../common/constants/book-page-titles-constants";
import router from "next/router";
import { BOOK_PREVIEW_PAGE_PATH } from "../../common/constants/route-constants";
import { calculateRate } from "./../../utils/functions/calculate-rate";
import { toLowerCaseExeptFirstLetter } from "./../../utils/functions/transform-words";
import { trimmedString } from "./../../utils/functions/trim-long-string";

const BooksListResults = ({ books, isStartedSearch }) => {
   const sortedBooks = books.sort((a, b) => a.id < b.id ? 1 : -1);
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
                        <TableCell>{titles.category}</TableCell>
                        <TableCell>{titles.language}</TableCell>
                        <TableCell>{titles.rate}</TableCell>
                        <TableCell>{titles.status}</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {books.length ? (
                        sortedBooks.map((book) => {
                           return (
                              <TableRow
                                 onClick={() =>
                                    router.push(
                                       `${BOOK_PREVIEW_PAGE_PATH}/${book.id}`
                                    )
                                 }
                                 key={book.id}
                                 hover
                              >
                                 <TableCell>
                                    {trimmedString(book.title)}
                                 </TableCell>
                                 <TableCell>
                                    {trimmedString(book.author)}
                                 </TableCell>
                                 <TableCell>
                                    {trimmedString(book.description)}
                                 </TableCell>
                                 <TableCell style={{ width: 80 }}>
                                    {toLowerCaseExeptFirstLetter(
                                       book.category.name
                                    )}
                                 </TableCell>
                                 <TableCell
                                    style={{ width: 80, textAlign: "center" }}
                                 >
                                    {toLowerCaseExeptFirstLetter(
                                       book.language.name
                                    )}
                                 </TableCell>
                                 <TableCell style={{ width: 80 }}>
                                    <Tooltip
                                       title={book.rate}
                                       placement="right"
                                    >
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
                                 <TableCell style={{ width: 80 }}>
                                    {toLowerCaseExeptFirstLetter(
                                       book.status.name
                                    )}
                                 </TableCell>
                              </TableRow>
                           );
                        })
                     ) : (
                        <TableRow>
                           <TableCell colSpan={8}>
                              <Typography
                                 sx={{
                                    textAlign: "center",
                                    color: "action.active",
                                 }}
                              >
                                 {isStartedSearch
                                    ? "No books found"
                                    : "No books have been added yet!"}
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
   books: PropTypes.arrayOf(PropTypes.object),
   isStartedSearch: PropTypes.bool,
};

export default BooksListResults;
