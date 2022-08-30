export const getFilteredBooksList = (search, books, setIsStartedSearch) => {
    if (search.length > 1 && books) {
        setIsStartedSearch(true);
        return books.filter((book) => {
            return (
                book.author.toLowerCase().includes(search.toLowerCase()) ||
                book.title.toLowerCase().includes(search.toLowerCase())
            );
        });
    }
    return books;
}