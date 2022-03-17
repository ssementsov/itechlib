import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Box, Container } from '@mui/material';
import { CloseIcon } from '../../../icons/close-icon';
import MultipurposeBookForm from '../multipurpose-book-form';
import { limitWordLength } from '../../../utils/functions/limit-word-length';

const SuggestBookFormBox = (props) => {
    const { onClose, title, buttonName, open, onCreate } = props;

    function validate(value) {
        let error = {};
        let title = limitWordLength(value.title);
        let author = limitWordLength(value.author);
        let comment = limitWordLength(value.comment);

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
        } else if (comment) {
            error.comment = 'Maximum 50 symbols for a single word';
        }
        return error;
    }

    const formik = useFormik({
        initialValues: {
            title: '',
            author: '',
            category: '',
            language: '',
            comment: '',
            link: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .trim()
                .min(2, 'Title must be 2 or more symbols')
                .max(255, 'Title must be 255 or less symbols')
                .required('Title is required'),
            author: Yup.string()
                .trim()
                .min(2, 'Author must be 2 or more symbols')
                .max(255, 'Author must be 255 or less symbols'),
            category: Yup.string(),
            language: Yup.string(),
            comment: Yup.string()
                .trim()
                .min(10, 'Comment must be 10 or more symbols')
                .max(100, 'Comment must be 100 or less symbols'),
        }),
        validate,
        onSubmit: async (values) => {
            onCreate(values);
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

SuggestBookFormBox.propTypes = {
    onClose: PropTypes.func,
    title: PropTypes.string,
    buttonName: PropTypes.string,
    open: PropTypes.bool,
    onCreate: PropTypes.func.isRequired,
};

export default SuggestBookFormBox;
