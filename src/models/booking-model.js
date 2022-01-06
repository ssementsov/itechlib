export class Booking {
  constructor(id = 0, bookId = '', startDate = '', finishDate = '') {
    this.id = id;
    this.bookId = bookId;
    this.startDate = startDate;
    this.finishDate = finishDate;
  }
}
