package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public List<Book> findAll() {

        return bookRepository.findAll();
    }

    @Override
    public void addBook(Book book) {

        bookRepository.save(book);

    }

    @Override
    public Book findById(long id) {

      return bookRepository.findById(id).get();
    }
}
