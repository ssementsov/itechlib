import React from "react";
import PropTypes from "prop-types";
import { Button, IconButton } from "@mui/material";
import { LightDeleteIcon } from "./../../../icons/light-delete-icon";
import StyledCard from "./styled-card";

const HiddenBookCoverTools = (props) => {
   const { onUploadButtonOpen, visible, isUploaded } = props;

   return (
      <StyledCard
         sx={{
            display: visible && isUploaded ? "block" : "none",
            background: "rgba(0, 0, 0, 0.6)",
         }}
      >
         <div
            style={{
               position: "relative",
               display: "flex",
               justifyContent: "center",
               height: "100%",
            }}
         >
            <IconButton
               aria-label="delete"
               sx={{ position: "absolute", top: 0, right: 0 }}
            >
               <LightDeleteIcon fontSize="larg" />
            </IconButton>
            <Button onClick={onUploadButtonOpen} sx={{ mr: 1, color: "white" }}>
               Upload image
            </Button>
         </div>
      </StyledCard>
   );
};

HiddenBookCoverTools.propTypes = {
   onUploadButtonOpen: PropTypes.func.isRequired,
   visible: PropTypes.bool.isRequired,
   isUploaded: PropTypes.bool.isRequired,
};

export default HiddenBookCoverTools;
