export class Book {
  constructor(
    id = "",
    title = "",
    author = "",
    cathegory = "",
    language = "",
    description = "",
    rating = "",
    status = ""
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.cathegory = cathegory;
    this.language = language;
    this.description = description;
    this.rating = rating;
    this.status = status;
  }
}
