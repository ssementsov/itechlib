import { types } from '../../types';
import { PropTypes } from 'prop-types';
import {
    CardHeader,
    CardContent,
    CardMedia,
    IconButton,
    Link,
    Table,
    TableBody,
    TableCell,
    TableRow,
} from '@mui/material';
import { EditIcon } from '../../icons/edit-icon';
import { DarkDeleteIcon } from '../../icons/dark-delete-icon';
import { styled } from '@mui/material/styles';
import { titles } from '../../common/constants/book-page-titles-constants';
import { toLowerCaseExceptFirstLetter } from '../../utils/functions/transform-words';
import { LikeIcons } from '../suggested-books-list/like-icons';
import { getLinkAndAltTextofBookIcon } from '../../utils/functions/get-link-and-alt-text-of-book-icon';

const TblCell = styled(TableCell)(() => ({
    textAlign: 'left',
    cursor: 'auto',
    borderBottom: '1px solid #E7E8EF',
    borderTop: '1px solid #E7E8EF',
    padding: '5px 35px',
}));

const TitleTblCell = styled(TblCell)(() => ({
    fontWeight: '700',
}));

export default function SuggestedBookInfo(props) {
    const { book, onOpen } = props;
    const { bookIconLink, altText } = getLinkAndAltTextofBookIcon(book);
    let noCategoryValue = book.category === null;
    let noLanguageValue = book.language === null;
    const corpEmail = localStorage.getItem('corpEmail');
    let isCreater = book.creator.corpEmail === corpEmail;

    return (
        <>
            <CardHeader
                sx={{
                    padding: 0,
                }}
                action={
                    isCreater && (
                        <>
                            <IconButton
                                // onClick={setDeleteButtonOpen}
                                aria-label="delete"
                            >
                                <DarkDeleteIcon fontSize="small" />
                            </IconButton>
                            <IconButton onClick={onOpen} aria-label="edit">
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </>
                    )
                }
            />
            <CardMedia
                sx={{
                    display: 'block',
                    width: '100px',
                    objectFit: 'contain',
                    margin: '0 auto',
                }}
                component="img"
                image={bookIconLink}
                alt={altText}
            />
            <CardContent style={{ paddingBottom: '0' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TitleTblCell>{titles.title}</TitleTblCell>
                            <TblCell>{book.title}</TblCell>
                        </TableRow>
                        <TableRow>
                            <TitleTblCell>{titles.author}</TitleTblCell>
                            <TblCell>{book.author}</TblCell>
                        </TableRow>
                        <TableRow>
                            <TitleTblCell>{titles.category}</TitleTblCell>
                            <TblCell>
                                {noCategoryValue
                                    ? ''
                                    : toLowerCaseExceptFirstLetter(
                                          book.category.name
                                      )}
                            </TblCell>
                        </TableRow>
                        <TableRow>
                            <TitleTblCell>{titles.language}</TitleTblCell>
                            <TblCell>
                                {noLanguageValue
                                    ? ''
                                    : toLowerCaseExceptFirstLetter(
                                          book.language.name
                                      )}
                            </TblCell>
                        </TableRow>
                        <TableRow>
                            <TitleTblCell>{titles.link}</TitleTblCell>
                            <TblCell>
                                {book.link === '' ? (
                                    'No link yet'
                                ) : (
                                    <Link
                                        href={book.link}
                                        underline="hover"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Open site'}
                                    </Link>
                                )}
                            </TblCell>
                        </TableRow>
                        <TableRow>
                            <TitleTblCell>{titles.comment}</TitleTblCell>
                            <TblCell>{book.comment}</TblCell>
                        </TableRow>
                    </TableBody>
                </Table>
                <LikeIcons isView={true} />
            </CardContent>
        </>
    );
}

SuggestedBookInfo.propTypes = {
    book: types.suggestedBookTypes,
    onOpen: PropTypes.func,
};
