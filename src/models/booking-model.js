import { bookingStatus } from '../common/constants/booking-status-constants';

export class Booking {
    constructor(
        active = true,
        id = 0,
        bookId = '',
        startDate = '',
        finishDate = '',
        status = '',
    ) {
        this.active = active;
        this.id = id;
        this.bookId = bookId;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.status = status;
    }
}

export class BookingForTargetReader {
    constructor(
        readerId = 0,
        startDate = '',
        finishDate = '',
        status = bookingStatus.awaitingConfirmation,
    ) {
        this.readerId = readerId;
        this.startDate = startDate;
        this.finishDate = finishDate;
        this.status = status;
    }
}
