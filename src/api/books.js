import { ApiCore } from './utilities/core'

const urlBooks = 'books'

export const apiBooks = new ApiCore({
  getAll: true,
  getSingle: true,
  post: true,
  put: true,
  remove: true,
  url: urlBooks,
})
