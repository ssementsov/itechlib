package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.FileInfoDto;
import by.library.itechlibrary.dto.booking.bookingInfo.BookingInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FullBookDto extends WithOwnerBookDto {

    private FileInfoDto fileInfo;

    private BookingInfoDto bookingInfoDto;

}
