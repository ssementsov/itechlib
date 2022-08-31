import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    Typography,
} from '@mui/material';
import { Search as SearchIcon } from '../../icons/search';
import AddBookModal from './../book/add-edit-book/add-book-modal';
import AddSuggestedBookModal from '../suggested-book/add-edit-suggested-book/add-suggested-book-modal';
import { PrimaryButton } from '../../common/UI/buttons/primary-button';
import { useOverdueBookingBlocking } from '../../utils/hooks/overdue-booking-blocking-hook';
import { BlockingModal } from '../../common/UI/modals/blocking-modal';
import { fetchUsersList } from '../../store/reducers/ListsSlice';
import { useDispatch } from 'react-redux';

const BooksListToolbar = (props) => {
    const { onCreate, setSearch, search, open, onOpen, onClose, title } = props;
    const dispatch = useDispatch();

    //overdue booking
    const {
        isBlockingModalOpen,
        setBlockingModalClose,
        handleBlockingOrAction,
    } = useOverdueBookingBlocking();

    const openAddBookModalHandler = () => {
        dispatch(fetchUsersList());
        onOpen.add();
    }

    return (
        <Box>
            <AddBookModal
                onCreate={onCreate.add}
                open={open.add}
                onClose={onClose.add}
            />
            <AddSuggestedBookModal
                onCreate={onCreate.suggest}
                open={open.suggest}
                onClose={onClose.suggest}
            />
            <BlockingModal
                open={isBlockingModalOpen}
                onClose={setBlockingModalClose}
            />

            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1,
                }}
            >
                <Typography sx={{ m: 1 }} variant='h4'>
                    {title}
                </Typography>
                <Box sx={{ m: 1, display: 'flex' }}>
                    <Button
                        onClick={() => handleBlockingOrAction(onOpen.suggest)}
                        sx={{ mr: 1 }}
                    >
                        Suggest a book
                    </Button>
                    <PrimaryButton
                        title='Add a book'
                        size='medium'
                        fullWidth={false}
                        onClick={() => handleBlockingOrAction(openAddBookModalHandler)}
                    />
                </Box>
            </Box>
            <Box sx={{ mt: 3 }}>
                <Card>
                    <CardContent>
                        <Box>
                            <TextField
                                name='search'
                                type='text'
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SvgIcon
                                                color='action'
                                                fontSize='small'
                                            >
                                                <SearchIcon />
                                            </SvgIcon>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder='Search a book'
                                variant='outlined'
                            />
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

BooksListToolbar.propTypes = {
    open: PropTypes.objectOf(PropTypes.bool),
    onClose: PropTypes.objectOf(PropTypes.func),
    onCreate: PropTypes.objectOf(PropTypes.func),
    setSearch: PropTypes.func.isRequired,
    search: PropTypes.string.isRequired,
    onOpen: PropTypes.objectOf(PropTypes.func),
    title: PropTypes.string.isRequired,
};

export default BooksListToolbar;
