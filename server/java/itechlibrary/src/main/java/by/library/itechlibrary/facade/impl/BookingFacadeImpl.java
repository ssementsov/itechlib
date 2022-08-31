package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.constant.BookingStatusConstant;
import by.library.itechlibrary.constant.MailTemplateConstant;
import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.book.WithBookingStatusBookDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.exeption_handler.exception.WrongBookingStatusException;
import by.library.itechlibrary.facade.BookingFacade;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.service.*;
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
    public WithBookingStatusBookDto resolveAssignedBooking(BookingAcceptanceDto bookingAcceptanceDto) {

        bookingService.checkDtoForResolveAssignedBooking(bookingAcceptanceDto);

        long bookId = bookingAcceptanceDto.getBookId();
        long readerId = securityUserDetailsService.getCurrentUserId();

        Book book = bookService.getById(bookId);
        BookingDto bookingDto = bookingService.findAwaitingConfirmationByBookId(bookId);

        BookingDto resolvedBookingDto = bookingService.resolveAssignedBooking(bookingDto, book, readerId, bookingAcceptanceDto.getStatus());
        bookingAcceptanceService.save(bookingAcceptanceDto, book, readerId);

        Booking booking = bookingService.findByIdWithoutMapping(resolvedBookingDto.getId());
        sendEmailNotification(booking);

        WithBookingStatusBookDto withBookingStatusBookDto = bookService.getByIdWithBookingStatus(bookId);
        withBookingStatusBookDto.setBookingStatus(resolvedBookingDto.getStatus());

        return withBookingStatusBookDto;
    }

    private void sendEmailNotification(Booking booking) {

        Template template = chooseTemplate(booking.getStatus().getName());
        String filedTemplateText = mailTemplateService.getAndFillTemplateFromBookingInfo(booking, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(booking.getBook().getOwner(), template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, false);
    }

    private Template chooseTemplate(String bookingStatusName){

        if (bookingStatusName.equals(BookingStatusConstant.ACCEPTED)) {

            return  mailTemplateService.getByName(MailTemplateConstant.BOOK_ACCEPTANCE);

        } else if (bookingStatusName.equals(BookingStatusConstant.DECLINED)) {

            return  mailTemplateService.getByName(MailTemplateConstant.ACCEPTANCE_DECLINED);

        }else {

            throw new WrongBookingStatusException("Incorrect booking status for sending an email about resolving assigned booking.");

        }
    }

}