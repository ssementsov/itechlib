package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.booking.bookingInfo.BaseBookingInfoDto;
import by.library.itechlibrary.dto.booking.bookingInfo.BookingInfoDto;
import by.library.itechlibrary.entity.bookingInfo.BaseBookingInfo;
import by.library.itechlibrary.entity.bookingInfo.BookingInfo;
import org.mapstruct.IterableMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BookingInfoMapper {

    @Named(value = "bookingInfo")
    BookingInfoDto toBookingInfoDtoFromBooking(BookingInfo bookingInfo);

    @Named(value = "bookingInfoDto")
    BookingInfo toBookingFromBookingInfoDto(BookingInfoDto bookingInfoDto);

    @IterableMapping(qualifiedByName = "bookingInfo")
    List<BookingInfoDto> mapBookingInfoDtoListBookings(List<BookingInfo> bookingInfos);

    @IterableMapping(qualifiedByName = "bookingInfoDto")
    List<BookingInfo> mapBookingListFromBookingInfoDtoList(List<BookingInfoDto> BookingInfoDtos);

    @Named(value = "baseBookingInfoDto")
    BaseBookingInfoDto mapToBaseBookingInfoDto(BaseBookingInfo baseBookingInfo);

    @IterableMapping(qualifiedByName = "baseBookingInfoDto")
    List<BaseBookingInfoDto> mapToBaseBookingInfoDtoList(List<BaseBookingInfo> baseBookingInfoList);
}