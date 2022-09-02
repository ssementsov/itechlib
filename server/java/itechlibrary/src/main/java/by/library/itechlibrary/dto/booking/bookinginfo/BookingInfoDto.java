package by.library.itechlibrary.dto.booking.bookinginfo;

import by.library.itechlibrary.dto.BookingStatusDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInfoDto extends BaseBookingInfoDto {

    private boolean isCurrentUserReader;

    private String nameOfReader;

    private BookingStatusDto status;

    private String comment;

}
