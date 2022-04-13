package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.booking.bookinginfo.BaseBookingInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseOwnBookDto extends BaseBookDto {

    private BaseBookingInfoDto baseBookingInfo;

}
