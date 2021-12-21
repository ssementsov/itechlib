package by.library.itechlibrary.service.impl;

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

        Book book = bookMapper.toBook(bookDto);

        setDate(book);

        log.info("Try to save book");

        bookRepository.save(book);

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
}
