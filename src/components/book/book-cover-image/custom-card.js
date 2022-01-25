import React from "react";
import { Card } from "@mui/material";

const CustomCard = (props) => {
   return (
      <Card
         sx={{
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, 0%)",
            position: "absolute",
            width: "250px",
            height: "258px",
            ...props.sx,
         }}
      >
         {props.children}
      </Card>
   );
};

export default CustomCard;
