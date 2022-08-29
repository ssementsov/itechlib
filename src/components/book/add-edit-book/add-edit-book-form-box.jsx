import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { types } from '../../../types';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import MultipurposeBookForm from '../multipurpose-book-form';
import { bookStatus } from '../../../common/constants/book-status-constants';
import { styled } from '@mui/material/styles';
import {
    ONLY_ONE_WHITESPACE_ALLOWED_REGEX,
    ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE,
} from '../../../common/constants/warning-messages-and-validation';

const StyledBox = styled(Box)({
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingTop: '0',
});

const AddEditBookFormBox = (props) => {
    const { onClose, onCreate, onEdit, title, buttonName, book, ...rest } = props;
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
            status: 'AVAILABLE',
            reader: '',
            startDate: null,
            finishDate: null,
        };
    }

    function validate(value) {
        let error = {};
        error.title = ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.title) && ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        error.author = ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.author) && ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        error.description = ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.description) && ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;

        if (
            value.link &&
            !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#%=~_|$?!:,.]*\)|[-A-Z0-9+&@#%=~_|$?!:,.])/i.test(
                value.link,
            )
        ) {
            error.link = 'Please enter correct link';
        }
        if (value.status === bookStatus.inUse.name) {
            error.reader = !value.reader && 'Reader is required';
            error.startDate = !value.startDate && 'Date is required';
            error.finishDate = !value.finishDate && 'Date is required';

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
                .max(500, 'Author must be 500 or less symbols')
                .required('Author is required'),
            category: Yup.string().required('Category is required'),
            language: Yup.string().required('Language is required'),
            description: Yup.string()
                .trim()
                .min(10, 'Description must be 10 or more symbols')
                .max(500, 'Description must be 500 or less symbols')
                .required('Description is required'),
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
            <StyledBox>
                <MultipurposeBookForm
                    formik={formik}
                    title={title}
                    buttonName={buttonName}
                    onClose={onClose}
                    {...rest}
                />
            </StyledBox>
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
