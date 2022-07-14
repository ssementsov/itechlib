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
import { useBoolean } from '../../utils/hooks/boolean-hook';
import DeleteModal from '../book/delete-book-or-book-cover/delete-modal';

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
    const { book, onOpen, onDelete, ...rest } = props;
    const { bookIconLink, altText } = getLinkAndAltTextofBookIcon(book);
    const corpEmail = localStorage.getItem('corpEmail');
    let isCreater = book.creator.corpEmail === corpEmail;
    const [isDeleteButtonOpen, setDeleteButtonOpen, setDeleteButtonClose] = useBoolean();

    return (
        <>
            <DeleteModal
                onDelete={() => onDelete(book, setDeleteButtonClose)}
                open={isDeleteButtonOpen}
                onClose={setDeleteButtonClose}
                title={'book suggestion'}
            />

            <CardHeader
                sx={{
                    padding: 0,
                }}
                action={
                    isCreater && (
                        <>
                            <IconButton onClick={setDeleteButtonOpen} aria-label="delete">
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
                            <TblCell>{toLowerCaseExceptFirstLetter(book.category?.name)}</TblCell>
                        </TableRow>
                        <TableRow>
                            <TitleTblCell>{titles.language}</TitleTblCell>
                            <TblCell>{toLowerCaseExceptFirstLetter(book.language?.name)}</TblCell>
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
                <LikeIcons isView={true} book={book} {...rest} />
            </CardContent>
        </>
    );
}

SuggestedBookInfo.propTypes = {
    book: types.suggestedBookTypes,
    onOpen: PropTypes.func,
    onDelete: PropTypes.func,
};
