import {Rating, Tooltip} from "@mui/material";
import {calculateRate} from "../../utils/functions/calculate-rate";

export const ReadOnlyRating = (props) => {
   const {
      rate, placement = 'right', precision = 0.5, size = 'small', sx, ...rest
   } = props;

   return (
      <Tooltip title={rate} placement={placement}>
         <span style={{display: 'inline-block'}}>
            <Rating
               {...rest}
               precision={precision}
               name='read-only'
               value={calculateRate(rate)}
               size={size}
               readOnly
               sx={{
                  '&.MuiRating-root': {pt: '5px'},
                  ...sx
               }}
            />
         </span>
      </Tooltip>
   )
}
