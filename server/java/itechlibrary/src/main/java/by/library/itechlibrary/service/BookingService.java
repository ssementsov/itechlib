package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.BookingStatusDto;
import by.library.itechlibrary.dto.book.WithBookingInfoBookDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingForTargetReaderDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.dto.booking.ReviewDto;
import by.library.itechlibrary.entity.Book;
import by.library.itechlibrary.entity.Booking;
import by.library.itechlibrary.entity.bookinginfo.BaseBookingInfo;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface BookingService {

    List<BookingResponseDto> findAllByReaderId(long id);

    List<BookingResponseDto> findAllCurrentsByReaderId(long id);

    Booking resolveAssignedBooking(Booking booking, Book book, BookingStatusDto bookingStatusDto, long readerId);

    List<BookingResponseDto> findAllByBookId(long id);

    BookingResponseDto findCurrentByBookId(long bookId);

    Booking findAwaitingConfirmationByBookId(long bookId);

    void checkDtoForResolveAssignedBooking(BookingAcceptanceDto acceptanceDto);

    BookingResponseDto save(BookingDto bookingDto, Book book, long readerId);

    BookingDto update(BookingDto bookingDto, Book book, long readerId);

    BookingResponseDto updateFinishDate(long bookingId, LocalDate newFinishDate);

    BookingResponseDto findById(long id);

    Booking findByIdWithoutMapping(long id);

    Booking returnBooking(ReviewDto reviewDto, long id);

    BookingInfo getBookingInfo(long bookId, long currentUserId);

    void trySetBookingInfoToBook(WithBookingInfoBookDto bookWithBookingInfo, Optional<Booking> optionalBooking, long currentUserId);

    void fillBookWithBookingInfo(WithBookingInfoBookDto book);

    void disableCurrentBooking(long bookId);

    void tryDeactivateDeclinedBookingDuringUpdatingBook(long bookId, String bookStatusName);

    BaseBookingInfo getBaseBookingInfo(long bookId);

    int getCountActiveBookings(long readerId);

    BookingDto tryGetBookingDto(BookingForTargetReaderDto bookingForUserDto, long bookId);
}