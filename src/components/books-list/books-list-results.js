import PerfectScrollbar from "react-perfect-scrollbar";
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
import { titles } from "../../common/constants/titles-constants";
import router from "next/router";
import { BOOK_PREVIEW_PAGE_PATH } from "../../common/constants/route-constants";
import { calculateRate } from "./../../utils/functions/calculate-rate";
import { toLowerCaseExeptFirstLetter } from "./../../utils/functions/transform-words";

const BooksListResults = ({ books, isStartedSearch }) => {
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
                        <TableCell>{titles.rate}</TableCell>
                        <TableCell>{titles.status}</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {books.length ? (
                        books.map((book) => {
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
                                 <TableCell>{book.title}</TableCell>
                                 <TableCell>{book.author}</TableCell>
                                 <TableCell>
                                    {toLowerCaseExeptFirstLetter(
                                       book.category.name
                                    )}
                                 </TableCell>
                                 <TableCell>
                                    {toLowerCaseExeptFirstLetter(
                                       book.language.name
                                    )}
                                 </TableCell>
                                 <TableCell>{book.description}</TableCell>
                                 <TableCell>
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
                                 <TableCell>
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

export default BooksListResults;
