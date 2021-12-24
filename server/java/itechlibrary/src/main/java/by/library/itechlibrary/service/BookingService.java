package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.BookingDto;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    List<BookingDto> findAllByReaderId(long id);

    List<BookingDto> findAllCurrentsByReaderId(long id);

    List<BookingDto> findAllByBookId(long id);

    BookingDto saveBooking(BookingDto bookingDto);

    BookingDto updateFinishDate(long bookingId, LocalDate newFinishDate);

    BookingDto findById(long id);

}
