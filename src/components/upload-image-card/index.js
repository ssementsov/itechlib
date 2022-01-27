import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import SelectImageModal from '../book/book-cover-image/select-image-modal';
import DeleteModal from '../book/delete-book-or-book-cover/delete-modal';
import BookCoverImage from '../book/book-cover-image';
import HiddenBookCoverTools from './../book/book-cover-image/hidden-book-cover-tools';
import { BooksAPI } from '../../api/books-api';
import { useBoolean } from '../../utils/boolean-hook';
import { useCustomSnackbar } from '../../utils/custom-snackbar-hook';
import styles from './upload-image-card.module.css';

const UploadImageCard = ({ onUpdateImage, onUploadImage }) => {
    const router = useRouter();
    const id = router.query.id;
    const [visible, setVisible, setHidden] = useBoolean();
    const [selectedImage, setSelectedImage] = useState(null);
    const [enqueueSnackbar, defaultErrorSnackbar] = useCustomSnackbar();
    const [isUploadButtonOpen, setUploadButtonOpen, setUploadButtonClose] =
        useBoolean();
    const [isDeleteButtonOpen, setDeleteButtonOpen, setDeleteButtonClose] =
        useBoolean();

    const imageUploadHandler = () => {
        const file = new FormData();
        file.append('bookId', id);
        file.append('file', selectedImage);

        BooksAPI.addBookCover(file)
            .then(() => {
                onCloseHandler();
                onUploadImage(true);
                onUpdateImage(true);
            })
            .catch(() => {
                defaultErrorSnackbar();
            });
    };

    const imageSelectedHandler = (e) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            if (imgFile.size > 500000) {
                setIsUrlBookCover(null);
                setIsAllowedImage(true);
                return;
            } else {
                let urlImg = URL.createObjectURL(imgFile);
                setIsUrlBookCover(urlImg);
                setIsAllowedImage(false);
                setSelectedImage(imgFile);
            }
        }
    };

    const imageDeletedHandler = () => {
        let imageId = book.fileInfo.id;

        BooksAPI.deleteBookCover(imageId)
            .then(() => {
                onUpdateImage(false);
                setDeleteButtonClose();
            })
            .catch(() => defaultErrorSnackbar());
    };

    const onCloseHandler = () => {
        setUploadButtonClose();
        setIsUrlBookCover(null);
        setIsAllowedImage(false);
    };

    const onHoverHandler = () => {
        setVisible();
        onUpdateImage(false);
    };

    return (
        <>
            <DeleteModal
                onDelete={imageDeletedHandler}
                open={isDeleteButtonOpen}
                onClose={setDeleteButtonClose}
                title={'book cover'}
            />

            <SelectImageModal
                open={isUploadButtonOpen}
                onClose={onCloseHandler}
                onSelect={imageSelectedHandler}
                urlBookCover={isUrlBookCover}
                isAllowedImage={isAllowedImage}
                onUpload={imageUploadHandler}
            />

            <div
                className={styles.UploadImageCard}
                onMouseEnter={onHoverHandler}
                onMouseLeave={setHidden}
            >
                <BookCoverImage
                    book={book}
                    isOwner={isOwner}
                    isUploaded={isUploadedBookCover}
                    onUploadButtonOpen={setUploadButtonOpen}
                />
                {isOwner && (
                    <HiddenBookCoverTools
                        visible={visible}
                        isUploaded={isUploadedBookCover}
                        onUploadButtonOpen={setUploadButtonOpen}
                        onOpen={setDeleteButtonOpen}
                    />
                )}
            </div>
        </>
    );
};

export default UploadImageCard;
