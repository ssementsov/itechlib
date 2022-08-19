package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.constant.BookingStatusConstant;
import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.book.FullBookDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.facade.BookingFacade;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.service.BookService;
import by.library.itechlibrary.service.BookingService;
import by.library.itechlibrary.service.MailNotificationService;
import by.library.itechlibrary.service.MailTemplateService;
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

    private final MailTemplateService mailTemplateService;

    private final MailNotificationService mailNotificationService;

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
        long readerId = bookingAcceptanceDto.getAuthorId();
        Book book = bookService.getById(bookId);

        BookingDto bookingDto = bookingService.findAwaitingConfirmationByBookId(bookId);
        BookingResponseDto bookingResponseDto = bookingService.save(bookingDto, book, readerId);

        if (bookingAcceptanceDto.getBookingStatus().getName().equals(BookingStatusConstant.ACCEPTED)) {
//            bookingService.makeActive(booking);
//            sendBookAcceptanceEmail(booking);
        }

        return bookService.getByIdFullVersion(bookId);
    }

    private void sendBookAcceptanceEmail(Booking booking) {

        Template template = mailTemplateService.getByName(MailTemplateConstant.BOOK_ACCEPTANCE);
        String filedTemplateText = mailTemplateService.getAndFillTemplateFromBookingInfo(booking, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(booking.getBook().getOwner(), template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, true);
    }
}