package by.library.itechlibrary.dto.booking;

import by.library.itechlibrary.dto.book.WithOwnerBookDto;
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
    private WithOwnerBookDto book;

    private boolean isActive;

}