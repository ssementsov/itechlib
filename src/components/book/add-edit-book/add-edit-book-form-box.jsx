import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { types } from '../../../types';
import * as Yup from 'yup';
import { Box, Container } from '@mui/material';
import { CloseIcon } from '../../../icons/close-icon';
import MultipurposeBookForm from '../multipurpose-book-form';
import { bookStatus } from '../../../common/constants/book-status-constants';
import { limitWordLength } from './../../../utils/functions/limit-word-length';

const AddEditBookFormBox = (props) => {
    const { onClose, onCreate, onEdit, title, buttonName, book } = props;
    let newBook;

    if (book) {
        newBook = {
            language: book.language.name,
            category: book.category.name,
            author: book.author,
            title: book.title,
            description: book.description,
            id: book.id,
            link: book.link,
            status: book.status.name,
            reader: '',
            startDate: null,
            finishDate: null,
        };
    } else {
        newBook = {
            title: '',
            author: '',
            category: '',
            language: '',
            description: '',
            link: '',
            status: '',
            reader: '',
            startDate: null,
            finishDate: null,
        };
    }

    function validate(value) {
        let error = {};
        let title = limitWordLength(value.title);
        let author = limitWordLength(value.author);
        let description = limitWordLength(value.description);
        if (
            value.link &&
            !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[-A-Z0-9+&@#%=~_|$?!:,.])/i.test(
                value.link
            )
        ) {
            error.link = 'Please enter correct link';
        } else if (title) {
            error.title = 'Maximum 50 symbols for a single word';
        } else if (author) {
            error.author = 'Maximum 50 symbols for a single word';
        } else if (description) {
            error.description = 'Maximum 50 symbols for a single word';
        } else if (value.status === bookStatus.inUse.name) {
            if (!value.reader) {
                error.reader = 'Reader is required';
            }
            if (!value.startDate) {
                error.startDate = 'Date is required';
            }
            if (!value.finishDate) {
                error.finishDate = 'Date is required';
            }
        }

        return error;
    }

    const formik = useFormik({
        initialValues: newBook,
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .min(2, 'Title must be 2 or more symbols')
                .max(255, 'Title must be 255 or less symbols')
                .required('Title is required'),
            author: Yup.string()
                .trim()
                .min(2, 'Author must be 2 or more symbols')
                .max(255, 'Author must be 255 or less symbols')
                .required('Author is required'),
            category: Yup.string().required('Category is required'),
            language: Yup.string().required('Language is required'),
            description: Yup.string()
                .trim()
                .min(10, 'Description must be 10 or more symbols')
                .max(250, 'Description must be 250 or less symbols')
                .required('Description is required'),
            status: Yup.string().required('Status is required'),
        }),
        validate,
        onSubmit: async (values) => {
            if ('id' in values) {
                await onEdit(values);
            } else {
                await onCreate(values);
            }
        },
    });

    return (
        <>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                }}
            >
                <Container maxWidth="sm">
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 22,
                            top: 22,
                            cursor: 'pointer',
                        }}
                    >
                        <CloseIcon
                            onClick={onClose}
                            sx={{
                                justifySelf: 'flex-end',
                            }}
                        />
                    </Box>
                    <MultipurposeBookForm
                        formik={formik}
                        title={title}
                        buttonName={buttonName}
                    />
                </Container>
            </Box>
        </>
    );
};

AddEditBookFormBox.propTypes = {
    onClose: PropTypes.func,
    createBook: PropTypes.func,
    onEdit: PropTypes.func,
    title: PropTypes.string,
    buttonName: PropTypes.string,
    book: types.bookTypes,
};

export default AddEditBookFormBox;
