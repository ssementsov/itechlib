package by.library.itechlibrary.fasade;

import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;

public interface BookingFacade {

    BookingInfo getBookingInfo(long bookId);

    BookingResponseDto save(BookingDto bookingDto);

}
