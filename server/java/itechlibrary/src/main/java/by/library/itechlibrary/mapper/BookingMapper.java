package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.BookingDto;
import by.library.itechlibrary.entity.Booking;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    @Named(value = "booking")
    BookingDto toBookingDto(Booking booking);

    @Named(value = "bookingDto")
    Booking toBooking(BookingDto bookingDto);

    @IterableMapping(qualifiedByName = "booking")
    List<BookingDto> mapBookingDtoList(List<Booking> bookings);

    @IterableMapping(qualifiedByName = "bookingDto")
    List<Booking> mapBookingList(List<BookingDto> bookingDtos);

}