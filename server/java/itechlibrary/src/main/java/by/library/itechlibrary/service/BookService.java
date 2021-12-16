package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.BookDto;

import java.util.List;

public interface BookService {

    List<BookDto> findAll();

    void saveBook(BookDto bookDto);

    BookDto findById(long id);

    void remove(long id);

}
