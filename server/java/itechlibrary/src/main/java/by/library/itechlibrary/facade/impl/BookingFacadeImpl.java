package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.constant.InternalTemplateConstant;
import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.facade.BookingFacade;
import by.library.itechlibrary.facade.NotificationFacade;
import by.library.itechlibrary.mapper.BookingInfoMapper;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.service.BookingAcceptanceService;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Slf4j
@RequiredArgsConstructor
public class BookingFacadeImpl implements BookingFacade {

    private final SecurityUserDetailsServiceImpl securityUserDetailsService;

    private final BookingService bookingService;

    private final BookService bookService;

    private final BookingAcceptanceService bookingAcceptanceService;

    private final BookingInfoMapper bookingInfoMapper;

    private final NotificationFacade notifier;


    @Override
    @Transactional
    public BookingInfo getBookingInfo(long bookId) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();

        return bookingService.getBookingInfo(bookId, currentUserId);
    }

    @Override
    @Transactional
    public BookingResponseDto save(BookingDto bookingDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        Book book = bookService.getById(bookingDto.getBookId());

        return bookingService.save(bookingDto, book, currentUserId);
    }

    @Override
    @Transactional
    public FullBookDto resolveAssignedBooking(BookingAcceptanceDto bookingAcceptanceDto) {

        bookingService.checkDtoForResolveAssignedBooking(bookingAcceptanceDto);

        long bookId = bookingAcceptanceDto.getBookId();
        long readerId = securityUserDetailsService.getCurrentUserId();

        Book book = bookService.getById(bookId);
        BookingDto bookingDto = bookingService.findAwaitingConfirmationByBookId(bookId);

        Booking resolveAssignedBooking = bookingService.resolveAssignedBooking(bookingDto, book, bookingAcceptanceDto.getStatus(), readerId);
        bookingAcceptanceService.save(bookingAcceptanceDto, book, readerId);

        resolveNotifications(resolveAssignedBooking, readerId);

        FullBookDto fullBookDto = bookService.getByIdFullVersion(bookId);
        BookingInfo bookingInfo = bookingService.getBookingInfo(bookId, readerId);
        fullBookDto.setBookingInfoDto(bookingInfoMapper.toBookingInfoDtoFromBooking(bookingInfo));

        return fullBookDto;
    }

    @Override
    public FullBookDto returnBookingAnfGetUpdatedBook(ReviewDto reviewDto, long id) {

        Booking booking = bookingService.returnBooking(reviewDto, id);
        long bookId = booking.getBook().getId();

        return bookService.getByIdFullVersion(bookId);
    }

    private void resolveNotifications(Booking booking, long readerId) {

        String bookingStatusName = booking.getStatus().getName();
        User recipient = booking.getBook().getOwner();

        String emailTemplateName = notifier.chooseEmailTemplateName(bookingStatusName);
        notifier.sentEmailNotificationAboutBooking(booking, recipient, emailTemplateName, true);

        notifier.markInternalNotificationAsRead(readerId, booking.getId(), InternalTemplateConstant.BOOK_ACCEPTANCE_BY_READER);

        String internalTemplateName = notifier.chooseInternalTemplateName(bookingStatusName);
        notifier.sentInternalNotificationAboutBooking(booking, recipient.getId(), internalTemplateName);

    }

}