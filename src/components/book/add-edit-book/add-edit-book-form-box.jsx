import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { types } from '../../../types';
import * as Yup from 'yup';
import { Box } from '@mui/material';
import MultipurposeBookForm from '../multipurpose-book-form';
import {
    bookStatus,
    dateNotEarlierThan,
    dateNotLaterThan,
    FORMAT_DATE,
    INVALID_DATE,
    isRequired,
    mustBeLessSymbols,
    mustBeMoreSymbols,
    ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE,
    ONLY_ONE_WHITESPACE_ALLOWED_REGEX,
} from '../../../common/constants';
import { styled } from '@mui/material/styles';
import { maxFinishDate, maxStartDate, minFinishDate, minStartDate } from './add-edit-book-helpers/date-pickers-helpers';

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

        if (
            value.link &&
            !/(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z\d+&@#%=~_|$?!:,.]*\)|[-A-Z\d+&@#%=~_|$?!:,.])/i.test(
                value.link,
            )
        ) {
            error.link = 'Please enter correct link';
        }
        if (ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.title)) {
            error.title = ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        }
        if (ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.author)) {
            error.author = ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        }
        if (ONLY_ONE_WHITESPACE_ALLOWED_REGEX.test(value.description)) {
            error.description = ONLY_ONE_WHITESPACE_ALLOWED_MESSAGE;
        }
        if (value.status === bookStatus.inUse.name) {
            if (!value.reader) {
                error.reader = isRequired('Reader');
            }
            if (!value.startDate) {
                error.startDate = isRequired('Date');
            }
            if (value.startDate && value.startDate.toString() === INVALID_DATE) {
                error.startDate = FORMAT_DATE;
            }
            if (!value.finishDate) {
                error.finishDate = isRequired('Date');
            }
            if (value.finishDate && value.finishDate.toString() === INVALID_DATE) {
                error.finishDate = FORMAT_DATE;
            }
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
                .max(500, mustBeLessSymbols('Author', 500))
                .required(isRequired('Author')),
            category: Yup.string().required(isRequired('Category')),
            language: Yup.string().required(isRequired('Language')),
            description: Yup.string()
                .trim()
                .min(10, mustBeMoreSymbols('Description', 10))
                .max(500, mustBeLessSymbols('Description', 500))
                .required(isRequired('Description')),
            startDate: Yup.date().min(minStartDate, dateNotEarlierThan(minStartDate)).max(maxStartDate, dateNotLaterThan(maxStartDate)),
            finishDate: Yup.date().min(minFinishDate, dateNotEarlierThan(minFinishDate, true)).max(maxFinishDate, dateNotLaterThan(maxFinishDate))
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
        <StyledBox>
            <MultipurposeBookForm
                formik={formik}
                title={title}
                buttonName={buttonName}
                onClose={onClose}
                {...rest}
            />
        </StyledBox>
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
