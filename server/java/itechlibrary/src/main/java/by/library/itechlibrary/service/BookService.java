package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.BookDto;

import java.util.List;

public interface BookService {

    List<BookDto> findAll();

    BookDto saveBook(BookDto bookDto);

    BookDto findById(long id);

    List<BookDto> findByUserId(long id);

    BookDto setReader(BookDto bookDto, long readerId);

    void remove(long id);

}
