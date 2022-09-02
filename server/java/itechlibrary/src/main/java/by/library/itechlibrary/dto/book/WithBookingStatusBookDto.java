package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.BookingStatusDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WithBookingStatusBookDto extends WithOwnerBookDto{

    private BookingStatusDto bookingStatus;

}
