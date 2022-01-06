package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    List<BookingResponseDto> findAllByReaderId(long id);

    List<BookingResponseDto> findAllCurrentsByReaderId(long id);

    List<BookingResponseDto> findAllByBookId(long id);

    BookingResponseDto saveBooking(BookingDto bookingDto);

    BookingResponseDto updateFinishDate(long bookingId, LocalDate newFinishDate);

    BookingResponseDto findById(long id);

}
