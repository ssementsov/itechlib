import { rest } from 'msw'

export const handlers = [
  // eslint-disable-next-line no-unused-vars
  rest.get('https://my.backend/books', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: 1,
          title: 'Book 1',
          author: 'Ivan Ivanov',
          cathegory: 'Technical',
          language: 'English',
          link: 'https://www.amazon.com/C-Programming-Language-4th/dp/0321563840',
          rating: 1,
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
      ])
    )
  }),
]
