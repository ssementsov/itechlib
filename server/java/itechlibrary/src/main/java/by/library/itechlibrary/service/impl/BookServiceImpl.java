package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.BookStatusConstant;
import by.library.itechlibrary.dto.book.*;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.BookStatus;
import by.library.itechlibrary.entity.FileInfo;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.exeption_handler.exception.NotFoundException;
import by.library.itechlibrary.exeption_handler.exception.WrongBookStatusException;
import by.library.itechlibrary.exeption_handler.exception.WrongCurrentUserException;
import by.library.itechlibrary.mapper.BookMapper;
import by.library.itechlibrary.pojo.BookUpdatedInfo;
import by.library.itechlibrary.repository.BookRepository;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.util.PaginationUtil;
import by.library.itechlibrary.util.ResponseOwnBookDtoComparator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    private final BookMapper bookMapper;

    private final ResponseOwnBookDtoComparator responseOwnBookDtoComparator;


    @Override
    public List<WithOwnerBookDto> getAll(SortingCriteria sortingCriteria) {

        log.info("Try to find all books");

        Pageable pageable = PaginationUtil.getPageable(sortingCriteria);
        Page<Book> books = bookRepository.findAll(pageable);

        return bookMapper.mapWithOwnerBookDtoList(books.getContent());
    }

    @Override
    public BookUpdatedInfo update(WithLikAndStatusBookDto bookDto, long currentUserId) {

        log.info("Try to update book");

        Book book = findById(bookDto.getId());
        Book updatedBook = bookMapper.toBook(bookDto);
        updatedBook.setFileInfo(book.getFileInfo());
        updatedBook.setOwner(book.getOwner());
        checkCurrentUserIsOwner(updatedBook.getOwner().getId(), currentUserId);

        log.info("Try to save updated book");

        bookRepository.save(updatedBook);

        FullBookDto fullBookDto = bookMapper.toFullBookDto(updatedBook);
        boolean isDisableBooking = updateStatus(book.getStatus(), updatedBook.getStatus());

        return new BookUpdatedInfo(fullBookDto, isDisableBooking);
    }

    @Override
    public WithBookingInfoBookDto save(WithOwnerBookDto withOwnerBookDto, Optional<FileInfo> fileInfo, User currentUser) {

        log.info("Try to map bookDto to book");

        Book book = bookMapper.toBook(withOwnerBookDto);

        log.info("Try to set data and save book");

        setDate(book);
        setCurrentUserToOwner(book, currentUser);
        fileInfo.ifPresent(book::setFileInfo);
        book = bookRepository.save(book);

        return bookMapper.toWithBookingInfoBookDto(book);
    }

    @Override
    public Book getById(long id) {
        return findById(id);
    }

    @Override
    public FullBookDto getByIdFullVersion(long id) {

        Book book = findById(id);

        log.info("Try to map book to bookAndIsReaderDto");

        return bookMapper.toFullBookDto(book);
    }

    @Override
    public List<WithBookingInfoBookDto> getOwnersBook(SortingCriteria parameterInfoDto, long ownerId) {

        log.info("Try get books by user id.");

        Pageable pageable = PaginationUtil.getPageable(parameterInfoDto);
        List<Book> books = bookRepository.findAllByOwnerId(ownerId, pageable);

        return bookMapper.mapWithBookingInfoBookDto(books);
    }

    @Override
    public List<ResponseOwnBookDto> getCurrentUsersBookedBooks(long currentUserId) {

        log.info("Try to get current users books.");

        List<Book> currentBooks = bookRepository.findAllUsedBooksByReaderId(currentUserId);

        return bookMapper.mapToResponseOwnBookDtoList(currentBooks);
    }

    @Override
    public void sortResponseOwnBookDtoListByFinishDate(List<ResponseOwnBookDto> responseOwnBookDtoList) {
        responseOwnBookDtoList.sort(responseOwnBookDtoComparator);
    }

    @Override
    public void remove(long id) {

        Book book = findById(id);

        log.info("Try to delete book by id {}", id);

        if (!book.getStatus().getName().equals(BookStatusConstant.IN_USE)) {

            bookRepository.deleteById(id);

        } else {

            throw new WrongBookStatusException("You can't delete book with status IN USE.");

        }
    }

    @Override
    public void attachFile(Optional<FileInfo> fileInfo, long bookId, long currentUserId) {

        log.info("Try to find book by id");

        Book book = findById(bookId);
        checkCurrentUserIsOwner(book.getOwner().getId(), currentUserId);
        fileInfo.ifPresent(book::setFileInfo);

    }

    @Override
    public void removedAttachedFile(long fileId, long currentUserId) {

        Book book = bookRepository.findByFileInfoId(fileId)
                .orElseThrow(() -> new NotFoundException("Book was not find!!!"));
        checkCurrentUserIsOwner(book.getOwner().getId(), currentUserId);

        log.info("Try to removed file.");

        book.setFileInfo(null);

    }

    private boolean updateStatus(BookStatus oldBookStatus, BookStatus newBookStatus) {

        log.info("Try to check permission for changing status.");

        if (oldBookStatus.getName().equals(BookStatusConstant.IN_USE) && !newBookStatus.getName().equals(BookStatusConstant.IN_USE)) {

            log.info("Disable current booking for for changing status from IN USE.");

            return true;

        }

        return false;
    }

    private void checkCurrentUserIsOwner(long ownerId, long currentUserId) {

        log.info("Try to check by current user.");

        if (currentUserId != ownerId) {

            throw new WrongCurrentUserException("Current user is not owner");
        }
    }

    private void setDate(Book book) {

        if (book.getId() == 0) {

            log.info("Try to set creation date.");

            LocalDateTime date = LocalDateTime.now();
            book.setCreateDate(date);

        }
    }

    private void setCurrentUserToOwner(Book book, User currentUser) {

        if (book.getOwner() == null) {

            book.setOwner(currentUser);

        }
    }

    private Book findById(long id) {

        log.info("Try to find book by id {}", id);

        return bookRepository
                .findById(id).orElseThrow(() -> new NotFoundException("Book was not find!!!"));
    }
}