package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.booking.bookinginfo.BookingInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithBookingInfoBookDto extends WithOwnerBookDto{

    private BookingInfoDto bookingInfoDto;

}