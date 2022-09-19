package by.library.itechlibrary.facade;

import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingWithCurrentUserReaderDto;
import by.library.itechlibrary.dto.booking.bookinginfo.BookingInfoDto;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;

import java.time.LocalDate;

public interface BookingFacade {

    BookingInfo getBookingInfo(long bookId);

    BookingWithCurrentUserReaderDto save(BookingDto bookingDto);

    BookingWithCurrentUserReaderDto updateFinishDate(long bookingId, LocalDate newFinishDate);

    BookingInfoDto resolveAssignedBooking(BookingAcceptanceDto bookingAcceptanceDto);

}