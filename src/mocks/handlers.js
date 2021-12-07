import { rest } from 'msw'

let bookList = [
  {
    id: 1,
    title: 'Book 1',
    author: 'Ivan Ivanov',
    cathegory: 'Technical',
    language: 'English',
    link: 'https://www.amazon.com/C-Programming-Language-4th/dp/0321563840',
    rating: 0,
    status: 'Available',
    description: 'Some description about the book',
  },
  {
    id: 2,
    title: 'Book 2',
    author: 'Sergey Petrov',
    cathegory: 'Technical',
    language: 'English',
    link: 'https://www.amazon.com/C-Programming-Language-4th/dp/0321563840',
    rating: 0,
    status: 'Not available',
    description: 'Some description about the book',
  },
  {
    id: 3,
    title: 'Book 3',
    author: 'Petr Petrov',
    cathegory: 'Technical',
    language: 'English',
    link: 'https://www.amazon.com/C-Programming-Language-4th/dp/0321563840',
    rating: 0,
    status: 'Available',
    description: 'Some description about the book',
  },
]

export const handlers = [
  // eslint-disable-next-line no-unused-vars
  rest.get(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT, (req, res, ctx) => {
    console.log(bookList)
    return res(ctx.json(bookList))
  }),

  rest.get(`${process.env.NEXT_PUBLIC_BOOKS_ENDPOINT}/:bookId`, (req, res, ctx) => {
    const { bookId } = req.params
    if (bookId <= bookList.length) {
      return res(ctx.json(bookList[bookId - 1]))
    } else {
      return res(ctx.status(404))
    }
  }),

  rest.post(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT, (req, res, ctx) => {
    const id = bookList[bookList.length - 1].id + 1;
    const valuesOfBody = req.body
    
    const newBook = {
      id: id,
      title: valuesOfBody.title,
      author: valuesOfBody.author,
      category: valuesOfBody.category,
      languages: valuesOfBody.languages,
      description: valuesOfBody.description,
      linkToWeb: valuesOfBody.linkToWeb,
      status: valuesOfBody.status,
      reader: valuesOfBody.reader,
      dateFrom: valuesOfBody.dateFrom,
      dateTo: valuesOfBody.dateTo
    }
    bookList = [...bookList, newBook];
    return res(ctx.status(201), ctx.json(newBook));
  }),
]
