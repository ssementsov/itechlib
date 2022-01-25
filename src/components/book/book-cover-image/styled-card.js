import React from "react";
import PropTypes from "prop-types";
import { Card } from "@mui/material";

const StyledCard = (props) => {
   const { sx, children } = props;
   return (
      <Card
         sx={{
            left: "50%",
            marginRight: "-50%",
            transform: "translate(-50%, 0%)",
            position: "absolute",
            width: "250px",
            height: "258px",
            ...sx,
         }}
      >
         {children}
      </Card>
   );
};

StyledCard.propTypes = {
   children: PropTypes.node,
   sx: PropTypes.object.isRequired,
};

export default StyledCard;
