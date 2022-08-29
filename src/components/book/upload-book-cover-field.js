import { useState } from 'react';
import SelectFileButton from './../common/select-file-button';
import { IconButton, Typography } from '@mui/material';
import { StyledDeleteIcon } from '../../icons/styled-delete-icon';
import classes from './upload-book-cover-field.module.css';
import { theme } from '../../theme';
import { YOU_CAN_UPLOAD_IMAGE } from '../../common/constants/warning-messages-and-validation';
import { MAX_SIZE, allowedImagesMimeTypes, allowedImagesTypes } from '../../common/constants/file-constants';
import { limitFileNameLength } from '../../utils/functions/limit-file-name-length';

export const UploadBookCoverField = (props) => {
    const { formik } = props;
    const [fieldName, setFieldName] = useState(null);
    const [isAllowedImage, setIsAllowedImage] = useState(true);

    const imageSelectedHandler = (e) => {
        const imgFile = e.target.files[0];
        if (imgFile) {
            const imgFileName = imgFile.name;
            const imgFileExtension = imgFileName.slice(imgFileName.lastIndexOf('.') + 1);
            const allowedImageMimeType = allowedImagesMimeTypes.find(type => type === imgFile.type);
            const allowedImageType = allowedImagesTypes.find(type => type === imgFileExtension);

            if (imgFile.size > MAX_SIZE || !(allowedImageMimeType && allowedImageType)) {
                setIsAllowedImage(false);
                return;
            } else {
                setFieldName(imgFile.name);
                setIsAllowedImage(true);
                formik.setFieldValue('file', imgFile);
            }
        }
        e.target.value = '';
    };

    const imageDeletedHandler = () => {
        formik.setFieldValue('file', null);
        setFieldName(null);
    };

    return (
        <>
            <div className={classes.container}>
                <div className={classes.alignedButton}>
                    <SelectFileButton
                        uploadButton
                        multipal
                        onSelect={imageSelectedHandler}
                        isLight={true}
                    />
                </div>
                {fieldName && (
                    <div className={fieldName ? classes.aligned : classes.hidden}>
                        <Typography color="primary">{limitFileNameLength(fieldName)}</Typography>
                        <IconButton aria-label="delete" onClick={imageDeletedHandler}>
                            <StyledDeleteIcon
                                fontSize="medium"
                                sx={{ color: theme.palette.grey[600] }}
                            />
                        </IconButton>
                    </div>
                )}
            </div>
            <Typography
                variant="caption"
                color={theme.palette.error.main}
                sx={{
                    display: isAllowedImage ? 'none' : 'block'
                }}
            >
                {YOU_CAN_UPLOAD_IMAGE}
            </Typography>
        </>
    );
};
