package by.library.itechlibrary.facade.impl;

import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingWithCurrentUserReaderDto;
import by.library.itechlibrary.dto.booking.bookinginfo.BookingInfoDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.Template;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
import by.library.itechlibrary.exeption_handler.exception.WrongBookingStatusException;
import by.library.itechlibrary.facade.BookingFacade;
import by.library.itechlibrary.mapper.BookingInfoMapper;
import by.library.itechlibrary.pojo.MailNotificationInfo;
import by.library.itechlibrary.service.*;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

import static by.library.itechlibrary.constant.BookingStatusConstant.templateBookingStatusMap;


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

    private final BookingInfoMapper bookingInfoMapper;


    @Override
    @Transactional
    public BookingInfo getBookingInfo(long bookId) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();

        return bookingService.getBookingInfo(bookId, currentUserId);
    }

    @Override
    @Transactional
    public BookingWithCurrentUserReaderDto save(BookingDto bookingDto) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();
        Book book = bookService.getById(bookingDto.getBookId());

        return bookingService.save(bookingDto, book, currentUserId);
    }

    @Override
    public BookingWithCurrentUserReaderDto updateFinishDate(long bookingId, LocalDate newFinishDate) {

        long currentUserId = securityUserDetailsService.getCurrentUserId();

        return bookingService.updateFinishDate(bookingId, currentUserId, newFinishDate);
    }

    @Override
    @Transactional
    public BookingInfoDto resolveAssignedBooking(BookingAcceptanceDto bookingAcceptanceDto) {

        bookingService.checkDtoForResolveAssignedBooking(bookingAcceptanceDto);

        long bookId = bookingAcceptanceDto.getBookId();
        long currentUserId = securityUserDetailsService.getCurrentUserId();

        Book book = bookService.getById(bookId);
        Booking booking = bookingService.findAwaitingConfirmationByBookId(bookId);

        Booking resolveAssignedBooking = bookingService.resolveAssignedBooking(booking, book, bookingAcceptanceDto.getStatus(), currentUserId);
        bookingAcceptanceService.save(bookingAcceptanceDto, book, currentUserId);

        sendEmailNotification(resolveAssignedBooking);

        return bookingService.getBookingInfoDtoFromBooking(resolveAssignedBooking, currentUserId);
    }

    private void sendEmailNotification(Booking booking) {

        Template template = chooseTemplate(booking.getStatus().getName());
        String filedTemplateText = mailTemplateService.getAndFillTemplateFromBookingInfo(booking, template.getText());
        MailNotificationInfo mailNotificationInfo = new MailNotificationInfo(booking.getBook().getOwner(), template, filedTemplateText);

        mailNotificationService.sent(mailNotificationInfo, true);
    }

    private Template chooseTemplate(String bookingStatusName) {

        Optional<String> optionalTemplateName = Optional.ofNullable(templateBookingStatusMap.get(bookingStatusName));

        String templateName = optionalTemplateName.orElseThrow(
                () -> new WrongBookingStatusException("Incorrect booking status for sending an email about resolving assigned booking.")
        );

        return mailTemplateService.getByName(templateName);
    }

}