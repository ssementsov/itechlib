package by.library.itechlibrary.dto.booking.bookinginfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInfoDto extends BaseBookingInfoDto {

    private boolean isCurrentUserReader;

    private String nameOfReader;

}
