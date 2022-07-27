import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { types } from './../../types/index';
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    Link,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { EditIcon } from '../../icons/edit-icon';
import { DarkDeleteIcon } from '../../icons/dark-delete-icon';
import { titles } from '../../common/constants/book-page-titles-constants';
import { styled, useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';
import ReturnBookModal from '../book/return-book/return-book-modal';
import AssignBookModal from '../book/assign-book/assign-book-modal';
import DeleteModal from '../book/delete-book-or-book-cover/delete-modal';
import EditBookModal from '../book/add-edit-book/edit-book-modal';
import { bookStatus } from '../../common/constants/book-status-constants';
import { language } from '../../common/constants/language-constants';
import { category } from '../../common/constants/category-constants';
import { Book } from '../../models/book-model';
import { Booking } from '../../models/booking-model';
import { BooksAPI } from '../../api/books-api';
import { BookingsAPI } from './../../api/bookings-api';
import { useBoolean } from '../../utils/hooks/boolean-hook';
import { calculateRate } from './../../utils/functions/calculate-rate';
import { toLowerCaseExceptFirstLetter } from '../../utils/functions/transform-words';
import { BOOK_PREVIEW_PAGE_PATH, FEEDBACKS_PATH } from '../../common/constants/route-constants';
import { useCustomSnackbar } from '../../utils/hooks/custom-snackbar-hook';
import { getFormatedDate } from '../../utils/functions/get-formated-date';
import { PrimaryButton } from '../../common/UI/buttons/primary-button';
import { useDispatch, useSelector } from 'react-redux';
import { ProlongateReadingModal } from './prolongate-reading/prolongate-reading-modal';
import { formatISO, format, parseISO, isAfter, add } from 'date-fns';
import { BlockingModal } from '../../common/UI/modals/blocking-modal';
import { userRoles } from '../../common/constants/user-roles-constants';
import { useOverdueBookingBlocking } from '../../utils/hooks/overdue-booking-blocking-hook';
import { userSlice } from '../../store/reducers/UserSlice';

const TblCell = styled(TableCell)(() => ({
    textAlign: 'left',
    cursor: 'auto',
    borderBottom: '1px solid #E7E8EF',
    borderTop: '1px solid #E7E8EF',
    padding: '5px 0 5px 35px',
}));

const LIMIT_COUNT_NOTIFICATIONS = 5;

const BookDetails = (props) => {
    const { book, bookingInfo, onUpdate, onUpdateBookingInfo, isAssigned, assignHandler } = props;
    const router = useRouter();
    const dispatch = useDispatch();
    const theme = useTheme();
    const corpEmail = localStorage.getItem('corpEmail');
    let isOwner = book.owner.corpEmail === corpEmail;
    const inUseStatus = book.status.name === bookStatus.inUse.name;
    const roles = useSelector(state => state.user.user.roles);
    const isNoRoles = roles?.length === 0;
    const { updateUserRoles } = userSlice.actions;
    const { enqueueSnackbar, defaultErrorSnackbar } = useCustomSnackbar();
    const [isEditButtonOpen, setEditButtonOpen, setEditButtonClose] = useBoolean();
    const [isDeleteButtonOpen, setDeleteButtonOpen, setDeleteButtonClose] = useBoolean();
    const [isAssignButtonOpen, setAssignButtonOpen, setAssignButtonClose] = useBoolean();
    const [isProlongateButtonOpen, setProlongateButtonOpen, setProlongateButtonClose] = useBoolean();
    const [isReturnButtonOpen, setReturnButtonOpen, setReturnButtonClose] = useBoolean();
    const readerId = useSelector((state) => state.user.user.id);
    const [isRejectedToAssign, setIsRejectedToAssign] = useState(false);
    const bookingStartDate = parseISO(bookingInfo.startDate);
    const bookingEndDate = getFormatedDate(book.bookingInfoDto.bookingEndDate);
    const lastDateToProlongate = add(bookingStartDate, { months: 1 });
    const isDisabledProlongateButton = isAfter(new Date(), lastDateToProlongate);
    const assignBookHandler = useCallback(async () => {
        await BookingsAPI.getCountActiveBookings(readerId)
        .then((res) => {
            if (res.data === LIMIT_COUNT_NOTIFICATIONS) {
                setIsRejectedToAssign(true);
            } else {
                setIsRejectedToAssign(false);
            }
            setAssignButtonOpen();
        })
        .catch(() => {
            defaultErrorSnackbar();
        });
    }, [defaultErrorSnackbar, readerId, setAssignButtonOpen]);

    const deleteBook = () => {
        if (book.status.name === bookStatus.available.name) {
            BooksAPI.removeBook(book.id)
            .then(() => {
                router.back();
                enqueueSnackbar('Your book has been deleted successfully!', {
                    variant: 'success',
                });
            })
            .catch(() => {
                defaultErrorSnackbar();
            });
        } else {
            enqueueSnackbar('You can only delete books which are currently in “Available” status', {
                variant: 'error',
            });
        }
    };

    const editBook = (newBook) => {
        let idCategory =
            newBook.category === category.professional.name
                ? category.professional.id
                : category.fiction.id;
        let idLanguage =
            newBook.language === language.english.name ? language.english.id : language.russian.id;
        let idStatus;
        switch (newBook.status) {
            case bookStatus.notAvailable.name:
                idStatus = bookStatus.notAvailable.id;
                break;
            case bookStatus.inUse.name:
                idStatus = bookStatus.inUse.id;
                break;
            default:
                idStatus = bookStatus.available.id;
        }
        const editedBook = new Book(
            newBook.id,
            newBook.title,
            newBook.author,
            idCategory,
            newBook.category,
            idLanguage,
            newBook.language,
            newBook.link,
            idStatus,
            newBook.status,
            newBook.description,
        );
        BooksAPI.changeBookInfo(editedBook)
        .then((res) => {
            setEditButtonClose();
            onUpdate(res.data);
            enqueueSnackbar('Your book has been updated successfully!', {
                variant: 'success',
            });
        })
        .catch(() => {
            defaultErrorSnackbar();
        });
    };

    const assignBook = ({ startDate, finishDate }) => {
        const startDateFormatISO = formatISO(startDate, { representation: 'date' });
        const finishDateFormatISO = formatISO(finishDate, { representation: 'date' });
        const booking = new Booking(true, 0, book.id, startDateFormatISO, finishDateFormatISO);
        BookingsAPI.createBooking(booking)
        .then((res) => {
            onUpdate(res.data.book);
            setAssignButtonClose();
            assignHandler(true);
            enqueueSnackbar('The book was assigned to you successfully!', {
                variant: 'success',
            });
        })
        .catch(() => {
            defaultErrorSnackbar();
        });
    };

    const prolongateReading = (bookingId, finishDate) => {
        const newFinishDateFormatISO = formatISO(finishDate, { representation: 'date' });
        BookingsAPI.updateBookingFinishedDate(bookingId, newFinishDateFormatISO)
        .then(res => {
            onUpdateBookingInfo(res.data);
            setProlongateButtonClose();
            enqueueSnackbar(`Reading period has been prolongated till ${format(finishDate, 'MM.dd.yyyy')}`, {
                variant: 'success',
            });
        })
        .catch(() => {
            defaultErrorSnackbar();
        });
    };

    const returnBook = (body) => {
        let bookingId = bookingInfo.id;
        BookingsAPI.cancelBooking(bookingId, body)
        .then(() => {
            if(isNoRoles) {
                dispatch(updateUserRoles(userRoles.reader))
            }
            setReturnButtonClose();
            assignHandler(false);
            enqueueSnackbar(
                !body.feedback && !body.rate
                    ? 'Your book was returned successfully!'
                    : 'Thank you for feedback. Read on!',
                {
                    variant: 'success',
                },
            );
        })
        .catch(() => {
            defaultErrorSnackbar();
        });
    };

    //overdue booking
    const {
        isBlockingModalOpen,
        setBlockingModalClose,
        handleBlockingOrAction,
    } = useOverdueBookingBlocking();

    return (
        <>
            <EditBookModal
                open={isEditButtonOpen}
                onClose={setEditButtonClose}
                onEdit={editBook}
                book={book}
            />
            <DeleteModal
                onDelete={deleteBook}
                open={isDeleteButtonOpen}
                onClose={setDeleteButtonClose}
                title={'book'}
            />
            <AssignBookModal
                onAssign={assignBook}
                open={isAssignButtonOpen}
                onClose={setAssignButtonClose}
                isRejectedToAssign={isRejectedToAssign}
            />
            <ProlongateReadingModal
                onProlongate={prolongateReading}
                open={isProlongateButtonOpen}
                onClose={setProlongateButtonClose}
                bookingInfo={bookingInfo}
            />
            <ReturnBookModal
                open={isReturnButtonOpen}
                onClose={setReturnButtonClose}
                onReturn={returnBook}
            />
            <BlockingModal
                open={isBlockingModalOpen}
                onClose={setBlockingModalClose}
            />

            <Card>
                <CardHeader
                    title={book.title}
                    action={
                        isOwner && (
                            <>
                                <IconButton onClick={setDeleteButtonOpen} aria-label='delete'>
                                    <DarkDeleteIcon fontSize='small' />
                                </IconButton>
                                <IconButton onClick={setEditButtonOpen} aria-label='edit'>
                                    <EditIcon fontSize='small' />
                                </IconButton>
                            </>
                        )
                    }
                />
                <CardContent
                    sx={{
                        p: 0,
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item md={12} xs={12}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TblCell sx={{ width: '20%' }}>{titles.author}</TblCell>
                                        <TblCell>{book.author}</TblCell>
                                    </TableRow>
                                    <TableRow>
                                        <TblCell>{titles.category}</TblCell>
                                        <TblCell>
                                            {toLowerCaseExceptFirstLetter(book.category.name)}
                                        </TblCell>
                                    </TableRow>
                                    <TableRow>
                                        <TblCell>{titles.language}</TblCell>
                                        <TblCell>
                                            {toLowerCaseExceptFirstLetter(book.language.name)}
                                        </TblCell>
                                    </TableRow>
                                    <TableRow>
                                        <TblCell>{titles.link}</TblCell>
                                        <TblCell>
                                            {!book.link ? (
                                                'No link yet'
                                            ) : (
                                                <Link
                                                    href={book.link}
                                                    underline='hover'
                                                    target='_blank'
                                                    rel='noopener'
                                                >
                                                    {'Open site'}
                                                </Link>
                                            )}
                                        </TblCell>
                                    </TableRow>
                                    <TableRow>
                                        <TblCell>{titles.rate}</TblCell>
                                        <TblCell>
                                            <Tooltip title={book.rate} placement='right'>
                                                <span>
                                                    <Rating
                                                        precision={0.5}
                                                        name='read-only'
                                                        value={calculateRate(book.rate)}
                                                        size='small'
                                                        readOnly
                                                        sx={{
                                                            ml: '-3px',
                                                        }}
                                                    />
                                                </span>
                                            </Tooltip>
                                        </TblCell>
                                    </TableRow>
                                    <TableRow>
                                        <TblCell>{titles.status}</TblCell>
                                        <TblCell>
                                            {inUseStatus ? (
                                                <Tooltip
                                                    title={`Reader: ${book.bookingInfoDto?.nameOfReader}`}
                                                    placement='right'
                                                >
                                                    <Typography
                                                        sx={{
                                                            width: '170px',
                                                            fontSize: theme.typography.body2,
                                                        }}
                                                    >
                                                        {`${toLowerCaseExceptFirstLetter(
                                                            book.status.name,
                                                        )} till ${bookingEndDate}`}
                                                    </Typography>
                                                </Tooltip>
                                            ) : (
                                                <Typography
                                                    sx={{
                                                        width: '170px',
                                                        fontSize: theme.typography.body2,
                                                    }}
                                                >
                                                    {toLowerCaseExceptFirstLetter(book.status.name)}
                                                </Typography>
                                            )}
                                        </TblCell>
                                    </TableRow>
                                    <TableRow>
                                        <TblCell>{titles.owner}</TblCell>
                                        <TblCell>{`${book.owner.name} ${book.owner.surname}`}</TblCell>
                                    </TableRow>
                                    <TableRow>
                                        <TblCell>{titles.description}</TblCell>
                                        <TblCell>{book.description}</TblCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </CardContent>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2,
                    }}
                >
                    <Button
                        onClick={() =>
                            router.push(`${BOOK_PREVIEW_PAGE_PATH}/${book.id}${FEEDBACKS_PATH}`)
                        }
                        sx={{ mr: 1 }}
                    >
                        View feedback
                    </Button>
                    {!isOwner && (
                        <>
                            {isAssigned ? (
                                <>
                                    <Button
                                        disabled={isDisabledProlongateButton}
                                        onClick={() => handleBlockingOrAction(setProlongateButtonOpen)}
                                        sx={{ mr: 1 }}
                                    >
                                        Prolongate reading
                                    </Button>
                                    <PrimaryButton
                                        title={'Return the book'}
                                        size='small'
                                        fullWidth={false}
                                        onClick={setReturnButtonOpen}
                                    />
                                </>
                            ) : (
                                <PrimaryButton
                                    title={'Assign to me'}
                                    size='small'
                                    fullWidth={false}
                                    onClick={() => handleBlockingOrAction(assignBookHandler)}
                                    disabled={book.status.name !== bookStatus.available.name}
                                />
                            )}
                        </>
                    )}
                </Box>
            </Card>
        </>
    );
};

BookDetails.propTypes = {
    isAssigned: PropTypes.bool,
    assignHandler: PropTypes.func,
    onUpdate: PropTypes.func,
    onUpdateBookingInfo: PropTypes.func,
    book: types.bookTypes,
    bookingInfo: PropTypes.shape({
        book: types.bookTypes,
        id: PropTypes.number,
        startDate: PropTypes.string,
        finishDate: PropTypes.string,
        active: PropTypes.bool,
    }),
};

export default BookDetails;
