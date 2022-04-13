package by.library.itechlibrary.mapper;

import by.library.itechlibrary.dto.booking.bookinginfo.BaseBookingInfoDto;
import by.library.itechlibrary.dto.booking.bookinginfo.BookingInfoDto;
import by.library.itechlibrary.entity.bookinginfo.BaseBookingInfo;
import by.library.itechlibrary.entity.bookinginfo.BookingInfo;
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
    List<BookingInfo> mapBookingListFromBookingInfoDtoList(List<BookingInfoDto> bookingInfoDtoList);

    @Named(value = "baseBookingInfoDto")
    BaseBookingInfoDto mapToBaseBookingInfoDto(BaseBookingInfo baseBookingInfo);

    @IterableMapping(qualifiedByName = "baseBookingInfoDto")
    List<BaseBookingInfoDto> mapToBaseBookingInfoDtoList(List<BaseBookingInfo> baseBookingInfoList);
}