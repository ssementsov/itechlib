package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.constant.BookStatusConstant;
import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.dto.book.*;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingForTargetReaderDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.criteria.SortingCriteria;
import by.library.itechlibrary.entity.*;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.facade.BookFacade;
import by.library.itechlibrary.mapper.BookingInfoMapper;
import by.library.itechlibrary.mapper.BookingMapper;
import by.library.itechlibrary.pojo.BookUpdatedInfo;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.service.*;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookFacadeImpl implements BookFacade {

    private final UserService userService;

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final BookService bookService;

    private final BookingService bookingService;

    private final MailTemplateService mailTemplateService;

    private final FileInfoService fileInfoService;

    private final BookingInfoMapper bookingInfoMapper;

    private final BookingMapper bookingMapper;

    private final MailNotificationService mailNotificationService;


    @Override
    @Transactional
    public WithBookingInfoBookDto save(WithOwnerBookDto withOwnerBookDto, BookingForTargetReaderDto bookingForTargetReaderDto, MultipartFile multipartFile) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();

        WithBookingInfoBookDto book = saveBook(withOwnerBookDto, multipartFile, currentUserId);

        String bookStatusName = book.getStatus().getName();
        Optional<Booking> optionalBooking = tryCreateBookingForAcceptanceByReader(bookingForTargetReaderDto, bookStatusName, book.getId());
        bookingService.trySetBookingInfoToBook(book, optionalBooking, currentUserId);

        return book;
    }

    @Override
    @Transactional
    public void removedAttachedFile(long fileId) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        bookService.removedAttachedFile(fileId, currentUserId);
        fileInfoService.removeById(fileId);

    }

    @Override
    @Transactional
    public void attachFile(MultipartFile multipartFile, long bookId) {

        Optional<FileInfo> fileInfo = getFileInfo(multipartFile);
        long currentUserId = securityUserDetailsService.getCurrentUserId();
        bookService.attachFile(fileInfo, bookId, currentUserId);

    }

    @Override
    @Transactional
    public List<WithBookingInfoBookDto> getOwnersBook(SortingCriteria parameterInfoDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();

        List<WithBookingInfoBookDto> ownersBooks = bookService.getOwnersBook(parameterInfoDto, currentUserId);
        ownersBooks.forEach(bookingService::fillBookWithBookingInfo);

        return ownersBooks;
    }

    @Override
    @Transactional
    public List<ResponseOwnBookDto> getCurrentUsersBookedBooks() {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        List<ResponseOwnBookDto> responseOwnBookDtoList = bookService.getCurrentUsersBookedBooks(currentUserId);
        responseOwnBookDtoList.forEach(x -> x.setBaseBookingInfo(bookingInfoMapper
                .mapToBaseBookingInfoDto(bookingService.getBaseBookingInfo(x.getId()))));
        bookService.sortResponseOwnBookDtoListByFinishDate(responseOwnBookDtoList);
        return responseOwnBookDtoList;
    }

    @Override
    @Transactional
    public FullBookDto update(WithLikAndStatusBookDto bookDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        BookUpdatedInfo bookUpdatedInfo = bookService.update(bookDto, currentUserId);

        if (bookUpdatedInfo.isDisableBooking()) {

            bookingService.disableCurrentBooking(bookDto.getId());

        }

        return bookUpdatedInfo.getFullBookDto();
    }

    @Override
    @Transactional
    public FullBookDto getByIdFullVersion(long id) {

        FullBookDto fullBookDto = bookService.getByIdFullVersion(id);

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        String bookStatusName = fullBookDto.getStatus().getName();

        if (bookStatusName.equals(BookStatusConstant.IN_USE)) {

            BookingInfo bookingInfo = bookingService.getBookingInfo(id, currentUserId);
            fullBookDto.setBookingInfoDto(bookingInfoMapper.toBookingInfoDtoFromBooking(bookingInfo));

        }

        return fullBookDto;
    }

    @Override
    public List<WithOwnerBookDto> getAll(SortingCriteria sortingCriteria) {

        return bookService.getAll(sortingCriteria);
    }

    @Override
    public void remove(long id) {

        bookService.remove(id);

    }

    private WithBookingInfoBookDto saveBook(WithOwnerBookDto withOwnerBookDto, MultipartFile multipartFile, long ownerId) {

        Optional<FileInfo> fileInfo = getFileInfo(multipartFile);
        User currentUser = userService.getUserById(ownerId);

        return bookService.save(withOwnerBookDto, fileInfo, currentUser);
    }

    private Optional<FileInfo> getFileInfo(MultipartFile multipartFile) {

        if (multipartFile != null) {

            return Optional.of(fileInfoService.getFileInfo(multipartFile));

        }

        return Optional.empty();
    }

    private Optional<Booking> tryCreateBookingForAcceptanceByReader(BookingForTargetReaderDto bookingForUserDto, String bookStatusName, long bookId) {

        Optional<Booking> bookingOptional = Optional.empty();

        if (bookStatusName.equals(BookStatusConstant.IN_USE)) {

            BookingDto bookingDto = bookingService.tryGetBookingDto(bookingForUserDto, bookId);
            Book book = bookService.getById(bookId);
            BookingResponseDto bookingResponseDto = bookingService.save(bookingDto, book, bookingForUserDto.getReaderId());
            Booking booking = bookingService.findByIdWithoutMapping(bookingResponseDto.getId());

            sendEmailAboutAcceptanceByReader(booking);

            bookingOptional = Optional.of(booking);
        }

        return bookingOptional;
    }

    private void sendEmailAboutAcceptanceByReader(Booking booking) {

        Template template = mailTemplateService.getByName(MailTemplateConstant.BOOK_ACCEPTANCE_BY_READER);
        String filedTemplateText = mailTemplateService.getAndFillTemplateFromBookingInfo(booking, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(booking.getReader(), template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, true);
    }
}