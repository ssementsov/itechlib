package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.StatusConstant;
import by.library.itechlibrary.dto.book.BookDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongBookStatusException;
import by.library.itechlibrary.exeption_handler.exception.WrongCurrentUserException;
import by.library.itechlibrary.mapper.BookMapper;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.FileInfoService;
import by.library.itechlibrary.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    private final BookingService bookingService;

    private final FileInfoService fileInfoService;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;


    @Override
    public List<BookDto> findAll() {

        log.info("Try to find all books");

        List<Book> books = bookRepository.findAll();

        return bookMapper.mapBookDtoList(books);
    }

    @Override
    public BookDto saveBook(BookDto bookDto) {

        log.info("Try to map bookDto to book");

        Book book = bookMapper.toBook(bookDto);

        log.info("Try to set user and save book");

        setDate(book);
        setCurrentUserToOwner(book);
        book = bookRepository.save(book);

        return bookMapper.toBookDto(book);
    }

    @Override
    public FullBookDto findByIdFullVersion(long id) {

        Book book = findById(id);
        long currentUserId = securityUserDetailsService.getCurrentUserId();

        log.info("Try to map book to bookAndIsReaderDto");

        FullBookDto fullBookDto = bookMapper.toFullBookDto(book);
        boolean isReader = bookingService.isReader(currentUserId, id);
        fullBookDto.setReader(isReader);

        return fullBookDto;
    }

    @Override
    public List<BookDto> findOwnersBook() {

        log.info("Try get books by user id.");

        long ownerId = securityUserDetailsService.getCurrentUserId();

        List<Book> books = bookRepository.findAllByOwnerId(ownerId);

        return bookMapper.mapBookDtoList(books);
    }

    @Transactional
    @Override
    public void remove(long id) {

        Book book = findById(id);

        log.info("Try to delete book by id {}", id);

        if (!book.getStatus().getName().equals(StatusConstant.IN_USE)) {

            bookRepository.deleteById(id);

        } else {

            throw new WrongBookStatusException("You can't delete book with status IN USE.");

        }
    }

    @Transactional
    @Override
    public void attachFile(MultipartFile multipartFile, long bookId) {

        log.info("Try to find book by id");

        Book book = findById(bookId);
        checkCurrentUserIsOwner(book.getOwner().getId());
        FileInfo fileInfo = fileInfoService.getFileInfo(multipartFile);
        book.setFileInfo(fileInfo);

    }

    @Transactional
    @Override
    public void removedAttachedFile(long fileId) {

        Book book = bookRepository.findByFileInfoId(fileId)
                .orElseThrow(() -> new NotFoundException("Book was not find!!!"));

        checkCurrentUserIsOwner(book.getOwner().getId());

        log.info("Try to removed file.");

        book.setFileInfo(null);
        fileInfoService.removeById(fileId);

    }

    @Transactional
    @Override
    public BookDto updateStatus(String status, long bookId) {

        log.info("Try to find book.");

        Book book = findById(bookId);

        checkCurrentUserIsOwner(book.getOwner().getId());

        if (book.getStatus().getName().equals(StatusConstant.IN_USE) && !status.equals(StatusConstant.IN_USE)) {

            bookingService.disableCurrentBooking(bookId);

        }

        setStatus(book, status);

        return bookMapper.toBookDto(book);
    }

    private void checkCurrentUserIsOwner(long ownerId) {

        log.info("Try to check by current user.");

        if (securityUserDetailsService.getCurrentUserId() != ownerId) {

            throw new WrongCurrentUserException("Current user is not owner");
        }
    }

    private void setStatus(Book book, String status) {

        if (status.equals(StatusConstant.IN_USE)) {

            book.setStatus(StatusConstant.IN_USE_STATUS);

        } else if (status.equals(StatusConstant.AVAILABLE)) {

            book.setStatus(StatusConstant.AVAILABLE_STATUS);

        } else if (status.equals(StatusConstant.NOT_AVAILABLE)) {

            book.setStatus(StatusConstant.NOT_AVAILABLE_STATUS);

        } else {

            throw new WrongBookStatusException("Status " + status + "has not found.");

        }
    }

    private void setDate(Book book) {

        if (book.getId() == 0) {

            log.info("Try to set creation date.");

            LocalDate date = LocalDate.now();
            book.setCreateDate(date);

        }
    }

    private void setCurrentUserToOwner(Book book) {

        if (book.getOwner() == null) {

            long currentUserId = securityUserDetailsService.getCurrentUserId();

            book.setOwner(userService.getUserById(currentUserId));

        }
    }

    private Book findById(long id) {

        log.info("Try to find book by id {}", id);

        return bookRepository
                .findById(id).orElseThrow(() -> new NotFoundException("Book was not find!!!"));
    }
}
