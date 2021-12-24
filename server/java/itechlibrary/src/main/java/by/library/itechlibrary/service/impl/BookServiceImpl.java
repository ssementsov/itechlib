package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.config.Oauth2AuthenticationSuccessHandler;
import by.library.itechlibrary.dto.BookDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.mapper.BookMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.service.BookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final Oauth2AuthenticationSuccessHandler oauth2AuthenticationSuccessHandler;

    private final BookRepository bookRepository;

    private final BookMapper bookMapper;

    @Override
    public List<BookDto> findAll() {

        log.info("Try to find all books");

        List<Book> books = bookRepository.findAll();

        return bookMapper.mapBookDtoList(books);
    }

    @Override
    public BookDto saveBook(BookDto bookDto) {

        log.info("Try to set user and save book");

        Book book = bookMapper.toBook(bookDto);
        setDate(book);
        setUser(book);
        book = bookRepository.save(book);

        return bookMapper.toBookDto(book);
    }

    @Override
    public BookDto findById(long id) {

        log.info("Try to find book by id {}", id);

        Book book = bookRepository
                .findById(id).orElseThrow(() -> new NotFoundException("Book was not find!!!"));

        return bookMapper.toBookDto(book);
    }

    @Override
    public List<BookDto> findByUserId(long id) {

        log.info("Try get books by user id.");

        List<Book> books = bookRepository.findAllByUserId(id);

        return bookMapper.mapBookDtoList(books);
    }

    @Override
    public void remove(long id) {

        log.info("Try to delete book by id {}", id);

        bookRepository.deleteById(id);

    }

    private void setDate(Book book) {

        if (book.getId() == 0) {

            log.info("Try to set creation date.");

            LocalDate date = LocalDate.now();
            book.setCreateDate(date);

        }
    }

    private void setUser(Book book) {

        if (book.getUser() == null) {

            book.setUser(oauth2AuthenticationSuccessHandler.getCurrentUser());

        }
    }
}
