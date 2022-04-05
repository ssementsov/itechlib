package by.library.itechlibrary.dto.book;

import by.library.itechlibrary.dto.FileInfoDto;
import by.library.itechlibrary.dto.booking.BookingInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FullBookDto extends WithOwnerBookDto {

    private FileInfoDto fileInfo;

    private BookingInfoDto bookingInfoDto;

}
