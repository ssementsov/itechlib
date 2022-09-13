export class AcceptDeclineBooking {
    constructor(
        bookId = 0,
        status = {},
        comment = null,
    ) {
        this.bookId = bookId;
        this.comment = comment;
        this.status = status;
    }
}