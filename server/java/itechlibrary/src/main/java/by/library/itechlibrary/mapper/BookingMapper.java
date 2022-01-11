package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.booking.BookingDto;
import by.library.itechlibrary.dto.booking.BookingResponseDto;
import by.library.itechlibrary.entity.Booking;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookingMapper {

    @Mapping(source = "book.id", target = "bookId")
    @Named(value = "booking")
    BookingDto toBookingDtoFromBooking(Booking booking);

    @Mapping(source = "bookId", target = "book.id")
    @Named(value = "BookingDto")
    Booking toBookingFromBookingDto(BookingDto bookingDto);

    @IterableMapping(qualifiedByName = "booking")
    List<BookingDto> mapBookingDtoListBookings(List<Booking> bookings);

    @IterableMapping(qualifiedByName = "BookingDto")
    List<Booking> mapBookingListFromBookingDtoList(List<BookingDto> bookingDtos);


    @Named(value = "booking1")
    BookingResponseDto toNewBookingResponseDto(Booking booking);

    @Named(value = "newBookingResponseDto")
    Booking toBookingFromBookingResponseDto(BookingResponseDto bookingResponseDto);

    @IterableMapping(qualifiedByName = "booking1")
    List<BookingResponseDto> mapBookingResponseDtoList(List<Booking> bookings);

    @IterableMapping(qualifiedByName = "newBookingResponseDto")
    List<Booking> mapBookingDtoListFromBookingResponseDtoList(List<BookingResponseDto> bookingResponseDtos);

}