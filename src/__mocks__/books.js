import { v4 as uuid } from "uuid";

export class Book {
  constructor(
    id,
    title,
    author,
    cathegory,
    language,
    description,
    rating,
    status
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

let newBook = new Book(
  uuid(),
  "title of the book",
  "Ivan Ivanov",
  "Technical",
  "English",
  "Some description about the book",
  5,
  "available"
);
let newBook2 = new Book(
  uuid(),
  "title of the book",
  "Ivan Ivanov",
  "Technical",
  "English",
  "Some description about the book",
  5,
  "available"
);

export const books = [newBook, newBook2];
