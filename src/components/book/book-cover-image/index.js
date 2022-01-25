import React from "react";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import StyledCard from "./styled-card";

const BookCoverImage = (props) => {
   const { book, isOwner, isUploaded, onUploadButtonOpen } = props;

   return (
      <StyledCard
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "white",
            backgroundImage: book.fileInfo
               ? `url(data:image/${book.fileInfo.extension};base64,${book.fileInfo.fileData})`
               : "none",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
         }}
      >
         {isOwner && !isUploaded && (
            <Button onClick={onUploadButtonOpen} sx={{ mr: 1 }}>
               Upload image
            </Button>
         )}
      </StyledCard>
   );
};

BookCoverImage.propTypes = {
   isOwner: PropTypes.bool.isRequired,
   isUploaded: PropTypes.bool.isRequired,
   onUploadButtonOpen: PropTypes.func.isRequired,
   book: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      fileInfo: PropTypes.object,
      category: PropTypes.shape({
         id: PropTypes.number,
         name: PropTypes.string,
      }).isRequired,
      language: PropTypes.shape({
         id: PropTypes.number,
         name: PropTypes.string,
      }).isRequired,
      description: PropTypes.string.isRequired,
      link: PropTypes.string,
      status: PropTypes.shape({
         id: PropTypes.number,
         name: PropTypes.string,
      }).isRequired,
      rate: PropTypes.number.isRequired,
      reader: PropTypes.bool.isRequired,
      owner: PropTypes.object,
   }),
};

export default BookCoverImage;
