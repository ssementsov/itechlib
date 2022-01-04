export class Book {
  constructor(
    id = 0,
    title = '',
    author = '',
    categoryId = '',
    categoryName = '',
    languageId = '',
    languageName = '',
    link = '',
    statusId = '',
    statusName = '',
    description = ''
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = {
      id: categoryId,
      name: categoryName,
    };
    this.language = {
      id: languageId,
      name: languageName,
    };
    this.link = link;
    this.status = {
      id: statusId,
      name: statusName,
    };
    this.description = description;
  }
}
