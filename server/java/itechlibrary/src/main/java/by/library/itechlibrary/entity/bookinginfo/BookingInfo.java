package by.library.itechlibrary.entity.bookinginfo;

import by.library.itechlibrary.entity.BookingStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInfo extends BaseBookingInfo {

    private boolean isCurrentUserReader;

    private String nameOfReader;

    private BookingStatus status;

    private String comment;

}