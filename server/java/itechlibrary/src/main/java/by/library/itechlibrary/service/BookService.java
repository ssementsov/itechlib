package by.library.itechlibrary.service;

import by.library.itechlibrary.entity.Book;

import java.util.List;

public interface BookService {

    List<Book> findAll();

    void addBook(Book book);

    Book findById(long id);

}
