import books from "./books.json";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(books);
  }
  if (req.method === "POST") {
    let id;
    if (!books.length) {
      id = 1;
    } else {
      id = books[books.length - 1].id + 1;
    }
    const valuesOfBody = req.body;

    const newBook = {
      id: id,
      title: valuesOfBody.title,
      author: valuesOfBody.author,
      category: valuesOfBody.category,
      language: valuesOfBody.language,
      description: valuesOfBody.description,
      linkToWeb: valuesOfBody.linkToWeb,
      status: valuesOfBody.status,
      reader: valuesOfBody.reader,
      dateFrom: valuesOfBody.dateFrom,
      dateTo: valuesOfBody.dateTo,
    };

    books.push(newBook);
    return res.status(201).json(newBook);
  }
}
