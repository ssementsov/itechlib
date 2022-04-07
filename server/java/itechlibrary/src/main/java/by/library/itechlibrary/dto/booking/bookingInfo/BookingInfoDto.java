package by.library.itechlibrary.dto.booking.bookingInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInfoDto extends BaseBookingInfoDto{

    private boolean isCurrentUserReader;

    private String nameOfReader;

}
