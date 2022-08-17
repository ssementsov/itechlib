package by.library.itechlibrary.facade;

import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.BookingAcceptanceResponseDto;
import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;

public interface BookingFacade {

    BookingInfo getBookingInfo(long bookId);

    BookingResponseDto save(BookingDto bookingDto);

    BookingAcceptanceResponseDto resolveAssignedBooking(BookingAcceptanceDto bookingAcceptanceDto);

}
