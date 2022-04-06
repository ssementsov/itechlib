package by.library.itechlibrary.entity.bookingInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInfo extends BaseBookingInfo {

    private boolean isCurrentUserReader;

    private String nameOfReader;

}
