import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "@mui/material";

const BookCoverImage = (props) => {
   const { book, isOwner, isUploaded, onUploadButtonOpen } = props;

   return (
      <Card
         sx={{
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, 0%)",
            position: "absolute",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
            background: "white",
            width: "250px",
            height: "258px",
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
      </Card>
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
