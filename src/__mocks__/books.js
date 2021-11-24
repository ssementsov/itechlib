import { v4 as uuid } from "uuid";
import { Book } from "./../services/book";

let newBook = new Book(
  uuid(),
  'title of the book',
  'Ivan Ivanov',
  'Technical',
  'English',
  'Some description about the book',
  5,
  'available'
)
let newBook2 = new Book(
  uuid(),
  'title of the book',
  'Ivan Ivanov',
  'Technical',
  'English',
  'Some description about the book',
  5,
  'available'
)

export const books = [newBook, newBook2]
