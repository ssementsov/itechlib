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
import by.library.itechlibrary.service.*;
import by.library.itechlibrary.service.impl.SecurityUserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

        sendEmailNotification(resolveAssignedBooking);

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