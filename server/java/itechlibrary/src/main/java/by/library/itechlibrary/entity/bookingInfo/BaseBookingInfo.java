package by.library.itechlibrary.entity.bookingInfo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseBookingInfo {

    private LocalDate bookingEndDate;

}
