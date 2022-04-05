package by.library.itechlibrary.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingInfo {

    private boolean isCurrentUserReader;

    private String nameOfReader;

    private LocalDate bookingEndDate;

}
