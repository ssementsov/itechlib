import books from "./books.json";
export default async function bookHandler(req, res) {
  const { id } = req.query;
  if (req.method === "GET") {
    res.status(200).json(books[id - 1]);
  }
}
