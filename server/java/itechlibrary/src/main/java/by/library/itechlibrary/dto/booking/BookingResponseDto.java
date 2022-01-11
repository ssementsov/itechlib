package by.library.itechlibrary.dto.booking;

import by.library.itechlibrary.dto.book.BookDto;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Data
public class BookingResponseDto {

    private long id;

    @NotNull
    private LocalDate startDate;

    @NotNull
    private LocalDate finishDate;

    @NotNull
    private BookDto book;

    private boolean isActive;

}