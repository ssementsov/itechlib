package by.library.itechlibrary.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class BookingDto {

    private long id;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate finishDate;

    private short rate;

    private String feedback;

    @NotNull
    private UserDto reader;

    @NotNull
    private BookDto book;

}
