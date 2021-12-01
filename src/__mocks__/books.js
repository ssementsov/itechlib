import { v4 as uuid } from 'uuid'
import { Book } from '../modules/book'

let newBook = new Book(
  uuid(),
  'Book 1',
  'Ivan Ivanov',
  'Technical',
  'English',
  'https://www.amazon.com/C-Programming-Language-4th/dp/0321563840',
  null,
  'available',
  'Some description about the book'
)
let newBook2 = new Book(
  uuid(),
  'Book 2',
  'Sergey Petrov',
  'Technical',
  'Russian',
  'https://www.amazon.com/C-Programming-Language-4th/dp/0321563840',
  3,
  'available',
  'Some description about the book'
)

export const books = [newBook, newBook2]
