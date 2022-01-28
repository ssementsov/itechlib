import { useRouter } from 'next/router';
import { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button } from '@mui/material';
import SelectImageModal from './select-image-modal';
import DeleteModal from '../book/delete-book-or-book-cover/delete-modal';
import HiddenBookCoverTools from './hidden-book-cover-tools';
import { useBoolean } from '../../utils/boolean-hook';
import styles from './upload-image-card.module.css';
import StyledCard from './styled-card';

const UploadImageCard = (props) => {
    const { isUploaded, onUpdate, data, isOwner, onAdd, onDelete, title } =
        props;
    const router = useRouter();
    const id = router.query.id;
    const [visible, setVisible, setHidden] = useBoolean();
    const [selectedImage, setSelectedImage] = useState(null);
    const [isUrlImage, setIsUrlImage] = useState(null);
    const [isAllowedImage, setIsAllowedImage] = useState(false);
    const [isUploadButtonOpen, setUploadButtonOpen, setUploadButtonClose] =
        useBoolean();
    const [isDeleteButtonOpen, setDeleteButtonOpen, setDeleteButtonClose] =
        useBoolean();

    const imageUploadHandler = () => {
        const file = new FormData();
        file.append('bookId', id);
        file.append('file', selectedImage);
        onAdd(file, onCloseHandler);
    };

    const imageSelectedHandler = (e) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            if (imgFile.size > 500000) {
                setIsUrlImage(null);
                setIsAllowedImage(true);
                return;
            } else {
                let urlImg = URL.createObjectURL(imgFile);
                setIsUrlImage(urlImg);
                setIsAllowedImage(false);
                setSelectedImage(imgFile);
            }
        }
    };

    const imageDeletedHandler = () => {
        let imageId = data.fileInfo.id;
        onDelete(imageId, setDeleteButtonClose);
    };

    const onCloseHandler = () => {
        setUploadButtonClose();
        setIsUrlImage(null);
        setIsAllowedImage(false);
    };

    const onHoverHandler = () => {
        setVisible();
        onUpdate(false);
    };

    return (
        <>
            <DeleteModal
                onDelete={imageDeletedHandler}
                open={isDeleteButtonOpen}
                onClose={setDeleteButtonClose}
                title={title}
            />

            <SelectImageModal
                open={isUploadButtonOpen}
                onClose={onCloseHandler}
                onSelect={imageSelectedHandler}
                urlImage={isUrlImage}
                isAllowedImage={isAllowedImage}
                onUpload={imageUploadHandler}
                title={title}
            />

            <div
                className={styles.uploadImageCard}
                onMouseEnter={onHoverHandler}
                onMouseLeave={setHidden}
            >
                <StyledCard
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        background: 'white',
                        backgroundImage: data.fileInfo
                            ? `url(data:image/${data.fileInfo.extension};base64,${data.fileInfo.fileData})`
                            : 'none',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                >
                    {isOwner && !isUploaded && (
                        <Button onClick={setUploadButtonOpen} sx={{ mr: 1 }}>
                            Upload image
                        </Button>
                    )}
                </StyledCard>
                {isOwner && (
                    <HiddenBookCoverTools
                        visible={visible}
                        isUploaded={isUploaded}
                        onUploadButtonOpen={setUploadButtonOpen}
                        onOpen={setDeleteButtonOpen}
                    />
                )}
            </div>
        </>
    );
};

UploadImageCard.propTypes = {
    isOwner: PropTypes.bool.isRequired,
    isUploaded: PropTypes.bool.isRequired,
    onDelete: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired,
    onUpdate: PropTypes.func.isRequired,
    data: PropTypes.object,
    title: PropTypes.string.isRequired,
};

export default UploadImageCard;
