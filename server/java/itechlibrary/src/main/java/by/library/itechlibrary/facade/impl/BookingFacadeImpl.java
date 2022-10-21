package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.constant.BookingStatusConstant;
import by.library.itechlibrary.constant.InternalTemplateConstant;
import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.User;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.facade.BookingFacade;
import by.library.itechlibrary.facade.NotificationFacade;
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

    private final NotificationFacade notifier;

    private final BookingAcceptanceService bookingAcceptanceService;


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

        long bookId = bookingAcceptanceDto.getBookId();
        long readerId = securityUserDetailsService.getCurrentUserId();

        Book book = bookService.getById(bookId);
        BookingDto bookingDto = bookingService.findAwaitingConfirmationByBookId(bookId);
        Booking resolvedBooking = bookingService.resolveAssignedBooking(bookingDto, book, readerId, bookingAcceptanceDto.getStatus());
        bookingAcceptanceService.save(bookingAcceptanceDto, book, readerId);

        Booking booking = bookingService.findByIdWithoutMapping(resolvedBooking.getId());

        if (bookingAcceptanceDto.getStatus().getName().equals(BookingStatusConstant.ACCEPTED)) {

            User targetUser = booking.getBook().getOwner();

            notifier.sentEmailNotificationAboutBooking(booking, targetUser, MailTemplateConstant.BOOK_ACCEPTANCE, true);
            notifier.sentInternalNotificationAboutBooking(booking, targetUser.getId(), InternalTemplateConstant.BOOK_ACCEPTANCE);

        }

        return bookService.getByIdFullVersion(bookId);
    }

}