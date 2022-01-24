import React from "react";
import { Button, Card, IconButton } from "@mui/material";
import { LightDeleteIcon } from "./../../../icons/light-delete-icon";

const HiddenBookCoverTools = (props) => {
   const { onUploadButtonOpen } = props;

   return (
      <Card
         sx={{
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, 0%)",
            position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            margin: "0 auto",
            background: "rgba(0, 0, 0, 0.6)",
            width: "250px",
            height: "258px",
         }}
      >
         <>
            <IconButton
               aria-label="delete"
               sx={{
                  alignSelf: "self-end",
               }}
            >
               <LightDeleteIcon fontSize="larg" />
            </IconButton>
            <Button onClick={onUploadButtonOpen} sx={{ mr: 1, color: "white" }}>
               Upload image
            </Button>
         </>
         <div></div>
      </Card>
   );
};

export default HiddenBookCoverTools;
