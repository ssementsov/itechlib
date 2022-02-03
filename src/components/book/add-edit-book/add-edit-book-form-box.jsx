import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { types } from '../../../types';
import * as Yup from 'yup';
import { Box, Container } from '@mui/material';
import { CloseIcon } from '../../../icons/close-icon';
import MultipurposeBookForm from '../multipurpose-book-form';
import { bookStatus } from '../../../common/constants/status-constants';

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
        if (
            value.link &&
            !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[-A-Z0-9+&@#%=~_|$?!:,.])/i.test(
                value.link
            )
        ) {
            error.link = 'Please enter correct link';
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
                .min(2, 'Title must be more than 2 symbols')
                .max(255, 'Title must be less than 255 symbols')
                .required('Title is required'),
            author: Yup.string()
                .min(2, 'Author must be more than 2 symbols')
                .max(255, 'Author must be less than 255 symbols')
                .required('Author is required'),
            category: Yup.string().required('Category is required'),
            language: Yup.string().required('Language is required'),
            description: Yup.string()
                .min(10, 'Description must be more than 10 symbols')
                .max(100, 'Description must be less than 100 symbols')
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
