package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    List<BookingResponseDto> findAllByReaderId(long id);

    List<BookingResponseDto> findAllCurrentsByReaderId(long id);

    List<BookingResponseDto> findAllByBookId(long id);

    BookingResponseDto findCurrentByBookId(long bookId);

    BookingResponseDto saveBooking(BookingDto bookingDto);

    BookingResponseDto updateFinishDate(long bookingId, LocalDate newFinishDate);

    BookingResponseDto findById(long id);

    void returnBooking(ReviewDto reviewDto, long id);

    boolean isReader(long userId, long bookId);

}
