import {bookingStatus} from '../../../common/constants';
import {toLowerCaseExceptFirstLetter} from "../../../utils/functions/transform-words";
import {getFormatedDate} from "../../../utils/functions/get-formated-date";
import classes from './in-use-status-block.module.css';

export const InUseStatusBlock = (props) => {
   const {bookInfo} = props;
   const statusId = bookInfo.bookingInfoDto?.status.id;
   const bookingEndDate = getFormatedDate(bookInfo.bookingInfoDto?.bookingEndDate);

   switch (statusId) {
      case bookingStatus.notRequireConfirmation.id:
         return (
            `${toLowerCaseExceptFirstLetter(bookInfo.status.name)} till ${bookingEndDate}`
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
               {bookingStatus.declined.textToChow}
            </span>
         )
      default: <></>
   }
}
