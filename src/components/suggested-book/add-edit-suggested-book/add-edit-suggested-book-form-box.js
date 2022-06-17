import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Box, Container } from '@mui/material';
import { CloseIcon } from '../../../icons/close-icon';
import MultipurposeBookForm from '../../book/multipurpose-book-form';
import { types } from '../../../types';

const AddEditSuggestedBookFormBox = (props) => {
    const { book, onClose, title, buttonName, open, onCreate, onEdit } = props;
    let newBook;
    if (book) {
        newBook = {
            title: book.title,
            language: book.language?.name || '',
            category: book.category?.name || '',
            author: book.author,
            comment: book.comment || '',
            id: book.id,
            link: book.link,
        };
    } else {
        newBook = {
            title: '',
            author: '',
            category: '',
            language: '',
            comment: '',
            link: '',
        };
    }

    function validate(value) {
        let error = {};

        if (
            value.link &&
            !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[-A-Z0-9+&@#%=~_|$?!:,.])/i.test(
                value.link
            )
        ) {
            error.link = 'Please enter correct link';
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
                .max(500, 'Author must be 500 or less symbols'),
            category: Yup.string(),
            language: Yup.string(),
            comment: Yup.string()
                .trim()
                .min(10, 'Comment must be 10 or more symbols')
                .max(250, 'Comment must be 250 or less symbols'),
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
                        isSuggestForm={open}
                    />
                </Container>
            </Box>
        </>
    );
};

AddEditSuggestedBookFormBox.propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
    buttonName: PropTypes.string,
    open: PropTypes.bool,
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
    book: types.suggestedBookTypes,
};

export default AddEditSuggestedBookFormBox;
