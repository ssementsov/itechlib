package by.library.itechlibrary.service.impl;

import by.library.itechlibrary.constant.BookStatusConstant;
import by.library.itechlibrary.constant.BookingAcceptanceStatusConstant;
import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.BookingAcceptanceResponseDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.BookingAcceptance;
import by.library.itechlibrary.exeption_handler.exception.WrongBookStatusException;
import by.library.itechlibrary.mapper.BookingAcceptanceMapper;
import by.library.itechlibrary.repository.BookingAcceptanceRepository;
import by.library.itechlibrary.service.BookingAcceptanceService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class BookingAcceptanceServiceImpl implements BookingAcceptanceService {

    private final BookingAcceptanceMapper acceptanceMapper;

    private final BookingAcceptanceRepository acceptanceRepository;


    @Override
    public BookingAcceptanceResponseDto save(BookingAcceptanceDto acceptanceDto, Book book) {

        BookingAcceptance bookingAcceptance = acceptanceMapper.toBookingAcceptanceFromBookingAcceptanceDto(acceptanceDto);
        setBookByAcceptanceStatus(bookingAcceptance, book);
        BookingAcceptance savedBookingAcceptance = acceptanceRepository.save(bookingAcceptance);

        return acceptanceMapper.toBookingAcceptanceResponseDtoFromBookingAcceptance(savedBookingAcceptance);
    }

    private void setBookByAcceptanceStatus(BookingAcceptance bookingAcceptance, Book book) {

        String acceptanceStatusName = bookingAcceptance.getStatus().getName();
        tryToChangeBookStatus(acceptanceStatusName, book);
        bookingAcceptance.setBook(book);
    }

    private void tryToChangeBookStatus(String acceptanceStatusName, Book book) {

        checkBookStatus(book);

        if (acceptanceStatusName.contains(BookingAcceptanceStatusConstant.ACCEPTED)) {

            book.setStatus(BookStatusConstant.IN_USE_BOOK_STATUS);

        }
    }

    private void checkBookStatus(Book book) {

        String bookStatusName = book.getStatus().getName();

        if (!bookStatusName.contains(BookStatusConstant.ACCEPTANCE_AWAITING)) {

            throw new WrongBookStatusException("You can't accept book whose status is not ACCEPTANCE AWAITING.");

        }
    }
}