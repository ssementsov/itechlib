package by.library.itechlibrary.dto.booking.bookinginfo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseBookingInfoDto {

    @JsonFormat(pattern="yyyy-MM-dd")
    private LocalDate bookingEndDate;

}
