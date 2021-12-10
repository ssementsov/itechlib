import { bookList } from "../book/index";
export default function bookHandler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    res.status(200).json(bookList[id - 1]);
  }
}

// if (bookId <= bookList.length) {
//     return res.json(bookList[bookId - 1])
//   } else {
//     return res.status(404)
//   }
