import { books } from '../../../../data'

export default async function handler(req, res) {
  const { method, body } = req

  if (method === 'GET') {
    res.status(200).json(books)
  }
  if (method === 'POST') {
    books.unshift({ id: books.length + 1, ...body })
    return res.status(201).json(books)
  }
}
