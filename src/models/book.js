export class Book {
  constructor(
    id = '',
    title = '',
    author = '',
    category = '',
    language = '',
    link = '',
    rating = '',
    status = '',
    description = ''
  ) {
    this.id = id
    this.title = title
    this.author = author
    this.category = category
    this.language = language
    this.link = link
    this.rating = rating
    this.status = status
    this.description = description
  }
}
