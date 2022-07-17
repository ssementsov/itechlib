package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.entity.bookinginfo.BaseBookingInfo;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    List<BookingResponseDto> findAllByReaderId(long id);

    List<BookingResponseDto> findAllCurrentsByReaderId(long id);

    List<BookingResponseDto> findAllByBookId(long id);

    BookingResponseDto findCurrentByBookId(long bookId);

    BookingResponseDto save(BookingDto bookingDto, long currentUserId);

    BookingResponseDto updateFinishDate(long bookingId, LocalDate newFinishDate);

    BookingResponseDto findById(long id);

    void returnBooking(ReviewDto reviewDto, long id);

    BookingInfo getBookingInfo(long bookId, long currentUserId);

    void disableCurrentBooking(long bookId);

    BaseBookingInfo getBaseBookingInfo(long bookId);

    int getCountActiveBookings(long readerId);

}
