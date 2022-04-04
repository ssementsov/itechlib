package by.library.itechlibrary.dto.booking;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInfoDto {

    private boolean isCurrentUserReader;

    private String nameOfReader;

    private LocalDate bookingEndDate;

}
