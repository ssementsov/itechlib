export let bookList = [
  {
    id: 1,
    title: "Book 1",
    author: "Ivan Ivanov",
    category: "Technical",
    language: "English",
    link: "https://www.amazon.com/C-Programming-Language-4th/dp/0321563840",
    rating: 0,
    status: "Available",
    description: "Some description about the book",
  },
  {
    id: 2,
    title: "Book 2",
    author: "Sergey Petrov",
    category: "Technical",
    language: "English",
    link: "https://www.amazon.com/C-Programming-Language-4th/dp/0321563840",
    rating: 0,
    status: "Not available",
    description: "Some description about the book",
  },
  {
    id: 3,
    title: "Book 3",
    author: "Petr Petrov",
    category: "Technical",
    language: "English",
    link: "https://www.amazon.com/C-Programming-Language-4th/dp/0321563840",
    rating: 0,
    status: "Available",
    description: "Some description about the book",
  },
];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json(bookList);
  }
  if (req.method === "POST") {
    let id;
    if (!bookList.length) {
      id = 1;
    } else {
      id = bookList[bookList.length - 1].id + 1;
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

    bookList.push(newBook);
    return res.status(201).json(newBook);
  }
}
