package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.BookingAcceptanceDto;
import by.library.itechlibrary.dto.BookingAcceptanceResponseDto;
import by.library.itechlibrary.entity.BookingAcceptance;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BookingAcceptanceMapper {

    @Mapping(source = "bookingAcceptanceDto.bookId", target = "book.id")
    @Mapping(source = "authorId", target = "author.id")
    BookingAcceptance toBookingAcceptanceFromBookingAcceptanceDto(BookingAcceptanceDto bookingAcceptanceDto, Long authorId);

    @Mapping(source = "book.id", target = "bookId")
    BookingAcceptanceResponseDto toBookingAcceptanceResponseDtoFromBookingAcceptance(BookingAcceptance bookingAcceptance);
}