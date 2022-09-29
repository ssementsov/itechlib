import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import MultipurposeBookForm from '../../book/multipurpose-book-form';
import { types } from '../../../types';
import { useTheme } from '@mui/material/styles';
import {
    isRequired,
    mustBeLessSymbols,
    mustBeMoreSymbols,
    ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE,
    ONLY_ONE_WHITESPACE_ALLOWED_REGEX,
} from '../../../common/constants';

const AddEditSuggestedBookFormBox = (props) => {
    const { book, title, buttonName, open, onCreate, onEdit, inEditMode } = props;
    const theme = useTheme();

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
            !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z\d+&@#%=~_|$?!:,.]*\)|[-A-Z\d+&@#%=~_|$?!:,.])/i.test(
                value.link
            )
        ) {
            error.link = 'Please enter correct link';
        }
        if(ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.title)) {
            error.title = ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        }
        if(ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.author)) {
            error.author = ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        }
        if(ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.comment)) {
            error.comment = ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        }

        return error;
    }

    const formik = useFormik({
        initialValues: newBook,
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .min(2, mustBeMoreSymbols('Title', 2))
                .max(255, mustBeLessSymbols('Title', 255))
                .required(isRequired('Title')),
            author: Yup.string()
                .trim()
                .min(2, mustBeMoreSymbols('Author', 2))
                .max(500, mustBeLessSymbols('Author', 500)),
            category: Yup.string(),
            language: Yup.string(),
            comment: Yup.string()
                .trim()
                .min(10, mustBeMoreSymbols('Comment', 10))
                .max(250, mustBeLessSymbols('Comment', 250)),
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
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    [theme.breakpoints.down('md')]: {
                        minWidth: '320px'
                    },
                    [theme.breakpoints.down('sm')]: {
                        fontSize: '1.5rem',
                        paddingLeft: 0,
                        paddingRight: 0,
                        minWidth: '280px'
                    },
                }}
            >
                <MultipurposeBookForm
                    formik={formik}
                    title={title}
                    buttonName={buttonName}
                    isSuggestForm={open}
                    inEditMode={inEditMode}
                />
            </Box>
        </>
    );
};

AddEditSuggestedBookFormBox.propTypes = {
    title: PropTypes.string,
    buttonName: PropTypes.string,
    open: PropTypes.bool,
    onCreate: PropTypes.func,
    onEdit: PropTypes.func,
    book: types.suggestedBookTypes,
    inEditMode: PropTypes.bool
};

export default AddEditSuggestedBookFormBox;
