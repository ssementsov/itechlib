import {bookingStatus} from '../../../common/constants';
import {getFormatedDate} from "../../../utils/functions/get-formated-date";
import classes from './in-use-status-block.module.css';

export const InUseStatusBlock = (props) => {
   const {bookingInfo} = props;
   const statusId = bookingInfo.status?.id;
   const bookingEndDate = getFormatedDate(bookingInfo.finishDate);

   switch (statusId) {
      case bookingStatus.notRequireConfirmation.id:
         return (
            `${bookingStatus.notRequireConfirmation.textToShow} till ${bookingEndDate}`
         )
      case bookingStatus.awaitingConfirmation.id:
         return (
            <span className={`${classes.statusBlock} ${classes.statusAwaitingConfirmation}`}>
               {bookingStatus.awaitingConfirmation.textToShow}
            </span>
         )
      case bookingStatus.declined.id:
         return (
            <span className={`${classes.statusBlock} ${classes.statusDeclined}`}>
               {bookingStatus.declined.textToShow}
            </span>
         )
      default:
         return <>{bookingStatus.notRequireConfirmation.textToShow}</>
   }
}
