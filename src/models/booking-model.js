export class Booking {
  constructor(
    active = true,
    id = 0,
    bookId = "",
    startDate = "",
    finishDate = ""
  ) {
    this.active = active;
    this.id = id;
    this.bookId = bookId;
    this.startDate = startDate;
    this.finishDate = finishDate;
  }
}
