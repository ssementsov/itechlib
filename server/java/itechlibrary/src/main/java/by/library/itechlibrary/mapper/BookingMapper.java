package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.booking.NewBookingDto;
import by.library.itechlibrary.dto.booking.NewBookingResponseDto;
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
    NewBookingDto toNewBookingDto(Booking booking);

    @Mapping(source = "bookId", target = "book.id")
    @Named(value = "newBookingDto")
    Booking toBooking(NewBookingDto newBookingDto);

    @IterableMapping(qualifiedByName = "booking")
    List<NewBookingDto> mapNewBookingDtoList(List<Booking> bookings);

    @IterableMapping(qualifiedByName = "newBookingDto")
    List<Booking> mapBookingList(List<NewBookingDto> newBookingDtos);


    @Named(value = "newBookingResponseDto")
    NewBookingResponseDto toNewBookingResponseDto(Booking booking);


}