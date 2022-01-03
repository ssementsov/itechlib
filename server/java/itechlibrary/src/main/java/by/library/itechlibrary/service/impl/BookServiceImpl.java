package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.dto.BookDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongBookStatusException;
import by.library.itechlibrary.mapper.BookMapper;
import by.library.itechlibrary.pojo.SecurityUserDetails;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    private final BookMapper bookMapper;

    private final UserService userService;

    @Override
    public List<BookDto> findAll() {

        log.info("Try to find all books");

        List<Book> books = bookRepository.findAll();

        return bookMapper.mapBookDtoList(books);
    }

    @Transactional
    @Override
    public BookDto saveBook(BookDto bookDto) {

        log.info("Try to map bookDto to book");

        Book book = bookMapper.toBook(bookDto);

        log.info("Try to set user and save book");

        setDate(book);
        setUserOwner(book);
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

        List<Book> books = bookRepository.findAllByOwnerId(id);

        return bookMapper.mapBookDtoList(books);
    }

    @Transactional
    @Override
    public void remove(long id) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new NotFoundException("Book was not find!!!"));

        log.info("Try to delete book by id {}", id);

        if (!book.getStatus().getName().equals(StatusConstant.IN_USE)) {

            bookRepository.deleteById(id);

        } else {

            throw new WrongBookStatusException("You can't delete book with status IN USE.");

        }
    }

    private void setDate(Book book) {

        if (book.getId() == 0) {

            log.info("Try to set creation date.");

            LocalDate date = LocalDate.now();
            book.setCreateDate(date);

        }
    }

    private void setUserOwner(Book book) {

        if (book.getOwner() == null) {

            SecurityUserDetails securityUserDetails = (SecurityUserDetails) SecurityContextHolder.getContext()
                    .getAuthentication().getPrincipal();

            book.setOwner(userService.getUserCorporateEmail(securityUserDetails.getCorpEmail()));

        }
    }
}
