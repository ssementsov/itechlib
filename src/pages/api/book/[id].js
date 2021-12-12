import { books } from '../../../../data'

export default async function bookHandler(req, res) {
  const { method } = req

  if (method === 'GET') {
    const { id } = req.query

    const book = books.find((book) => book.id.toString() === id)

    if (!book) {
      return res.status(404).json('Book not found')
    }

    return res.status(200).json(book)
  }
}
