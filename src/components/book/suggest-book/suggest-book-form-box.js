import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Box, Container } from '@mui/material';
import { CloseIcon } from '../../../icons/close-icon';
import MultipurposeBookForm from '../multipurpose-book-form';

const SuggestBookFormBox = (props) => {
    const { onClose, title, buttonName, open, onCreate } = props;

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
                .min(2, 'Title must be more than 2 symbols')
                .max(255, 'Title must be less than 255 symbols')
                .required('Title is required'),
            author: Yup.string()
                .min(2, 'Author must be more than 2 symbols')
                .max(255, 'Author must be less than 255 symbols'),
            category: Yup.string(),
            language: Yup.string(),
            comment: Yup.string()
                .min(10, 'Comment must be more than 10 symbols')
                .max(100, 'Comment must be less than 100 symbols'),
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
