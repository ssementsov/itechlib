import { bookingStatus } from '../../../common/constants';
import { getFormatedDate } from '../../../utils/functions/get-formated-date';
import classes from './in-use-status-block.module.css';

const getStatus = (isStatusWithDate, status, bookingFinishDate) => {
    return isStatusWithDate ? `${status} till ${bookingFinishDate}` : status;
};
export const InUseStatusBlock = (props) => {
    const { currentBookingStatus, bookingFinishDate, isBookPreviewPage = false, showInUseStatus = false } = props;
    const statusId = currentBookingStatus?.id;
    const bookingEndDate = getFormatedDate(bookingFinishDate);

    switch (statusId) {
        case bookingStatus.accepted.id:
            return getStatus(isBookPreviewPage, bookingStatus.accepted.textToShow, bookingEndDate);
        case bookingStatus.notRequireConfirmation.id:
            return getStatus(isBookPreviewPage, bookingStatus.notRequireConfirmation.textToShow, bookingEndDate);
        case bookingStatus.awaitingConfirmation.id:
            return (
                showInUseStatus
                    ? bookingStatus.notRequireConfirmation.textToShow
                    : (
                        <span className={`${classes.statusBlock} ${classes.statusAwaitingConfirmation}`}>
                            {bookingStatus.awaitingConfirmation.textToShow}
                        </span>
                    )
            );
        case bookingStatus.declined.id:
            return (
                <span className={`${classes.statusBlock} ${classes.statusDeclined}`}>
               {bookingStatus.declined.textToShow}
            </span>
            );
        default:
            return bookingStatus.notRequireConfirmation.textToShow;
    }
};
