import { rest } from 'msw'
import { bookList } from './db';

export const handlers = [
  // eslint-disable-next-line no-unused-vars
  rest.get(process.env.NEXT_PUBLIC_BOOKS_ENDPOINT, (req, res, ctx) => {
    console.log('Return books list ', (new Date()).getTime());
    console.log('Return books list ', JSON.parse(JSON.stringify(bookList)));
    return res(ctx.delay(500), ctx.status(200), ctx.json(bookList))
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
    console.log(valuesOfBody)
    
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
    // bookList = [...bookList, newBook];

    bookList.push(newBook);
    console.log('Create new book ', (new Date()).getTime());
    console.log('New list of books ', JSON.parse(JSON.stringify(bookList)));
    return res(ctx.status(201), ctx.json(newBook));
  }),
]
