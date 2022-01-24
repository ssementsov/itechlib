import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const Input = styled("input")({
   display: "none",
});

const SelectFileButton = (props) => {
   const { onSelect } = props;
   return (
      <label htmlFor="contained-button-file">
         <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            onChange={onSelect}
         />
         <Button
            variant="contained"
            component="span"
            color="primary"
            fullWidth
            size="large"
         >
            Select image
         </Button>
      </label>
   );
};

export default SelectFileButton;
