package by.library.itechlibrary.service;

import by.library.itechlibrary.dto.NewBookingDto;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {

    List<NewBookingDto> findAllByReaderId(long id);

    List<NewBookingDto> findAllCurrentsByReaderId(long id);

    List<NewBookingDto> findAllByBookId(long id);

    NewBookingDto saveBooking(NewBookingDto newBookingDto);

    NewBookingDto updateFinishDate(long bookingId, LocalDate newFinishDate);

    NewBookingDto findById(long id);

}
